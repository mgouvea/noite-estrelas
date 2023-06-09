import { useState } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBreakpointValue,
  Img,
  Stack,
  Heading,
} from '@chakra-ui/react';
import { FiHome, FiTrendingUp, FiMenu, FiChevronDown } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { Home } from './Home';
import { Tables } from './Tables';
import { Link as ReactRouter } from 'react-router-dom';
import logo from '../../assets/logo.svg';

interface LinkItemProps {
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome },
  { name: 'Tabelas', icon: FiTrendingUp },
];

interface DashProps {
  nameUser: string;
}

// export function Dashboard({ children }: { children?: ReactNode }) {
export function Dashboard({ nameUser }: DashProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
        onPageChange={handlePageChange}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} name={nameUser} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {pageNumber ? <Home nameUser={nameUser} /> : <Tables />}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  onPageChange?: any;
}

const SidebarContent = ({ onClose, onPageChange, ...rest }: SidebarProps) => {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  const handlePageChangeToHome = () => {
    if (onPageChange) {
      const newPage = 0;
      onPageChange(newPage);
    }
  };
  const handlePageChangeToTables = () => {
    if (onPageChange) {
      const newPage = 1;
      onPageChange(newPage);
    }
  };

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="center">
        {/* <Text
          fontSize={'1.7rem'}
          as={'span'}
          position={'relative'}
          _after={{
            content: "''",
            width: 'full',
            height: useBreakpointValue({ base: '20%', md: '30%' }),
            position: 'absolute',
            bottom: 1,
            left: 0,
            bg: 'green.100',
            zIndex: -1,
          }}
          color="blue.600"
        >
          Noite nas Estrelas
        </Text> */}
        {isWideVersion ? (
          <Img
            src={logo}
            alt="logo noite nas estrelas"
            boxSize="3rem"
            objectFit="contain"
          />
        ) : (
          ''
        )}

        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={
            link.name === 'Home'
              ? handlePageChangeToTables
              : handlePageChangeToHome
          }
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'blue.600',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
  name: string;
}
const MobileNav = ({
  onOpen,
  name,
  scrollMarginRight,
  ...rest
}: MobileProps) => {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'space-between' }}
      {...rest}
    >
      {isWideVersion ? (
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 15, md: 20 }}
        >
          <Heading
            display="inline-block"
            as="h2"
            size="lg"
            bgGradient="linear(to-r, #314886, #1baae7)"
            backgroundClip="text"
          >
            Painel administrativo Noite nas Estrelas
          </Heading>
        </Stack>
      ) : (
        ''
      )}

      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize={'1.5rem'}
        as={'span'}
        position={'relative'}
        _after={{
          content: "''",
          width: 'full',
          height: useBreakpointValue({ base: '20%', md: '30%' }),
          position: 'absolute',
          bottom: 1,
          left: 0,
          bg: 'green.100',
          zIndex: -1,
        }}
        color="blue.600"
      >
        Admin
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar size={'sm'} src={'MG'} />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{name.replace(/,/g, '')}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <Link
                as={ReactRouter}
                to={'/'}
                style={{ textDecoration: 'none' }}
              >
                <MenuItem>Sair</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
