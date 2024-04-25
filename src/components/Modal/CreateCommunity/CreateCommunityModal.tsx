import {
  Box,
  Button,
  Checkbox,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { auth, firestore } from "../../../firebase/clientApp";
import SignUp from "../Auth/SignUp";
import { useRouter } from "next/router";
import useDirectory from "../../../hooks/useDirectory";

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [communityName, setCommunityName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(20);
  const [communityType, setCommunityType] = useState("public"); // ["public", "restricted", "private"
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 50) return;
    setCommunityName(event.target.value);
    setCharsRemaining(50 - communityName.length);
  };

  const { toggleMenuOpen } = useDirectory();

  const onCommunityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name);
    setCommunityType(event.target.name);
  };

  const handleCreateCommunity = async () => {
    console.log("Create Course");
    const format = /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(communityName)) {
      setError("CourseName can not contain special characters");
      return;
    }
    if (communityName.length < 3) {
      setError("CourseName must be in between 3-20");
      return;
    }

    try {
      const communityDocRef = doc(firestore, "communities", communityName);
      await runTransaction(firestore, async (transaction) => {
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error("CourseName already exists.Try Another name");
        }
        transaction.set(communityDocRef, {
          createrID: user?.uid,
          createdAt: serverTimestamp(),
          numberofMembers: 0,
          privacyType: communityType,
        });
        transaction.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),
          {
            communityId: communityName,
            isModerator: true,
          }
        );
      });

      handleClose();
      toggleMenuOpen();

      router.push(`/r/${communityName}`);
    } catch (error: any) {
      console.log("Handle Create Community Error", error);
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            padding={3}
          >
            Create a Course
          </ModalHeader>
          <Box pl={3} pr={3}>
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Text fontWeight={600} fontSize={15}>
                CourseName
              </Text>
              <Text fontSize="15px" fontWeight={11} color="gray.500">
                Enter Your Course Name
              </Text>
              {/* <Text
                position="relative"
                top="28px"
                left="10px"
                width="20px"
                color="gray.400"
              >
                snu/
              </Text> */}
              <Input
                position="relative"
                value={communityName}
                size="sm"
                pl="22px"
                onChange={handleChange}
              />
              <Text
                fontSize="9px"
                color={charsRemaining === 0 ? "red" : "gray.500"}
              >
                Charaters Remaining: {charsRemaining}
              </Text>
              <Text fontSize="9px" color="red" pt={1}>
                {error}
              </Text>
              <Box mt={4} mb={4}>
                <Text fontWeight={600} fontSize={15}>
                  Type of The Course
                </Text>
                <Stack>
                  <Checkbox
                    name="public"
                    isChecked={communityType === "public"}
                    onChange={onCommunityChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillPersonFill} fontSize={14} mr={2} />
                      <Text fontSize={14} mr={1}>
                        Public
                      </Text>
                      <Text ml={2} fontSize={10} color="gray.500">
                        Anyone can view, post, and comment
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={onCommunityChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillEyeFill} fontSize={14} mr={2} />
                      <Text fontSize={14} mr={1}>
                        Restricted
                      </Text>
                      <Text ml={2} fontSize={10} color="gray.500">
                        Anyone can view but only approved users can post
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType === "private"}
                    onChange={onCommunityChange}
                  >
                    <Flex align="center">
                      <Icon
                        as={RiGitRepositoryPrivateLine}
                        fontSize={14}
                        mr={2}
                      />
                      <Text fontSize={14} mr={1}>
                        Private
                      </Text>
                      <Text ml={2} fontSize={10} color="gray.500">
                        Only approved users can view and post
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button
              mr={3}
              onClick={handleClose}
              variant="outline"
              height="30px"
              onChange={() => {}}
            >
              Close
            </Button>
            <Button
              height="30px"
              onClick={handleCreateCommunity}
              isLoading={loading}
            >
              Create Course
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateCommunityModal;
