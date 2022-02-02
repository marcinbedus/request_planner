export interface IModal {
  message: string;
}

export interface IModalState {
  message: string;
  isOpen: boolean;
}

export type ModalActions =
  | { type: "open_modal"; payload: { message: string } }
  | { type: "close_modal" };
