import React, { PropsWithChildren, ReactNode } from 'react'
import { createPortal } from 'react-dom';
import "./modal.scss";

type Props = {
  className?: string;
  onClose: Function;
  show: boolean;
};

const Modal = ({
  children,
  className,
  show,
  onClose,
}: PropsWithChildren<Props>) => {
  const portalTarget = document.getElementById('root');
  const parts = getParts(children);
  const renderModal = () => (
    <div className={`bg-overlay ${className}`}>
      <div className='modal'>
        {parts.header && (
          <div className='modal__header'>
            <span>{parts.header.title}</span>
            <button className='modal__cancel' onClick={() => onClose()}>
              X
            </button>
          </div>
        )}
        <div className='modal__content'>
          {parts.content.children}
        </div>
        {parts.footer && (
          <div className='modal__footer'>
            {parts.footer.children}
          </div>
        )}
      </div>
    </div>
  );
  
  return show ? (
    portalTarget 
    && createPortal(renderModal(), portalTarget)
  ) : null;
}

const getParts = (children: ReactNode) => {
  const parts: any = {
    header: undefined,
    content: undefined,
    footer: undefined,
  };

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === Modal.Header) {
        parts.header = child.props;
      } else if (child.type === Modal.Content) {
        parts.content = child.props;
      } else if (child.type === Modal.Footer) {
        parts.footer = child.props;
      }
    }
  });

  return parts;
}

const Header = (_props: any) => {
  throw new Error("Please place `Modal.Header` inside `Modal` component");
}
const Content = (_props: any) => {
  throw new Error("Please place `Modal.Content` inside `Modal` component");
}
const Footer = (_props: any) => {
  throw new Error("Please place `Modal.Footer` inside `Modal` component");
}

Modal.Header = Header;
Modal.Content = Content;
Modal.Footer = Footer;

export default Modal;