import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({items,deleteItem,editItem}) => {
  return <section className='grocery-list'>
    {
      items.map((item)=>{
        const {id,title} = item
        return <article key={id} className='grocery-item'>
          <p className="title">{title}</p>
          <div className="btn-container">
            <button type="button" className='edit-btn' onClick={()=>editItem(id)}><FaEdit/></button>
            <button type="button" className='delete-btn' onClick={()=>deleteItem(id)}><FaTrash/></button>
          </div>
        </article>
      })
    }
  </section>
}

export default List
