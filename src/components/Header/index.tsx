import { Box } from "@chakra-ui/react";
import { Menu } from "@/components/Header/Menu/";

type HeaderProps = {
  onOpen: () => void;
};

export const Header = ({ onOpen }: HeaderProps) => {
  return (
    <Box>
      <Menu
        pos="absolute"
        top="10px"
        left="10px"
        zIndex="sticky"
        onOpen={onOpen}
      />
    </Box>
  );
};
