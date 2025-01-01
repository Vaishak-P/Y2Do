import React from 'react'
import ToDoFooter from './ToDoFooter'
import ToDoInput from './ToDoInput' 
const ToDoHeader = ({setNewTask,newTask,setTasks,tasks}) =>{
    
  return (
    <div className='toDoHead'>
        <h1 className='y2doTitle'>Y2Do</h1>
        <ToDoInput newTask={newTask} setNewTask={setNewTask} tasks={tasks} setTasks={setTasks}></ToDoInput>
        <ToDoFooter></ToDoFooter> 
    </div>
  )
}

export default ToDoHeader