
import React from 'react'

function Button (props) {
  return (
    <div>
      <button type='button' className={props.color} onClick={props.ClickHandler} >{props.value}</button>
    </div>
  )
}

export default Button