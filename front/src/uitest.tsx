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

const App: React.VFC = () => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher justifySelf="flex-end" />
      <Flex>
        <IconButton aria-label='Prev Month' icon={<ChevronLeftIcon />}/>
        <Spacer />
        <Center>2022 年  3 月</Center>
        <Spacer />
        <IconButton aria-label='Next Month' icon={<ChevronRightIcon />}/>
      </Flex>
      <Flex>
        <Center flex='1' color="tomato">日</Center>
        <Center flex='1'>月</Center>
        <Center flex='1'>火</Center>
        <Center flex='1'>水</Center>
        <Center flex='1'>木</Center>
        <Center flex='1'>金</Center>
        <Center flex='1' color="blue.400">土</Center>
      </Flex>
    </ChakraProvider>
  )
}

export default App;