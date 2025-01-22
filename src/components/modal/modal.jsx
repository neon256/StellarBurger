import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import ModalOverlay from './modal-overlay/modal-overlay'
import ModalHeader from './modal-header/modal-header';
import modalStyle from './modal.module.css'
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { DELETE_INGRIDIENTS_DETAIL } from '../../services/actions/ingredient-details';
import { useLocation, useNavigate } from 'react-router-dom';

const modalRoot = document.getElementById('react-modals')

function Modal({ onClose, children, header }) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const location = useLocation();
    const background = location.state && location.state.background
    function closeModal(){
        if(background){
        return navigate('/')
        }
        return onClose();
    }
    const handleEscClick = (event) => {
        if (event.key === 'Escape') {
            closeModal()
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', handleEscClick);
        return () => {
            document.removeEventListener('keydown', handleEscClick);
        }
    }, [])
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
Modal.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.object,
    header: PropTypes.string
}
export default Modal