import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [name,setName] = useState('')
  const [list,setList] = useState([])
  const [isEditing,setIsEditing] = useState(false)
  const [editId,setEditId] = useState(null)
  const [alert,setAlert] = useState({
    show:false,
    msg:'',
    type:''
  })

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!name){
      //alert
      showAlert(true,'danger','Plz enter value')
    }
    else if(name && isEditing){
      //edit
      setList(list.map((item)=>{
        if(item.id ===editId){
          return {...item,title:name}
        }
        return item
      }))
      setName('')
      setEditId(null)
      setIsEditing(false)
      showAlert('true','success','Successfully changed !')
    }
    else{
      //add item to list
      showAlert(true,'success','item added successfully!')
      const newItem = {
        id: new Date().getTime().toString(),
        title:name
      }

      setList([...list,newItem])
      setName('')
    }
  
  }

  const clearItems = () =>{
    showAlert(true,'danger','No Items In the List!')
    setList([])
  }

  const deleteItem = (id) =>{
    showAlert(true,'danger','Item removed!')
    setList(list.filter(l=>l.id!==id))
  }

  const editItem = (id) =>{
    const targetItem = list.find(item=>item.id===id)
    setIsEditing(true)
    setEditId(id)
    setName(targetItem.title)
  }

  const showAlert = (show = false, type="",msg="")=>{
    setAlert({
      show,type,msg
    })
  }
  return <section className='section-center'>
    <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} list={list} removeAlert={showAlert}/>}
        <h3>Grocery bud</h3>
        <div className="form-control">
          <input type="text"
          className='grocery'
          placeholder='e.g bananas'
          value={name}
          onChange={(e)=>setName(e.target.value)}
          />
          <button className="submit-btn" type='submit'>{isEditing ? 'edit' : 'submit'}</button>
        </div>
    </form>
    {
      list.length > 0 ? <div className="grocery-container">
      <List items={list} deleteItem={deleteItem} editItem={editItem}/>
      <button className="clear-btn" onClick={clearItems}>clear items</button>
    </div> : null
    }
      
    
  </section>
}

export default App
