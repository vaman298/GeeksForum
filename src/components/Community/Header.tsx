import React from "react";
import { Box, Button, Flex, Icon, Text, Image } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";
import { Community, communityState } from "../../atoms/communitiesAtom";
import { useSetRecoilState } from "recoil";
import useCommunityData from "../../hooks/useCommunityData";

type HeaderProps = {
  communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  /**
   * !!!Don't pass communityData boolean until the end
   * It's a small optimization!!!
   */
  //   , error,
  const { communityStateValue, loading, onJoinLeaveCommunity } =
    useCommunityData(!!communityData);
  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  );

  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%">
        <Image
          src="https://png.pngtree.com/thumb_back/fh260/background/20190830/pngtree-strips-golden-backdrop-image_310043.jpg"
          alt="logo"
          height="100%"
          width="100%"
        />
      </Box>
      <Flex justifyContent="center" bg="white" height="50%">
        <Flex width="95%" maxWidth="860px">
          {/* IMAGE URL IS ADDED AT THE VERY END BEFORE DUMMY DATA - USE ICON AT FIRST */}
          {communityStateValue.currentCommunity?.imageURL ? (
            <Image
              borderRadius="full"
              boxSize="66px"
              src={communityStateValue.currentCommunity.imageURL}
              alt="Anuj MAurya"
              position="relative"
              top={-3}
              color="blue.500"
              border="4px solid white"
            />
          ) : (
            <Image
              borderRadius="full"
              boxSize="66px"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ekQOR4nB46RrJAMTqgek1bKMtGWNOlLQkoEsd5TVMW5ePx7O7zRdEcVHXqXOjwH8VPc&usqp=CAU"
              alt="IMage"
              position="relative"
              top={-3}
              color="blue.500"
              border="4px solid white"
            />
          )}

          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={800} fontSize="16pt">
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize="10pt" color="gray.400">
                {communityData.id}
              </Text>
            </Flex>
            <Flex>
              <Button
                // variant={isJoined ? "outline" : "solid"}
                variant="outline"
                height="30px"
                pr={6}
                pl={6}
                onClick={() => onJoinLeaveCommunity(communityData, isJoined)}
                isLoading={loading}
              >
                {isJoined ? "Joined" : "Join"}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
