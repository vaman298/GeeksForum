import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { useSignInWithGithub, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebase/clientApp";

type OAuthButtonsProps = {};

const OAuthButtons: React.FC<OAuthButtonsProps> = () => {
  const [signInWithGoogle, userCred1, loading, error] = useSignInWithGoogle(auth);
  const [signInWithGithub, userCred2, loading1, error1] = useSignInWithGithub(auth);

  const createUserDocument = async (user: User) => {
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef,JSON.parse(JSON.stringify(user)));

  }

  React.useEffect(() => {
    if (userCred1) {
      createUserDocument(userCred1.user);
    }
  }, [userCred1]);

  return (
    <Flex direction="column" mb={4} width="100%">
      <Button
        variant="oauth"
        mb={2}
        onClick={() => signInWithGoogle()}
        isLoading={loading}
      >
        <Image
          src="/images/googlelogo.png"
          height="20px"
          mr={4}
          alt="google logo"
        />
        Continue with Google
      </Button>
      {error && (
        <Text textAlign="center" fontSize="10pt" color="red" mt={2}>
          {error.message}
        </Text>
      )}
      <Button
        variant="oauth"
        mb={2}
        onClick={() => signInWithGithub()}
        isLoading={loading1}
      >
        <Image
          src="/images/github.png"
          height="20px"
          mr={4}
          alt="google logo"
        />
        Continue with Github
      </Button>
      {error1 && (
        <Text textAlign="center" fontSize="10pt" color="red" mt={2}>
          {error1.message}
        </Text>
      )}
      
    </Flex>
  );
};
export default OAuthButtons;
