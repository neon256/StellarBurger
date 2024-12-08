import React from 'react'
import modalStyle from '../modal.module.css'
import PropTypes from 'prop-types'

const ModalOverlay = ({ onClose }) => {
  return (
    <div className={modalStyle.overlay} onClick={onClose}>

    </div>
  )
}
ModalOverlay.propTypes = {
  onClose: PropTypes.func
}
export default ModalOverlay