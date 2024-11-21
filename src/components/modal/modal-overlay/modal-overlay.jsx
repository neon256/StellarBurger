import React from 'react'
import modalStyle from '../modal.module.css'

const ModalOverlay = ({onClose}) => {
  return (
    <div className={modalStyle.overlay} onClick={onClose}>

    </div>
  )
}

export default ModalOverlay