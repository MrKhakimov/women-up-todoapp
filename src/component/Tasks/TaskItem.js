import dayjs from "dayjs";
import {deleteDoc, doc, updateDoc, serverTimestamp} from "firebase/firestore";
import {db} from "../../firebaseConfig";
import classnames from "classnames";
import File from '../../img/file.png';
import {useState} from "react";

const dateLeft = (date) => {
    let d1 = dayjs(new Date());
    let d2 = dayjs(date)

    let diff = d2.diff(d1, "day");

    return diff < 0
}

export const TaskItem = ({item}) => {
    const {name, text, date, complete, id, file} = item;

    const [show, setShow] = useState(false);
    
    const endDate = dayjs(date).format('DD-MM-YYYY');

    const removeItem = () => {
        deleteDoc(doc(db, "todoapp", id)).then(r => {
            console.log('removed')
        });
    }

    const updateItem = () => {
        updateDoc(doc(db, 'todoapp', id), {
            complete: !complete,
            timestamp: serverTimestamp()
        }).then(r => console.log('updated'));
    }

    return (
        <div className={'tasks-item'}>
            <div className={'tasks-item-top'}>

                <div>
                    <div className={classnames('tasks-item__date', { ['tasks-item__date--end']: dateLeft(date) })}>
                        {endDate}
                        {dateLeft(date) ? ' Срок истек' : ''}
                    </div>
                    <div className={'tasks-item__title'}>{name}</div>
                </div>

                <div>
                    <button
                        className={classnames('tasks-item__button', { ['tasks-item__button--info']: complete })}
                        onClick={updateItem}>{complete ? 'Выпелнен' : 'Активный'}</button>
                    <button
                        className={'tasks-item__button tasks-item__button--danger'}
                        onClick={removeItem}>delete</button>
                </div>
            </div>
            {file
                ? <a
                    target={'_blank'}
                    href={file}
                    className={'tasks-item__file'}>
                        <img src={File} alt="file" />
                  </a> : null}

            <div className={'tasks-item__text'}>{show ? text : `${text.substring(0, 100)}...`}</div>
            <button
                onClick={() => setShow(!show)}
                className={'tasks-item__show'}
            >
                {show ? 'Скрыть' : 'Показать'}
            </button>
        </div>
    )
}