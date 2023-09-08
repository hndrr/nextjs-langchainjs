import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Menu as ChakraMenu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  VStack,
  Box,
  Text,
  type BoxProps,
} from "@chakra-ui/react";

import { useAuth } from "@/hooks/useAuth";

type MenuProps = {
  children?: React.ReactNode;
} & BoxProps;

export const Menu = (props: MenuProps) => {
  const { session, signOut } = useAuth();

  return (
    <Box {...props}>
      <ChakraMenu>
        <MenuButton as={Button} w={12} h={12}>
          <VStack mt="20px" spacing={1}>
            <Box boxSize="40px">
              <HamburgerIcon w={6} h={6} />
            </Box>
            <Text pos="relative" top="-22px" fontSize="sm">
              Menu
            </Text>
          </VStack>
        </MenuButton>
        <MenuList>
          {/* <MenuItem>Download</MenuItem>
          <MenuItem>Create a Copy</MenuItem>
          <MenuItem>Mark as Draft</MenuItem>
          <MenuItem>Delete</MenuItem> */}
          {session && <MenuItem onClick={signOut}>SignOut</MenuItem>}
        </MenuList>
      </ChakraMenu>
    </Box>
  );
};
