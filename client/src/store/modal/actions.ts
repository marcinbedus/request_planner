import { ModalActions } from "./index.d";

export const openModal = (payload: { message: string }): ModalActions => ({
  type: "open_modal",
  payload,
});

export const closeModal = (): ModalActions => ({
  type: "close_modal",
});
