import {React,useState} from 'react'
//import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function ToDoInput({newTask,setNewTask,tasks,setTasks}) {
    const addTask = () =>{
        if (newTask.trim()){
            const newTaskObject = {
                id:tasks.length+1,
                text:newTask,
                completed:false
            }
            const updatedTasks = [...tasks,newTaskObject]
            updatedTasks.sort((a,b)=>b.id-a.id)
            setTasks(updatedTasks);
            setNewTask('');
        }
    }
  return (
    <div className='newTaskInputContainer'>
                        <input
                            type='text'
                            placeholder='enter new task'
                            value={newTask}
                            onChange={(e)=>setNewTask(e.target.value)}
                            onKeyDown={(e)=>{
                                if(e.key==='Enter'){
                                    addTask();
                                }
                            }}
                            className='newTaskInput'
                        />
                        <button
                            className='addButton'
                            onClick = {addTask}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
  )
}

export default ToDoInput