import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

const ShowToDos = ({index,tasks,setTasks,task,setEditingIndex,setEditText,setDeletedTask,setDeletedTaskIndex}) => {
    const toggleTaskCompletion = (index) =>{
        const updatedTasks = tasks.map((task,i)=>
            i===index? {...task, completed:!task.completed}:task
        );
        setTasks(updatedTasks);
    }
    const editTask = (index,text) =>{
        setEditingIndex(index);
        setEditText(text);
    }
    const deleteTask = (index) =>{
        const taskToDelete = tasks[index];
        const updatedTasks = tasks.filter((_,i)=> i!==index)
        setTasks(updatedTasks);
        setDeletedTask(taskToDelete);
        setDeletedTaskIndex(index);
        //Automatically hide undo option
        setTimeout(()=>{
            setDeletedTask(null);
            setDeletedTaskIndex(null);
        },5000);
    }
    const moveTaskUp = (index) =>{
        if(index>0){
            const updatedTasks = [...tasks];
            [updatedTasks[index],updatedTasks[index-1]] = [updatedTasks[index-1],updatedTasks[index]]
            setTasks(updatedTasks);
        }
    }
    const moveTaskDown = (index) =>{
        if(index < tasks.length-1){
            const updatedTasks = [...tasks];
            [updatedTasks[index],updatedTasks[index +1]] = [updatedTasks[index+1],updatedTasks[index]]
            setTasks(updatedTasks);
        }
    }
    const truncateText = (text) =>{
        return text.length > 35 ? text.substring(0,35) + '...' : text
    }

  return (
    <>
        <span
            id='text'
            onClick={()=> toggleTaskCompletion(index)}
            className={task.completed? 'textCompletedTrue':'textCompletedFalse'}
            title={task.text} // Shows full text as a tooltip
        >
            {truncateText(task.text)}
        </span>
        <button
            id='editButton'
            className={task.completed?'listbuttonDisabled':'listButton'}
            onClick={()=>editTask(index,task.text)}
        >
        <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <button
            id='deleteButton'
            className={task.completed?'listbuttonDisabled':'listButton'}
            onClick={()=>deleteTask(index)}
        >
            <FontAwesomeIcon icon={faTrash} />
        </button>
        <button
            id='moveUpButton'
            className={task.completed?'listbuttonDisabled':'listButton'}
            onClick={()=>moveTaskUp(index)}
        >
            <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <button
            id='moveDownButton'
            className={task.completed?'listbuttonDisabled':'listButton'}
            onClick={()=>moveTaskDown(index)}
        >
            <FontAwesomeIcon icon={faArrowDown} />
        </button>
    </>
  )
}

export default ShowToDos