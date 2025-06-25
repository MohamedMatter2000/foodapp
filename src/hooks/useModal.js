import { useState } from "react";
const useModal = (initialModalId = null) => {
  const [openModalId, setOpenModalId] = useState(initialModalId);
  const isOpen = (modalId = "default") => modalId === openModalId;
  const openModal = (modalId = "default") => {
    setOpenModalId(modalId);
  };
  const closeModal = () => {
    setOpenModalId(null);
  };
  const toggleModal = (modalId = "default") => {
    setOpenModalId((current) => (current === modalId ? null : modalId));
  };
  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
    currentModal: openModalId,
  };
};

export default useModal;
