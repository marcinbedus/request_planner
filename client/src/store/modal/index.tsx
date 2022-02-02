import React, { createContext, useContext, useReducer } from "react";
import { closeModal, openModal } from "./actions";
import { modalReducer } from "./reducer";
import { initialModalState } from "./state";
import { IModal } from "./index.d";

export const ModalContext = createContext({
  state: initialModalState,
  actions: {
    openModal: (payload: { message: string }) => {},
    closeModal: () => {},
  },
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(modalReducer, initialModalState);

  const actions = {
    openModal: (payload: IModal) => dispatch(openModal(payload)),
    closeModal: () => dispatch(closeModal()),
  };

  const modalContextValues = {
    state,
    actions,
  };

  return (
    <ModalContext.Provider value={modalContextValues}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const { state, actions } = useContext(ModalContext);

  return { state, actions };
};
