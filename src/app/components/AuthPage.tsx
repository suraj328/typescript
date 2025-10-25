'use client'

import { useState } from 'react'
import {
  Box,
  Flex,
  Stack,
  Heading,
  Input,
  Button,
  Text,
  Link,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion.create(Box)

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  const handleToggle = () => setIsLogin(!isLogin)

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      minH="95vh"
      bgGradient="to-r"
      gradientFrom="orange.400"
      gradientTo="orange.500"
      px={4}
    >
      <MotionBox
        bg="white"
        p={8}
        rounded="2xl"
        shadow="2xl"
        w={{ base: 'full', sm: 'md' }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Stack gap={6} textAlign="center">
          <Heading color="orange.500">
            {isLogin ? 'Welcome Back' : 'Create an Account'}
          </Heading>
          <Text color="gray.500" fontSize="sm">
            {isLogin
              ? 'Login to continue exploring our services'
              : 'Sign up to get started with us!'}
          </Text>
        </Stack>

        <Stack gap={4} mt={6}>
          {!isLogin && (
            <Box>
              <Text mb={2} fontWeight="medium">
                Full Name
              </Text>
              <Input
                type="text"
                placeholder="Enter your name"
                focusRingColor="orange.400"
              />
            </Box>
          )}

          <Box>
            <Text mb={2} fontWeight="medium">
              Email Address
            </Text>
            <Input
              type="email"
              placeholder="you@example.com"
              focusRingColor="orange.400"
            />
          </Box>

          <Box>
            <Text mb={2} fontWeight="medium">
              Password
            </Text>
            <Input
              type="password"
              placeholder="********"
              focusRingColor="orange.400"
            />
          </Box>

          {!isLogin && (
            <Box>
              <Text mb={2} fontWeight="medium">
                Confirm Password
              </Text>
              <Input
                type="password"
                placeholder="Re-enter password"
                focusRingColor="orange.400"
              />
            </Box>
          )}

          <Button
            mt={4}
            bg="orange.500"
            color="white"
            _hover={{ bg: 'orange.600' }}
            size="lg"
            fontWeight="600"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </Stack>

        <Text mt={4} textAlign="center" color="gray.600">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <Link
            ml={2}
            color="orange.500"
            fontWeight="600"
            onClick={handleToggle}
            cursor="pointer"
            _hover={{ textDecoration: 'underline' }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </Link>
        </Text>
      </MotionBox>
    </Flex>
  )
}