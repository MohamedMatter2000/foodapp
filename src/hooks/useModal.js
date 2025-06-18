import { useState } from "react";
const useModal = (initialModalId = null) => {
  const [openModalId, setOpenModalId] = useState(initialModalId);
  // For a single modal, you can use a simple boolean check
  const isOpen = (modalId = "default") => modalId === openModalId;
  // Open a specific modal (or the default one if no ID is provided)
  const openModal = (modalId = "default") => {
    setOpenModalId(modalId);
  };
  // Close all modals
  const closeModal = () => {
    setOpenModalId(null);
  };
  // Toggle a specific modal
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
