// import React from "react";
// import {
//   Box,
//   Flex,
//   Stack,
//   Heading,
//   Input,
//   Button,
//   Text,
//   Link,
//   useColorModeValue,
//   FormControl,
//   FormLabel,
// } from "@chakra-ui/react";
// import { motion } from "framer-motion";

// const MotionBox = motion(Box);

// const AuthPage: React.FC = () => {
//   const [isLogin, setIsLogin] = React.useState(true);

//   const handleToggle = () => setIsLogin(!isLogin);

//   return (
//     <Flex
//       alignItems="center"
//       justifyContent="center"
//       minH="95vh"
//       bgGradient="linear(to-r, orange.400, orange.500)"
//       px={4}
//     >
//       <MotionBox
//         bg={useColorModeValue("white", "gray.800")}
//         p={8}
//         rounded="2xl"
//         boxShadow="2xl"
//         w={{ base: "full", sm: "md" }}
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <Stack gap={6} textAlign="center">
//           <Heading color="orange.500">
//             {isLogin ? "Welcome Back" : "Create an Account"}
//           </Heading>
//           <Text color="gray.500" fontSize="sm">
//             {isLogin
//               ? "Login to continue exploring our services"
//               : "Sign up to get started with us!"}
//           </Text>
//         </Stack>

//         <Stack spacing={4} mt={6}>
//           {!isLogin && (
//             <FormControl id="name">
//               <FormLabel>Full Name</FormLabel>
//               <Input
//                 type="text"
//                 placeholder="Enter your name"
//                 focusBorderColor="orange.400"
//               />
//             </FormControl>
//           )}

//           <FormControl id="email">
//             <FormLabel>Email Address</FormLabel>
//             <Input
//               type="email"
//               placeholder="you@example.com"
//               focusBorderColor="orange.400"
//             />
//           </FormControl>

//           <FormControl id="password">
//             <FormLabel>Password</FormLabel>
//             <Input
//               type="password"
//               placeholder="********"
//               focusBorderColor="orange.400"
//             />
//           </FormControl>

//           {!isLogin && (
//             <FormControl id="confirmPassword">
//               <FormLabel>Confirm Password</FormLabel>
//               <Input
//                 type="password"
//                 placeholder="Re-enter password"
//                 focusBorderColor="orange.400"
//               />
//             </FormControl>
//           )}

//           <Button
//             mt={4}
//             bg="orange.500"
//             color="white"
//             _hover={{ bg: "orange.600" }}
//             size="lg"
//             fontWeight="600"
//           >
//             {isLogin ? "Login" : "Sign Up"}
//           </Button>
//         </Stack>

//         <Text mt={4} textAlign="center" color="gray.600">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}
//           <Link
//             ml={2}
//             color="orange.500"
//             fontWeight="600"
//             onClick={handleToggle}
//             _hover={{ textDecoration: "underline" }}
//           >
//             {isLogin ? "Sign Up" : "Login"}
//           </Link>
//         </Text>
//       </MotionBox>
//     </Flex>
//   );
// };

// export default AuthPage;