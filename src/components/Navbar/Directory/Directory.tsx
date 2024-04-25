import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  Image,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import { TiHome } from "react-icons/ti";
import useDirectory from "../../../hooks/useDirectory";
import Communities from "./Communities";

type DirectoryProps = {};

const Directory: React.FC<DirectoryProps> = () => {
  const { directoryState, toggleMenuOpen } = useDirectory();
  return (
    <Menu isOpen={directoryState.isOpen}>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius="4px"
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
        mr={2}
        ml={2}
        onClick={toggleMenuOpen}
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          width={{ base: "auto", lg: "200px" }}
        >
          <Flex alignItems="center">
            <>
              {directoryState.selectedMenuItem.imageURL ? (
                <Image
                  mr={2}
                  alt="photo"
                  borderRadius="full"
                  boxSize="24px"
                  src={directoryState.selectedMenuItem.imageURL}
                  color="blue.500"
                />
              ) : (
                <Icon
                  fontSize={24}
                  mr={{ base: 1, md: 2 }}
                  as={directoryState.selectedMenuItem.icon}
                  color={directoryState.selectedMenuItem.iconColor}
                />
              )}

              {/* <Icon fontSize={24} mr={{ base: 1, md: 2 }} as={TiHome} /> */}
              <Box
                display={{ base: "none", lg: "flex" }}
                flexDirection="column"
                fontSize="10pt"
              >
                <Text fontWeight={600}>
                  {directoryState.selectedMenuItem.displayText}
                </Text>
              </Box>
            </>
          </Flex>
          <ChevronDownIcon color="gray.500" />
        </Flex>
      </MenuButton>
      <MenuList width="100%">
        <Communities />
        {/* <> */}
        {/* <Flex direction="column" mt={2} mb={4}> */}
        {/* <Text pl={3} fontSize="7pt" fontWeight={500} color="gray.500">
            MY COMMUNITIES
          </Text>
          <MenuItem width="100%" fontSize="10pt" _hover={{ bg: "gray.100" }}>
            <Flex alignItems="center">
              <Icon fontSize={20} mr={2} as={GrAdd} />
              Create Community
            </Flex>
          </MenuItem> */}
        {/* </Flex> */}
        {/* <Text pl={3} fontSize="7pt" fontWeight={500} color="gray.500">
            FEEDS
          </Text>
          <MenuItem width="100%" fontSize="10pt" _hover={{ bg: "gray.100" }}>
            <Flex alignItems="center">
              <Icon fontSize={20} mr={2} as={GrAdd} />
              Create Community
            </Flex>
          </MenuItem> */}
        {/* </> */}
      </MenuList>
    </Menu>
  );
};
export default Directory;
