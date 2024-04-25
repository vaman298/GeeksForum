import { Box, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import { communityState } from "../../../atoms/communitiesAtom";
// import About from "../../../components/Community/About";
import PageContentLayout from "../../../components/Layout/PageContent";
import { auth } from "../../../firebase/clientApp";
import useCommunityData from "../../../hooks/useCommunityData";
import NewPostForm from "../../../components/Posts/NewPostForm";
import About from "../../../components/Community/About";

const CreateCommmunityPostPage: NextPage = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { community } = router.query;
  // const visitedCommunities = useRecoilValue(communityState).visitedCommunities;
  // const communityStateValue = useRecoilValue(communityState);
  const { communityStateValue } = useCommunityData();
  const { loading } = useCommunityData();

  console.log("HERE IS COMMUNITY", communityStateValue.currentCommunity);

  /**
   * Not sure why not working
   * Attempting to redirect user if not authenticated
   */
  //   useEffect(() => {
  //     if (!user && !loadingUser && communityStateValue.currentCommunity.id) {
  //       router.push(`/r/${communityStateValue.currentCommunity.id}`);
  //     }
  //   }, [user, loadingUser, communityStateValue.currentCommunity]);

  //   console.log("HERE IS USER", user, loadingUser);

  return (
    <PageContentLayout>
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text fontWeight={600}>Create a post</Text>
        </Box>
        {user && (
          <NewPostForm
            // communityId={communityStateValue.currentCommunity.id}
            communityImageURL={communityStateValue.currentCommunity?.imageURL}
            user={user}
          />
        )}
      </>
      {/* {communityStateValue.currentCommunity && ( */}
      <>
        {communityStateValue.currentCommunity && (
          <About
            communityData={communityStateValue.currentCommunity}
            pt={6}
            onCreatePage
            loading={loading}
          />
        )}
      </>
    </PageContentLayout>
  );
};

export default CreateCommmunityPostPage;
