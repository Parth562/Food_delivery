import classes from './Modal.module.css';
import React from 'react';
import ReactDom from 'react-dom';

const BackDrop = (props) => {
   return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
   return (
      <div className={classes.modal}>
         <div className={classes.content}>{props.children}</div>
      </div>
   );
};

const Modal = (props) => {
   return (
      <React.Fragment>
         {ReactDom.createPortal(
            <BackDrop onClose={props.onClose} />,
            document.getElementById('overlays')
         )}
         {ReactDom.createPortal(
            <ModalOverlay>{props.children}</ModalOverlay>,
            document.getElementById('overlays')
         )}
      </React.Fragment>
   );
};

export default Modal;
