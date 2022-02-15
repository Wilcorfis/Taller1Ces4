import React from "react";
import '../styles.css'
const Modal = (props) => {

    return (
        <div className={props.isOpen ? 'modal modal--is-open' : 'modal'}>
            <button  style={{color:"white"}}onClick={props.onClose}>X</button>
            <h4 style={{color:"white"}}>{props.title}</h4>

            <p style={{color:"white"}}>{props.message}</p>
        </div>
    );  

}

export default Modal;