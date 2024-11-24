import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import modalStyle from '../modal.module.css'
import PropTypes from 'prop-types'

const ModalHeader = ({children, onClose}) => {
  return (
    <div className={`${modalStyle.header} text text_type_main-large`}>
        <p>{children}</p>
        <CloseIcon type="primary" onClick={onClose} className={modalStyle.close}/>
    </div>
  )
}
ModalHeader.propTypes = { 
  onClose: PropTypes.func,
  children: PropTypes.string,
}
export default ModalHeader