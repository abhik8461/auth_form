import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  useToast,
  FormControl,
} from "@chakra-ui/react";
import { forgot } from "../http/api";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Forgot = () => {
  const Toast = useToast();
  const [email, setEmail] = useState({});
  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      const { data } = await forgot({ email });
      if (data.status) {
        Toast({
          title: "Email send successfully",
          // description: "We've created your account for you.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
      Toast({
        title: "Something went wrong",
        // description: "We've created your account for you.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      Toast({
        title: "internal server error",
        // description: "We've created your account for you.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                  // pointerEvents="none"
                  // children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email address"
                  />
                </InputGroup>
              </FormControl>

              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={handleForgot}
              >
                Forgot Password
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Back to login?{" "}
        {/* <Link color="teal.500" href="#">
          Sign Up
        </Link> */}
        <Link style={{ color: "teal.500" }} to={"/login"}>
          Login
        </Link>
      </Box>
    </Flex>
  );
};

export default Forgot;
