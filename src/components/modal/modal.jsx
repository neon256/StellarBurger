import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import ModalOverlay from './modal-overlay/modal-overlay'
import ModalHeader from './modal-header/modal-header';
import modalStyle from './modal.module.css'

const modalRoot = document.getElementById('react-modals')

function Modal({onClose, children, header}) {


        const handleEscClick = (event) =>{
            if(event.key === 'Escape'){
                onClose()
            }
        }
    
        useEffect(() => {
            document.addEventListener('keydown', handleEscClick);
            return () => {
                document.removeEventListener('keydown', handleEscClick);
            }
        },[]) 
        return ReactDOM.createPortal(
            (
                <>
                    <div className={modalStyle.modal}>
                        <ModalHeader onClose={onClose}>{header}</ModalHeader>
                        {children}
                    </div>
                    <ModalOverlay onClose={onClose} />
                </>
            ),
            modalRoot
        );
}

export default Modal