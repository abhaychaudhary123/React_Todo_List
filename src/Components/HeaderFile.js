import React from 'react'
import Todo from './Todo';

const HeaderFile = () => {

    const styleHeader = {
        color:'white',
        fontSize:20,
        fontFamily: 'Arimo ,sans-serif',
        
    }

  return (
    <>

    <div className='outerAll'>

        <div className='headText'>
            <div className='widthTop'>
                <span style={styleHeader}>REACT TODO LIST</span>
            </div>
        </div>
        
        <Todo />

    </div>
        

    
    
    </>
  )
}

export default HeaderFile;