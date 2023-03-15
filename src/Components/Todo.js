import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { Tooltip } from '@mui/material';



//get Local Storage data

const getLocal = () => {
  let list = localStorage.getItem('todoList');

  if(list)
  {
    return JSON.parse(list);
  }
  else
  {
    return [];
  }
}

const Todo = () => {

  const [input,setInput] = useState('');
  const [item,setItem] = useState(getLocal());
  const [msg,setMsg] = useState('');
  const [toggle,setToggle] = useState(true);
  const [uValue,setUValue] = useState('');

  useEffect(() => {
    if((item.length === 0))
    {
      setMsg(' No Todos , Create One');
    }
    else
    {
      setMsg('My Todo List');
    }

  },[item]);
  
 

  const addItem = () => {
    if(!input)
    {

    }else{
      const allInputData = {
        id : new Date().getTime().toString() ,
        name : input
      }
    setItem([...item,allInputData]);
    setInput('');
    }
  }
//delete one
  const deleteItem = (index) => {
    const updatedItem = item.filter((ele) => {
      return index !== ele.id;
    })
    setItem(updatedItem);
  }
  //delete all
  const removeAll = () => {
    setItem([]);
  }
  
// add to local storage

  useEffect(() => {
     localStorage.setItem('todoList',JSON.stringify(item));
  },[item]);

// edit item

const editItem = (index) => {
     const setPicked = item.find((ele) => {
        return index === ele.id;
      })

      setInput(setPicked.name);
      setUValue(setPicked.id);
      setToggle(false);
}

// do changes

const doChanges = () => {
  setInput(input);
  const change = item.map((ele) => {
      if(ele.id === uValue)
      {
        console.log(ele.name);
        ele.name = input;
      }
      return ele;
      
  });

  setItem(change);
  setInput('');
  setToggle(true);
}







  return (
    <>
    <div className='todoheadText'>
          <div className='todowidthTop'>
              <div className="flex-container-1">
             
                  <div className="flex-item-left-1">
                    <input type='text' id='addlistinput' value={input} 
                    onChange={(e) => {setInput(e.target.value)}} placeholder='ADD TODO LIST' />
                  </div>

                  {
                    toggle?
                    <div className="flex-item-midright-1">
                      <Tooltip title="Add" arrow>
                          <Button variant="text" style={{color:'black'}} onClick={addItem}><AddIcon /></Button>
                      </Tooltip>
                  </div>
                  :
                  <div className="flex-item-midright-1">
                      <Tooltip title="Do Changes" arrow>
                          <Button variant="text" style={{color:'black'}} onClick={doChanges}><EditIcon /></Button>
                      </Tooltip>
                  </div>


                  }


                  <div className="flex-item-right-1">
                      <Tooltip title="Clear All" arrow>
                        <Button variant="text" style={{color:'black'}} onClick={removeAll}><ClearAllIcon /></Button>
                      </Tooltip>
                  </div>
              </div>
          </div>
    </div>


    <div className='showItem'>
          <div className='EachItem' >
          <h3 className='disMessage'>{msg}</h3>
                    {
                      
                      item.map((elem) => {
                        return (
                          <>
                          
                          <div className="flex-container" >

                             
                              
                              
                              <div className="flex-item-left" >{elem.name}</div>
                              
                              

                              <div className="flex-item-midright"  >
                                  <Tooltip title="Edit" arrow placement='left'>
                                      <Button variant="text" style={{color:'black'}} onClick={() => editItem(elem.id)}><EditIcon /></Button>
                                  </Tooltip>
                              </div>

                              <div className="flex-item-right" >
                                  <Tooltip title="Delete" arrow placement='right'>
                                      <Button variant="text" style={{color:'black'}} onClick={() => deleteItem(elem.id)}><DeleteIcon /></Button>
                                  </Tooltip>
                              </div>
                              
                          </div>
                          </>
                        )
                      })

                    }
                
          </div>
    </div>

     

      
    </>
  )
}

export default Todo;