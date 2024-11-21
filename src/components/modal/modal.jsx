import React from 'react'
import ReactDOM from 'react-dom'
import ModalOverlay from './modal-overlay/modal-overlay'
import ModalHeader from './modal-header/modal-header';
import modalStyle from './modal.module.css'

const modalRoot = document.getElementById('react-modals')

class Modal extends React.Component {
    render() {

        const { onClose, children, header } = this.props;
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
}

export default Modal