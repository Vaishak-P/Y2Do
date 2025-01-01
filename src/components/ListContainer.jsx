import React,{useState} from 'react'
import ToDoNotification from './ToDoNotification.jsx'
import ToDoSearchFilter from './ToDoSearchFilter.jsx'
import ShowEmpty from './ShowEmpty.jsx'
import ShowEdit from './ShowEdit.jsx'
import ShowToDos from './showToDos.jsx'

const ListContainer = ({tasks,setTasks}) => {
    
    const [filter,setFilter] = useState("all")
    const [searchQuery,setSearchQuery] = useState("");
    const [deletedTask,setDeletedTask] = useState("");
    const [deletedTaskIndex,setDeletedTaskIndex] = useState("")
    const [editingIndex,setEditingIndex] = useState(null);
    const [editText,setEditText] = useState('');

    const filteredTasks = tasks.filter((task)=> {
        const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase())
        if (filter==="active") return !task.completed && matchesSearch;
        if (filter==="completed") return task.completed && matchesSearch;
        return matchesSearch;
    })
    
    return(
        <div className='toDoList'>
            <ToDoSearchFilter filter={filter} setFilter={setFilter} searchQuery={searchQuery} setSearchQuery={setSearchQuery}></ToDoSearchFilter>
            <div className='olContainer'>
                <ol>
                    {filteredTasks.length==0? (
                        <ShowEmpty></ShowEmpty>
                    ):(
                        filteredTasks.map((task,index) =>
                            <li key={task.id}>
                                {editingIndex=== index? (
                                    // ======== IF EDITING ON ========== 
                                    <ShowEdit index={index} task={task} tasks={tasks} setTasks={setTasks} editText={editText} setEditText={setEditText} setEditingIndex={setEditingIndex}></ShowEdit>
                                ):(
                                    // ======== IF EDITING OFF ========== 
                                    <ShowToDos index={index} task={task} tasks={tasks} setTasks={setTasks} setEditingIndex={setEditingIndex} setEditText={setEditText} setDeletedTask={setDeletedTask} setDeletedTaskIndex={setDeletedTaskIndex}></ShowToDos>
                                )}
                            </li>
                        )
                    )}
                </ol>
            </div>
            {/* notificationContainer */}
            <ToDoNotification deletedTask={deletedTask} setDeletedTask={setDeletedTask} tasks={tasks} setTasks={setTasks} deletedTaskIndex={deletedTaskIndex} setDeletedTaskIndex={setDeletedTaskIndex}></ToDoNotification>
        </div>
    )
}   
export default ListContainer

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