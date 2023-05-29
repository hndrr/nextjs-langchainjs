import { useDisclosure } from "@chakra-ui/react";
import { ReactElement } from "react";
import { Header } from "@/components/Header";
import { ApiKeyModal } from "@/components/Modal/Apikey";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export const ChatLayout = ({ children }: LayoutProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Header onOpen={onOpen} />
      {children}
      <ApiKeyModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
