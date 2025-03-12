/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../../hooks/useOutsideClick";
const ModalContext = createContext();
function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = (name) => setOpenName(name);
  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  });
}
function Header({ children }) {
  return (
    <div className=" delete-popup d-flex align-items-center justify-content-between p-3">
      {children}
    </div>
  );
}
function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);
  if (name !== openName) return null;

  return createPortal(
    <div className="popup-overlay">
      <div
        ref={ref}
        className="popup-content bg-light rounded-4"
        style={{
          boxShadow:
            " rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px",
        }}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
Modal.Open = Open;
Modal.Window = Window;
Modal.Header = Header;

export default Modal;
// return createPortal(
//   <Overlay>
//     <StyledModal ref={ref}>
//       <Button onClick={close}>
//         <HiXMark />
//       </Button>
//       <div>{cloneElement(children, { onCloseModal: close })}</div>
//     </StyledModal>
//   </Overlay>,
//   document.body
// );
