import React,{useState} from 'react'
//import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

const ToDoList = () => {

    // const [tasks,setTasks] = useState(['eat','code','sleep']);
    const [tasks,setTasks] = useState([
        {id:1,text:'aeat',completed:false},
        {id:2,text:'bcode',completed:false},
        {id:3,text:'csleep',completed:false},
        {id:4,text:'deat',completed:false},
        {id:5,text:'ecode',completed:false},
        {id:6,text:'fsleep',completed:false},
        {id:7,text:'heat',completed:false},
        {id:8,text:'wcode',completed:false},
        {id:9,text:'zcode',completed:false},
        // {id:3,text:'sleep',completed:false},
        // {id:1,text:'eat',completed:false},
        // {id:2,text:'code',completed:false},
        // {id:3,text:'sleep',completed:false},
        // {id:1,text:'eat',completed:false},
        // {id:2,text:'code',completed:false},
        // {id:3,text:'sleep',completed:false}
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
            const updatedTasks = [...tasks,newTaskObject]
            updatedTasks.sort((a,b)=>b.id-a.id)
            setTasks(updatedTasks);
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
        },5000);
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
    const truncateText = (text) =>{
        return text.length > 35 ? text.substring(0,35) + '...' : text
    }
    
    return(
        <div className='bodyContainer'>
            <div className='mainContainer'>
                {/* ===============HEAD========  */}
                <div className='toDoHead'>
                    <h1 className='y2doTitle'>Y2Do</h1>
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
                    <div className="toDoFooter">
                        <p>Made with ❤ by Vaishak</p>
                    </div>
                </div>
                {/* =============TODOLIST ============ */}
                <div className='toDoList'>
                    <div className='searchContainer'>
                        <input
                            type='text'
                            value={searchQuery}
                            placeholder='Search ToDos'
                            onChange={(e)=>setSearchQuery(e.target.value)}
                            className='searchTaskInput'
                        />
                        <select value={filter} onChange={(e)=>setFilter(e.target.value)}>
                                <option value='all'>All</option>
                                <option value='active'>Active</option>
                                <option value='completed'>Hidden</option>
                        </select>
                    </div>

                    <div className='olContainer'>
                        <ol>
                            {filteredTasks.map((task,index) =>
                                <li key={task.id}>
                                    {/*======== IF EDITING ON ========== */}
                                    {editingIndex=== index? (
                                        <>
                                            <input
                                                type='text'
                                                value={editText}
                                                onChange={(e)=> setEditText(e.target.value)}
                                            />
                                            <button
                                                id='saveEditButton'
                                                className={task.completed?'listbuttonDisabled':'listButton'}
                                                onClick={()=> saveEdit(index)}
                                                >
                                                <FontAwesomeIcon icon={faFloppyDisk}/>
                                            </button>
                                        </>
                                    ):(
                                        <>
                                        {/*======== IF EDITING OFF ========== */}
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
                                    )}
                                </li>
                            )}
                        </ol>
                    </div>
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
                {/* ========deleted popup========== */}
                {/* {deletedTask&&(
                    <div className='undoDeletedTask'>
                        <p>Task {deletedTask.text} deleted</p>
                        <button
                            onClick={undoDeletedTask}
                        >Undo
                        </button>
                    </div>
                )} */}
                </div>
            </div>
        </div>
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