import React, { FC, ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom'
import ModalOverlay from './modal-overlay/modal-overlay'
import ModalHeader from './modal-header/modal-header';
import modalStyle from './modal.module.css'
import PropTypes from 'prop-types';

import { DELETE_INGRIDIENTS_DETAIL } from '../../services/constants/ingredient-details';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../services/type/data';

const modalRoot = document.getElementById('react-modals') as HTMLElement;

interface IModal {
    onClose: ()=> void;
    children: ReactNode;
    header?: string;
}

const Modal: FC<IModal> = ({ onClose, children, header }) => {
    const navigate = useNavigate()

    const location = useLocation();
    const background = location.state && location.state.background
    function closeModal(){
        if(background){
        return navigate('/')
        }
        return onClose();
    }
    const handleEscClick = (event: KeyboardEvent) => {
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
export default Modal