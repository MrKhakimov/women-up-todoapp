import './style.less';
import {TaskItem} from "./TaskItem";
import {useEffect, useState} from "react";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../../firebaseConfig";

export const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onSnapshot(collection(db,'todoapp'),(snapshot)=>{
            setTasks(snapshot.docs.map(doc => ({id: doc?.id, ...doc.data()})))
            setLoading(false);
        })
    }, [])


    if (loading) return <div>Загрузка</div>

    if (!tasks.length) return <div>Cписок пуст</div>


    return (
        <>
            {
                tasks.map(el => {
                    return <TaskItem key={el.id} item={el}/>
                })
            }
        </>
    )
}