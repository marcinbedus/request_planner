import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useModalLogic } from "./logic";

export const CustomModal = () => {
  const { isOpen, message, closeModal } = useModalLogic();

  return (
    <Modal show={isOpen} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>Error occured</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
