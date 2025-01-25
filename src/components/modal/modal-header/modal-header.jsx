import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import modalStyle from '../modal.module.css'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom'

const ModalHeader = ({children, onClose}) => {
  const navigate = useNavigate()
  const location = useLocation();
  const background = location.state && location.state.background
  function closeModal(){
    if(background){
      return navigate('/')
    }
    return onClose();
  }
  return (
    <div className={`${modalStyle.header} text text_type_main-large`}>
        <p>{children}</p>
        <CloseIcon type="primary" onClick={()=>{closeModal()}} className={modalStyle.close}/>
    </div>
  )
}
ModalHeader.propTypes = { 
  children: PropTypes.string,
  onClose: PropTypes.func,
}
export default ModalHeader