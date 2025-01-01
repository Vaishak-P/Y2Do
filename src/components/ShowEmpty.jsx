import React from 'react'
import emptyImage from '../assets/no-task.png'

const ShowEmpty = () => {
  return (
    <div className='emptyContainer'>
        <img src={emptyImage} alt='empty'/>
        <h2 className='emptyHeading'><span>empty</span> here</h2>
        <h6 className='emptySubheading'>Add your tasks now!</h6>
    </div>
  )
}

export default ShowEmpty