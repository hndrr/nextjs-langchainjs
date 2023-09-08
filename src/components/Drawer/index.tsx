import {
  Drawer as ChakraDrawwer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";

type DrawerProps = {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export const Drawer = ({ children, isOpen, onClose }: DrawerProps) => {
  return (
    <ChakraDrawwer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Setting</DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </ChakraDrawwer>
  );
};
