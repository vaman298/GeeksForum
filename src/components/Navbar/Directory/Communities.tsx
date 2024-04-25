import { Box, Text, Flex, Icon, MenuItem } from "@chakra-ui/react";
import React, { use, useState } from "react";
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";
import { GrAdd } from "react-icons/gr";
import { useRecoilValue } from "recoil";
import { m } from "framer-motion";
import { communityState } from "../../../atoms/communitiesAtom";
import { FaReddit } from "react-icons/fa";
import MenuListItem from "./MenuListItem";
import { RiCommunityFill } from "react-icons/ri";

type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = useState(false);
  const mySnippets = useRecoilValue(communityState).mySnippets;
  console.log(useRecoilValue(communityState));

  console.log(mySnippets);

  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <Box mt={3} mb={4}>
        <Text pl={3} fontWeight={600} fontSize="20x" mb={1} color="gray.500">
          Moderating
        </Text>

        {mySnippets
          .filter((snippet) => snippet.isModerator)
          .map((snippet) => (
            <MenuListItem
              key={snippet.communityId}
              icon={RiCommunityFill}
              displayText={snippet.communityId}
              link={`/r/${snippet.communityId}`}
              iconColor="brand.100"
              imageURL={snippet.imageURL}
            />
          ))}
      </Box>
      <Box mt={3} mb={4}>
        <Text pl={3} fontWeight={600} fontSize="20x" mb={1} color="gray.500">
          My Courses
        </Text>

        <MenuItem
          width="100%"
          fontSize="10px"
          _hover={{ bg: "gray.100" }}
          onClick={() => setOpen(true)}
        >
          <Flex align="center">
            <Icon fontSize={20} mr={2} as={GrAdd} />
            Create Course
          </Flex>
        </MenuItem>

        {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            icon={RiCommunityFill}
            displayText={snippet.communityId}
            link={`/r/${snippet.communityId}`}
            iconColor="blue.500"
            imageURL={snippet.imageURL}
          />
        ))}
      </Box>
    </>
  );
};
export default Communities;
