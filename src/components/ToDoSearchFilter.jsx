import React,{useState} from 'react'

function ToDoSearchFilter({filter,setFilter,searchQuery,setSearchQuery}) {
  
  return (
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
  )
}

export default ToDoSearchFilter