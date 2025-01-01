import React from 'react'

function ToDoNotification({deletedTask,setDeletedTask,tasks,setTasks,deletedTaskIndex,setDeletedTaskIndex}) {
  const undoDeletedTask = () =>{
        if(deletedTask && deletedTaskIndex!= null){
            const updatedTasks = [...tasks];
            // array.splice(startINDEX, DELETECount, ADDitem1, ADDitem2, ...)
            updatedTasks.splice(deletedTaskIndex,0,deletedTask)
            setTasks(updatedTasks);
            setDeletedTask(null);
            setDeletedTaskIndex(null);
        }
    }
    return (
    <div className='notificationContainer'>
        {
            deletedTask? (
                <div className='undoDeletedTask'>
                    <p>Task <span>{deletedTask.text}</span> deleted</p>
                    <button
                        onClick={undoDeletedTask}
                    >Undo
                    </button>
                </div>
            ):(
                <p>Click on a task name to mark it as hidden</p>
            )
        }
    </div>
  )
}

export default ToDoNotification