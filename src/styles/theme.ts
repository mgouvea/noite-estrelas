import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    headings: 'Inter',
    body: 'Inter',
  },
  colors: {
    bgNavbar: '#232323',
    bgCard: '#f6f6f6',
    blueLetter: {
      500: '#24608B',
    },
  },
  styles: {
    global: {
      body: {
        bg: '#f6f6f6',
      },
    },
  },
});
