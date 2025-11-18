import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import App from './App';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#fff7e6',
      100: '#ffe8b3',
      200: '#ffd980',
      300: '#ffca4d',
      400: '#ffbb1a',
      500: '#e6a800',
      600: '#b38300',
      700: '#805e00',
      800: '#4d3900',
      900: '#1a1400',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
