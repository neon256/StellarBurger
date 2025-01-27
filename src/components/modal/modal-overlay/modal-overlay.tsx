import React, { FC } from 'react'
import modalStyle from '../modal.module.css'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom'

interface IModalOverlay {
  onClose: ()=> void;
}

const ModalOverlay: FC<IModalOverlay> = ({ onClose }) => {
  const navigate = useNavigate()
  const location = useLocation();
  const background: string = location.state && location.state.background
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

export default ModalOverlay