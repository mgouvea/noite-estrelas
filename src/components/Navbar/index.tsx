import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  chakra,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Img,
  VisuallyHidden,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { FaWhatsapp } from 'react-icons/fa';
import { Link as ReactRouter, useNavigate } from 'react-router-dom';

import logo from '../../assets/logo.png';
import logoSvg from '../../assets/logo.svg';
import { ReactNode } from 'react';

// const SocialButton = ({
//   children,
//   label,
//   href,
// }: {
//   children: ReactNode;
//   label: string;
//   href: string;
// }) => {
//   return (
//     <chakra.button
//       bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
//       rounded={'full'}
//       w={8}
//       h={8}
//       cursor={'pointer'}
//       as={'a'}
//       href={href}
//       display={'inline-flex'}
//       alignItems={'center'}
//       justifyContent={'center'}
//       transition={'background 0.3s ease'}
//       _hover={{
//         bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
//       }}
//     >
//       <VisuallyHidden>{label}</VisuallyHidden>
//       {children}
//     </chakra.button>
//   );
// };

export function Navbar({ inscricaoAtiva, onClickLink }: any) {
  const { isOpen, onToggle } = useDisclosure();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  let navigate = useNavigate();

  function handleClick(event: any) {
    console.log(event);
    if (onClickLink) {
      const newValue = event.target.text;
      onClickLink(newValue);
    }
  }

  const GoWhats = () => {
    return (
      <Flex mr="0.5rem" color="gray.300">
        <Link
          as={ReactRouter}
          p={2}
          // href={navItem.href ?? '#'}
          to={
            'https://wa.me/5561998568926?text=Ol%C3%A1+quero+conhecer+o+acampamento+Noite+nas+Estrelas'
          }
          target={'_blank'}
          fontSize={'md'}
          fontWeight={500}
          background={'transparent'}
          _hover={{
            textDecoration: 'none',
            color: 'blue.400',
          }}
        >
          <Text cursor="pointer">Contato</Text>
        </Link>
      </Flex>
    );
  };
  const GoHome = () => {
    return (
      <Flex mr="0.5rem" color="gray.300">
        <Link
          as={ReactRouter}
          p={2}
          // href={navItem.href ?? '#'}
          to={'/'}
          fontSize={'md'}
          fontWeight={500}
          background={'transparent'}
          _hover={{
            textDecoration: 'none',
            color: 'blue.400',
          }}
        >
          <Text cursor="pointer">Início</Text>
        </Link>
      </Flex>
    );
  };

  const DesktopNav = () => {
    const linkColor = 'gray.300';
    const linkHoverColor = 'blue.400';
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
      <Stack direction={'row'} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                <Box
                  as={ReactRouter}
                  p={2}
                  // href={navItem.href ?? '#'}
                  // to={navItem.href ?? '#'}
                  fontSize={'md'}
                  fontWeight={500}
                  color={linkColor}
                  background={'transparent'}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}
                  onClick={handleClick}
                >
                  {navItem.label}
                </Box>
              </PopoverTrigger>

              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={'xl'}
                  minW={'sm'}
                >
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
      </Stack>
    );
  };

  const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    return (
      <Link
        href={href}
        role={'group'}
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{ bg: useColorModeValue('orange.50', 'gray.900') }}
      >
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text
              transition={'all .3s ease'}
              _groupHover={{ color: 'orange.400' }}
              fontWeight={500}
            >
              {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}
          >
            <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Link>
    );
  };

  const MobileNav = () => {
    return (
      <Stack
        // bg={useColorModeValue('white', 'gray.800')}
        bg="bgNavbar"
        p={4}
        display={{ md: 'none' }}
      >
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    );
  };

  const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
      <Stack spacing={4} onClick={children && onToggle}>
        <Flex
          py={2}
          as={ReactRouter}
          // to={href ?? '#'}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}
          onClick={handleClick}
        >
          <Text
            fontWeight={600}
            color="gray.400"
            // color={useColorModeValue('gray.600', 'gray.200')}
          >
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>

        <Collapse
          in={isOpen}
          animateOpacity
          style={{ marginTop: '0!important' }}
        >
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            align={'start'}
          >
            {children &&
              children.map((child) => (
                <Link
                  as={ReactRouter}
                  key={child.label}
                  py={2}
                  // to={child.href!}
                  // href={child.href}
                  onClick={handleClick}
                >
                  {child.label}
                </Link>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    );
  };

  interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
  }

  const NAV_ITEMS: Array<NavItem> = [
    {
      label: 'Início',
      href: '/',
    },
    {
      label: 'Sobre',
      href: '/premios',
    },
    {
      label: 'Cronograma',
      href: '/ganhadores',
    },
    {
      label: 'FAQ',
      href: '/pacotes',
    },
    // {
    //   label: 'Contato',
    //   href: '#',
    // },
  ];

  return (
    <Box>
      <Flex
        bg="bgNavbar"
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        // py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor="gray.500"
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={
            isWideVersion ? 'space-between' : { base: 'flex-end', md: 'start' }
          }
        >
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
          >
            <Link as={ReactRouter} to={'/'}>
              <Img
                src={isWideVersion ? logo : logoSvg}
                alt="Viagem com o rei"
                boxSize={isWideVersion ? '3rem' : '2.5rem'}
                w={isWideVersion ? '100%' : '90%'}
                objectFit="contain"
                ml={isWideVersion ? '2rem' : ''}
              />
            </Link>
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10} align="center">
            {window.location.pathname === '/inscricao' ? (
              <GoHome />
            ) : (
              <>
                <DesktopNav />
                <GoWhats />
              </>
            )}

            {window.location.pathname === '/inscricao' ? null : (
              <Button
                ml="1rem"
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'md'}
                fontWeight={600}
                colorScheme="whiteAlpha"
                variant={'outline'}
                isDisabled={inscricaoAtiva == 'yes' ? false : true}
                onClick={() => {
                  inscricaoAtiva == 'yes' ? navigate('/inscricao') : '';
                }}
              >
                Inscrição
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
