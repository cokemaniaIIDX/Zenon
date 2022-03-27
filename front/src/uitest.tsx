import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  IconButton,
  Grid,
  GridItem,
  theme,
  Flex,
  Square,
  Spacer,
  Center,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import './style.css';

const App: React.VFC = () => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher justifySelf="flex-end" />
      <Flex p={3}>
        <IconButton aria-label='Prev Month' icon={<ChevronLeftIcon />}/>
        <Spacer />
        <Center>2022 年  3 月</Center>
        <Spacer />
        <IconButton aria-label='Next Month' icon={<ChevronRightIcon />}/>
      </Flex>
      <Flex pb={3}>
        <Center borderBottom={1} flex='1' color="tomato">日</Center>
        <Center flex='1'>月</Center>
        <Center flex='1'>火</Center>
        <Center flex='1'>水</Center>
        <Center flex='1'>木</Center>
        <Center flex='1'>金</Center>
        <Center flex='1' color="blue.400">土</Center>
      </Flex>
      <Flex pl={1} pb={1}>
        <Box fontSize='xs' textAlign='right' flex='1' h='50px' borderRadius='lg' mr='1' bg='gray.300'><Text pr={1}>27</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.300'><Text pr={1}>28</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>1</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>2</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>3</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>4</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>5</Text></Box>
      </Flex>
      <Flex pl={1} pb={1}>
        <Box fontSize='xs' textAlign='right' flex='1' h='50px' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>6</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>7</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>8</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>9</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>10</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>11</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>12</Text></Box>
      </Flex>
      <Flex pl={1} pb={1}>
        <Box fontSize='xs' textAlign='right' flex='1' h='50px' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>13</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>14</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>15</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>16</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>17</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>18</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>19</Text></Box>
      </Flex>
      <Flex pl={1} pb={1}>
        <Box fontSize='xs' textAlign='right' flex='1' h='50px' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>20</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>21</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>22</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>23</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>24</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>25</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>26</Text></Box>
      </Flex>
      <Flex pl={1} pb={1}>
        <Box fontSize='xs' textAlign='right' flex='1' h='50px' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>27</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>28</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>29</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>30</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.50'><Text pr={1}>31</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.300'><Text pr={1}>1</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.300'><Text pr={1}>2</Text></Box>
      </Flex>
      <Flex pl={1} pb={1}>
        <Box fontSize='xs' textAlign='right' flex='1' h='50px' borderRadius='lg' mr='1' bg='gray.300'><Text pr={1}>3</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.300'><Text pr={1}>4</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.300'><Text pr={1}>5</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.300'><Text pr={1}>6</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.300'><Text pr={1}>7</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.300'><Text pr={1}>8</Text></Box>
        <Box fontSize='xs' textAlign='right' flex='1' borderRadius='lg' mr='1' bg='gray.300'><Text pr={1}>9</Text></Box>
      </Flex>
    </ChakraProvider>
  )
}

export default App;