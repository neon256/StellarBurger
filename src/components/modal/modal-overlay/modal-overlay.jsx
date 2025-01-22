import React from 'react'
import modalStyle from '../modal.module.css'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom'

const ModalOverlay = ({ onClose }) => {
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
    <div className={modalStyle.overlay} onClick={()=>{closeModal()}}>

    </div>
  )
}
ModalOverlay.propTypes = {
  onClose: PropTypes.func
}
export default ModalOverlay