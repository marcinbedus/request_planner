import { useModalContext } from "../../../store/modal";

export const useModalLogic = () => {
  const {
    actions: { closeModal },
    state: { isOpen, message },
  } = useModalContext();

  return {
    closeModal,
    isOpen,
    message,
  };
};
