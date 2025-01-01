import React,{useState} from 'react'

import ListContainer from './components/ListContainer'
import InputContainer from './components/InputContainer'
function App() {
  const [newTask,setNewTask] = useState("");
  const [tasks,setTasks] = useState([]);
  return (
    <>
      <div className='bodyContainer'>
        <div className='mainContainer'>
          <InputContainer setNewTask={setNewTask} newTask={newTask} setTasks={setTasks} tasks={tasks}></InputContainer>
          <ListContainer tasks={tasks} setTasks={setTasks}></ListContainer>
        </div>
      </div>
    </>
  )
}

export default App
// ; not necessary at end


    // const [tasks,setTasks] = useState([
    //     {id:1,text:'aeat',completed:false},
    //     {id:2,text:'bcode',completed:false},
    //     {id:3,text:'csleep',completed:false},
    //     {id:4,text:'deat',completed:false},
    //     {id:5,text:'ecode',completed:false},
    //     {id:6,text:'fsleep',completed:false},
    //     {id:7,text:'heat',completed:false},
    //     {id:8,text:'wcode',completed:false},
    //     {id:9,text:'zcode',completed:false},
    // ]); 
    