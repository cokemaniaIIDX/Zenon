import * as React from 'react';
import ReactDOM from 'react-dom';
import { ColorModeScript, ChakraProvider, Box } from '@chakra-ui/react';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import Schedule from './Schedule';

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider>
      <Box width='100%' background='#F4F4F4' color='#363636' fontFamily='Khula'>
        <Schedule />
      </Box>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)
