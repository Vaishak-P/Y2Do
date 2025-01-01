import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
function ShowEdit({index,task,tasks,setTasks,editText,setEditText,setEditingIndex}) {
    const saveEdit = (index)=>{
        const updatedTasks = tasks.map((task,i)=>
            // i===index ? {...tasks,text:editText} : task
            i===index ? {...tasks,text:editText,id:task.id,completed:true} : task
        );
        setTasks(updatedTasks);
        setEditText('');
        setEditingIndex(null);
    }
  return (
    <>
        <input
            type='text'
            value={editText}
            onChange={(e)=> setEditText(e.target.value)}
            onKeyDown={(e)=>{
                if(e.key==='Enter'){
                    saveEdit(index);
                }
            }}
        />
        <button
            id='saveEditButton'
            className={task.completed?'listbuttonDisabled':'listButton'}
            onClick={()=> saveEdit(index)}
        >
        <FontAwesomeIcon icon={faFloppyDisk}/>
        </button>
    </>
  )
}

export default ShowEdit