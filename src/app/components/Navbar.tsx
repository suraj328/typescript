"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { FiMenu, FiX } from "react-icons/fi";
import { imageConfig } from "@/config/imageConfig";
import AuthPage from "./AuthPage";

type NavItem = {
  label: string;
  href?: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <Box
        as="header"
        position="sticky"
        top={0}
        zIndex={50}
        borderBottom={"1px solid orange"}
      >
        <Flex
          bgGradient="linear(to-r,orange.400, orange.500, orange.400)"
          color="orange.100"
          minH={{ base: "60px", md: "64px" }}
          px={{ base: 4, md: 8 }}
          alignItems="center"
          boxShadow="sm"
        >
          <Flex flex={{ base: 1 }} align="center">
            <Link href="/">
              <HStack spacing={3} alignItems="center" cursor="pointer">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="700"
                  p={4}
                >
                  <Avatar
                    padding={1}
                    boxSize={20}
                    backgroundColor="black"
                    src={imageConfig.companyLogo}
                  />
                </Box>
                <Text
                  fontWeight="700"
                  display={{ base: "none", md: "block" }}
                  bgGradient="linear(to-r, red.500, orange.800)"
                  bgClip="text"
                  fontSize={"1.2rem"}
                  textShadow={"inherit"}
                >
                  Vayunex Innovations
                </Text>
              </HStack>
            </Link>
          </Flex>

          {/* Desktop nav */}
          <HStack
            as="nav"
            spacing={6}
            ml={10}
            display={{ base: "none", md: "flex" }}
          >
            {NAV_ITEMS.map((item) => (
              <Link key={item.label} href={item.href || "/"}>
                <Text
                  px={3}
                  py={2}
                  rounded="md"
                  _hover={{ bg: "orange.600" }}
                  fontWeight={500}
                  cursor="pointer"
                >
                  {item.label}
                </Text>
              </Link>
            ))}
          </HStack>

          <Flex alignItems="center" ml="auto">
            {/* Desktop actions */}
            <HStack spacing={3} display={{ base: "none", md: "flex" }}>
              <Button
                bg="white"
                color="orange.600"
                _hover={{ bg: "whiteAlpha.900" }}
                size="sm"
                fontWeight={600}
                onClick={() => setShowAuth(true)}
              >
                Sign up
              </Button>

              <Menu>
                <MenuButton as={Button} variant="ghost" px={2} py={1}>
                  <Avatar size="sm" name="Suraj Sah" />
                </MenuButton>
                <MenuList bgColor={"orange.500"}>
                  <MenuItem bgColor={"orange.500"}>Profile</MenuItem>
                  <MenuItem bgColor={"orange.500"}>Settings</MenuItem>
                  <MenuItem bgColor={"orange.500"}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </HStack>

            {/* Mobile menu toggle */}
            <IconButton
              aria-label={isOpen ? "Close menu" : "Open menu"}
              icon={isOpen ? <FiX /> : <FiMenu />}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
              ml={3}
              color="white"
              bg="transparent"
              _hover={{ bg: "whiteAlpha.200" }}
            />
          </Flex>
        </Flex>

        {/* Mobile nav drawer */}
        {isOpen && (
          <Box bg="orange.500" display={{ md: "none" }} px={4} py={4}>
            <Stack as="nav" spacing={3}>
              {NAV_ITEMS.map((item) => (
                <Link key={item.label} href={item.href || "/"}>
                  <Text
                    px={3}
                    py={2}
                    rounded="md"
                    _hover={{ bg: "orange.600" }}
                    fontWeight={600}
                    onClick={onClose}
                    cursor="pointer"
                  >
                    {item.label}
                  </Text>
                </Link>
              ))}

              <Button
                bg="white"
                color="orange.600"
                _hover={{ bg: "whiteAlpha.900" }}
                size="sm"
                fontWeight={600}
                onClick={() => setShowAuth(true)}
              >
                Sign up
              </Button>

              <HStack spacing={3} pt={2}>
                <Avatar size="sm" name="Suraj Sah" />
                <Stack spacing={0}>
                  <Text fontWeight={700}>Suraj Sah</Text>
                  <Text fontSize="sm" opacity={0.9}>
                    Member
                  </Text>
                </Stack>
              </HStack>
            </Stack>
          </Box>
        )}
      </Box>

      {/* Modal for Login/Signup */}
      <Modal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        size="xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent borderRadius="2xl" overflow="hidden">
          <ModalCloseButton />
          <ModalBody p={0}>
            <AuthPage />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Navbar;