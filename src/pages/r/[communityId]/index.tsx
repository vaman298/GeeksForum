import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import type { GetServerSidePropsContext, NextPage } from "next";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import safeJsonStringify from "safe-json-stringify";
import { Community, communityState } from "../../../atoms/communitiesAtom";
import { auth, firestore } from "../../../firebase/clientApp";
import CommunityNotFound from "../../../components/Community/NotFound";
import Header from "../../../components/Community/Header";
import PageContentLayout from "../../../components/Layout/PageContent";
import CreatePostLink from "../../../components/Community/CreatePostLink";
import Posts from "../../../components/Posts/Posts";
import About from "../../../components/Community/About";

interface CommunityPageProps {
  communityData: Community;
}

const CommunityPage: NextPage<CommunityPageProps> = ({communityData}) => {
  console.log(communityData);
  const [user, loadingUser] = useAuthState(auth);


  const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);

  // useEffect(() => {
  //   // First time the user has navigated to this community page during session - add to cache
  //   const firstSessionVisit =
  //     !communityStateValue.visitedCommunities[communityData.id!];

  //   if (firstSessionVisit) {
  //     setCommunityStateValue((prev) => ({
  //       ...prev,
  //       visitedCommunities: {
  //         ...prev.visitedCommunities,
  //         [communityData.id!]: communityData,
  //       },
  //     }));
  //   }
  // }, [communityData]);

  useEffect(() => {
    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }));
  }, [communityData, setCommunityStateValue]);

  if (!communityData) {
    return <CommunityNotFound />;
  }

  // Community was not found in the database

  return (

    <>
      <Header communityData={communityData} />
      <PageContentLayout>
        <>
          <CreatePostLink />
          <Posts
            communityData={communityData}
            // userId={user?.uid}
            // loadingUser={loadingUser}
          />
        </>
        {/* Right Content */}
        <>
        <About communityData={communityData}/>
        </>
      </PageContentLayout>
    </>
  );
};


export async function getServerSideProps(context: GetServerSidePropsContext) {


  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);
    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() }) // needed for dates
            )
          : "",
      },
    };
  } catch (error) {
    console.log("getServerSideProps error - [community]", error);
    return { props: {} };
  }
}

export default CommunityPage;