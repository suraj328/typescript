"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiMenu, FiX } from "react-icons/fi";
import AuthPage from "./AuthPage";
import { imageConfig } from "@/config/imageConfig";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    setCurrentPage(pathname);
  }, [pathname]);

  const onClose = () => setIsOpen(false);

  return (
    <>
      <Box as="header" position="sticky" top={0} zIndex={50}>
        <Flex
          bgGradient="to-r"
          gradientFrom="orange.400"
          gradientVia="orange.500"
          gradientTo="orange.400"
          color="orange.100"
          minH={{ base: "60px", md: "64px" }}
          px={{ base: 4, md: 8 }}
          alignItems="center"
          shadow="sm"
        >
          <Flex flex={{ base: 1 }} align="center">
            <Link href="/" style={{ textDecoration: "none" }}>
              <HStack gap={3} alignItems="center">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="700"
                  p={4}
                >
                  <Box
                    borderRadius="full"
                    boxSize={20}
                    bg="black"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    overflow="hidden"
                  >
                    <img
                      src={imageConfig.companyLogo}
                      alt="company-logo"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Box>
                <Text
                  fontWeight="700"
                  display={{ base: "none", md: "block" }}
                  fontSize="1.2rem"
                  css={{
                    background:
                      "linear-gradient(to right, var(--chakra-colors-red-500), var(--chakra-colors-orange-800))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Vayunex Innovations
                </Text>
              </HStack>
            </Link>
          </Flex>

          {/* Desktop nav */}
          <HStack
            as="nav"
            gap={6}
            ml={10}
            display={{ base: "none", md: "flex" }}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{ textDecoration: "none" }}
              >
                <Box
                  px={3}
                  py={2}
                  rounded="md"
                  bg={currentPage === item.href ? "orange.600" : "transparent"}
                  _hover={{ bg: "orange.600" }}
                  fontWeight={500}
                  color="orange.100"
                  cursor="pointer"
                >
                  {item.label}
                </Box>
              </Link>
            ))}
          </HStack>

          <Flex alignItems="center" ml="auto">
            {/* Desktop actions */}
            <HStack gap={3} display={{ base: "none", md: "flex" }}>
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

              <Box position="relative">
                <Button
                  variant="ghost"
                  px={2}
                  py={1}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <Box
                    borderRadius="full"
                    w={8}
                    h={8}
                    bg="gray.300"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="bold"
                    fontSize="sm"
                  >
                    SS
                  </Box>
                </Button>
                {showUserMenu && (
                  <Box
                    position="absolute"
                    top="100%"
                    right={0}
                    mt={2}
                    bg="orange.500"
                    borderRadius="md"
                    shadow="lg"
                    minW="150px"
                    zIndex={10}
                  >
                    <Stack gap={0}>
                      <Box
                        px={4}
                        py={2}
                        cursor="pointer"
                        _hover={{ bg: "orange.600" }}
                        onClick={() => setShowUserMenu(false)}
                      >
                        Profile
                      </Box>
                      <Box
                        px={4}
                        py={2}
                        cursor="pointer"
                        _hover={{ bg: "orange.600" }}
                        onClick={() => setShowUserMenu(false)}
                      >
                        Settings
                      </Box>
                      <Box
                        px={4}
                        py={2}
                        cursor="pointer"
                        _hover={{ bg: "orange.600" }}
                        onClick={() => setShowUserMenu(false)}
                      >
                        Logout
                      </Box>
                    </Stack>
                  </Box>
                )}
              </Box>
            </HStack>

            {/* Mobile menu toggle */}
            <IconButton
              aria-label={isOpen ? "Close menu" : "Open menu"}
              display={{ md: "none" }}
              onClick={() => setIsOpen(!isOpen)}
              ml={3}
              color="white"
              bg="transparent"
              _hover={{ bg: "whiteAlpha.200" }}
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </IconButton>
          </Flex>
        </Flex>

        {/* Mobile nav drawer */}
        {isOpen && (
          <Box bg="orange.500" display={{ md: "none" }} px={4} py={4}>
            <Stack gap={3}>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{ textDecoration: "none" }}
                  onClick={onClose}
                >
                  <Box
                    px={3}
                    py={2}
                    rounded="md"
                    bg={
                      currentPage === item.href ? "orange.600" : "transparent"
                    }
                    _hover={{ bg: "orange.600" }}
                    fontWeight={600}
                    color="orange.100"
                  >
                    {item.label}
                  </Box>
                </Link>
              ))}

              <Button
                bg="white"
                color="orange.600"
                _hover={{ bg: "whiteAlpha.900" }}
                size="sm"
                fontWeight={600}
                onClick={() => {
                  setShowAuth(true);
                  onClose();
                }}
              >
                Sign up
              </Button>

              <HStack gap={3} pt={2}>
                <Box
                  borderRadius="full"
                  w={8}
                  h={8}
                  bg="gray.300"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="bold"
                  fontSize="sm"
                >
                  SS
                </Box>
                <Stack gap={0}>
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

      {/* Simple Modal for Login/Signup */}
      {showAuth && (
        <>
          <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="blackAlpha.600"
            zIndex={100}
            onClick={() => setShowAuth(false)}
          />
          <Box
            position="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            zIndex={101}
            w="90%"
            maxW="xl"
          >
            <Box
              position="relative"
              bg="white"
              borderRadius="2xl"
              overflow="hidden"
            >
              <IconButton
                position="absolute"
                top={2}
                right={2}
                aria-label="Close"
                size="sm"
                onClick={() => setShowAuth(false)}
                zIndex={1}
              >
                <FiX />
              </IconButton>
              <AuthPage />
            </Box>
          </Box>
        </>
      )}
    </>
  );
}
