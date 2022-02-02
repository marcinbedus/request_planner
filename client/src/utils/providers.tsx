import React from "react";
import { ModalProvider } from "../store/modal";
import { UserProvider } from "../store/user";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalProvider>
      <UserProvider>{children}</UserProvider>
    </ModalProvider>
  );
};
