import React,{useState} from 'react'
const ToDoList = () => {

    // const [tasks,setTasks] = useState(['eat','code','sleep']);
    const [tasks,setTasks] = useState([
        {id:1,text:'eat',completed:false},
        {id:2,text:'code',completed:false},
        {id:3,text:'sleep',completed:false}
    ]);
    const [newTask,setNewTask] = useState(""); 
    const [deletedTask,setDeletedTask] = useState("");
    const [deletedTaskIndex,setDeletedTaskIndex] = useState("")
    const [searchQuery,setSearchQuery] = useState("");
    const [filter,setFilter] = useState("all")
    const [editingIndex,setEditingIndex] = useState(null);
    const [editText,setEditText] = useState('');

    const addTask = () =>{
        if (newTask.trim()!==''){
            const newTaskObject = {
                id:tasks.length+1,
                text:newTask,
                completed:false
            }
            setTasks(t=>[...t,newTaskObject]);
            setNewTask('');
        }
    }
    const editTask =(index,text) =>{
        setEditingIndex(index);
        setEditText(text);
    }
    const saveEdit = (index)=>{
        const updatedTasks = tasks.map((task,i)=>
            i===index ? {...tasks,text:editText} : task
        );
        setTasks(updatedTasks);
        setEditText('');
        setEditingIndex(null);
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
        },3000);
    }
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
    const toggleTaskCompletion = (index) =>{
        const updatedTasks = tasks.map((task,i)=>
            i===index? {...task, completed:!task.completed}:task
        );
        setTasks(updatedTasks);
    }
    const filteredTasks = tasks.filter((task)=> {
        const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase())
        if (filter==="active") return !task.completed && matchesSearch;
        if (filter==="completed") return task.completed && matchesSearch;
        return matchesSearch;
    })
    
    return(
        <>
            <div className='toDoHead'>
                <h1>Y2Do</h1>
                <div>
                    <input
                        type='text'
                        placeholder='Enter a task'
                        value={newTask}
                        onChange={(e)=>setNewTask(e.target.value)}
                    />
                    <button
                        className='addButton'
                        onClick = {addTask}
                    >Add
                    </button>
                </div>
                <div className='searchContainer'>
                    <input
                        type='text'
                        value={searchQuery}
                        placeholder='Search ToDos'
                        onChange={(e)=>setSearchQuery(e.target.value)}
                    />
                    <select value={filter} onChange={(e)=>setFilter(e.target.value)}>
                            <option value='all'>All</option>
                            <option value='active'>Active</option>
                            <option value='completed'>Completed</option>
                    </select>
                </div>
            </div>
            <div className='toDoList'>
                <ol>
                    {filteredTasks.map((task,index) => 
                        <li key={task.id}>
                            {editingIndex=== index? (
                                <>
                                    <input
                                        type='text'
                                        value={editText}
                                        onChange={(e)=> setEditText(e.target.value)}
                                    />
                                    <button onClick={()=> saveEdit(index)}>Save</button>
                                </>
                            ):(
                                <>
                                    <span 
                                        id='text'
                                        onClick={()=> toggleTaskCompletion(index)}
                                        className={task.completed? 'textCompletedTrue':'textCompletedFalse'}
                                    >
                                        {task.text}
                                    </span>
                                    <button 
                                        id='editeButton'
                                        className='listContent'
                                        onClick={()=>editTask(index,task.text)}
                                    >Edit
                                    </button>
                                    <button 
                                        id='deleteButton'
                                        className='listContent'
                                        onClick={()=>deleteTask(index)}
                                    >Delete
                                    </button>
                                    <button 
                                        id='moveUpButton'
                                        className='listContent'
                                        onClick={()=>moveTaskUp(index)}
                                    >Up
                                    </button>
                                    <button 
                                        id='moveDownButton'
                                        className='listContent'
                                        onClick={()=>moveTaskDown(index)}
                                    >Down
                                    </button>
                                </>
                            )}
                        </li>
                    )}
                </ol>
            </div>
            {deletedTask&&(
                <div className='undoDeletedTask'>
                    <p>Task {deletedTask.text} deleted</p>
                    <button
                        onClick={undoDeletedTask}
                    >Undo
                    </button>
                </div>
            )}
            <div className="toDoFooter">
                <p>Made with ❤ by Vaishak</p>
            </div>
        </>
    )
}   
export default ToDoList

// FEATURES 
// 1. Add task
// 2. Delete task
// 3. Move task up & down
// 4. Edit Task
// 5. Undo deleted task
// 6. mark as completed
// NOTES  

// if blank screen appears , there maybe spelling mistakes
// eg. newTak (Correct: newTask)
// eg. newtask (Correct: newTask)

//onclick not working
//check spelling (right:onCheck,onclick)

//? paranthesis not used in onchange
// onChange={handleChange}: You point to the function, and it will be called later when something changes.
{/* eg. <input type="text" onChange={handleChange} /> */}
// onClick={handleClick}: You point to the function, and it will be called when you click the button.
{/* eg. <button onClick={handleClick()}>Click Me!</button> */}

// RIGHT: onClick={() => moveTaskUp(index)}
// WRONG: onClick={moveTaskUp(index)}