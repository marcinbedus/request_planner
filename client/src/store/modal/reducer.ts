import { IModalState, ModalActions } from "./index.d";

export const modalReducer = (state: IModalState, action: ModalActions) => {
  switch (action.type) {
    case "open_modal":
      return {
        ...state,
        message: action.payload.message,
        isOpen: true,
      };
    case "close_modal":
      return {
        ...state,
        message: "",
        isOpen: false,
      };
  }
};
