import './style.less';
import {useCallback, useState} from "react";
import {Button} from "../Button";
import {ref, uploadBytesResumable, getDownloadURL, deleteObject} from "firebase/storage"
import {db, storage} from "../../firebaseConfig";
import { collection , onSnapshot, serverTimestamp, addDoc, deleteDoc } from 'firebase/firestore';

const initialState = {
    name: '',
    text: '',
    date: '',
    complete: false,
    file: '',
}
export const AddTask = () => {
    const [percent, setPercent] = useState(0);

    const [file, setFile] = useState(null);
    const [error, setError] = useState(false);

    const [state, setState] = useState(initialState);

    const onInput = (e) => {
        setState(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleChange = useCallback((event) => {
        setFile(event.target.files[0]);

        const storageRef = ref(storage, `/files/${event?.target?.files[0]?.name}`)
        const uploadTask = uploadBytesResumable(storageRef, event?.target?.files[0]);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPercent(percent);
            },
            (err) => console.log("progress error", err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setState(prev => {
                        return {...prev, file: url}
                    })
                });
            }
        );
    }, []);

    const addTask = (e) => {
        e.preventDefault();
        if (state.name.length && state.text.length && state.date.length) {
            addDoc(collection(db, 'todoapp'), {
                ...state,
                date: new Date(state.date).getTime(),
                create_at: serverTimestamp()
            }).then(r  => {
                setState(initialState)
                setPercent(0)
            })
            setError(false);
        } else {
            setError(true);
        }
    }

    const handleFileClear = useCallback((e) => {
        e.preventDefault();
        const storageRef = ref(storage, `/files/${file?.name}`)
        deleteObject(storageRef).then(r => {
            setFile(null);
            setState({...state, file: null})
            setPercent(0)
        }).catch(e => {
            console.log('error delete', e)
        });
    }, [file])

    return (
      <form className={'add-task'}>
          <div className={'add-task-item'}>
              <label>Название <sup>*</sup></label>
              <input required
                     type="text"
                     name={'name'}
                     placeholder={'Название'}
                     onInput={onInput}
                     value={state.name} />
          </div>
          <div className={'add-task-item'}>
              <label>Описание <sup>*</sup></label>
              <textarea
                  required
                  name={'text'}
                  placeholder={'Описание'}
                  onInput={onInput}
                  value={state.text} />
          </div>
          <div className={'add-task-item'}>
              <label>Выберите дату завершение <sup>*</sup></label>
              <input required type="date" name={'date'} onInput={onInput} />
          </div>

          {
              state.file ?
                  <div className={'add-task-item-img'}>
                      <div>загружено {file?.name}</div>
                      <button
                          className={'add-task-item__clearBtn'}
                          onClick={handleFileClear}>удалить файл</button>
                  </div> :
                  <div className={'add-task-item add-task-item--image'}>
                      <label>Прикрепите файл {file ? `${percent}%` : ''}</label>
                      <input type="file" accept="image/*" onChange={handleChange}/>
                  </div>
          }
          <div>
              {error ? <div className={'error'}>Пожалуйста заполните объязателные поля</div> : null}
              <Button title={'Добавить'} onClick={addTask} />
          </div>
      </form>
    )
}