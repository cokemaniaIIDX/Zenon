import './style.css'
import {
  Button,
  Box,
  Center,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerBody,
  Flex,
  Text,
  Spacer,
  useDisclosure
} from "@chakra-ui/react";
import { Interface } from 'readline';

const Schedule: React.VFC = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div>
        <Calendar />
      </div>
      <div>
        <h2>time table</h2>
        <div>
          <h4>7:00</h4>
          <div>
            <p>朝ごはん</p>
            <p>・ごはん</p>
            <p>・みそ汁</p>
            <p>・焼き鮭</p>
          </div>
          <h4>12:00</h4>
          <div>
            <Button onClick={onOpen} colorScheme='teal'>Open Menu</Button>
            <Drawer placement='bottom' onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader borderBottomWidth='1px'>Menu</DrawerHeader>
                <DrawerBody>
                  <Box bg='orange.100' maxW='100px' maxH='100px' borderRadius='10px' boxShadow='lg'>
                    <Text>親子丼</Text>
                  </Box>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </div>
          <h4>19:00</h4>
        </div>
      </div>
    </>
  )
}

const Calendar: React.VFC = () => {
  const dateLength: number = 3;
  const dateList: Date[] = [];
  const dateToday: Date = new Date();
  const weekList: string[] = ["日", "月", "火", "水", "木", "金", "土"];
  const year: number = dateToday.getFullYear();
  const month: number = dateToday.getMonth();

  for(let i = 0; i < dateLength; i++){
    dateList.push(new Date(year, month, dateToday.getDate() + i))    
  }

  return (
    <>
      <Center>
        <Box w='40px' h='40px'>head</Box>
      </Center>
      <Center>
        <Text fontFamily='Khula' fontWeight='bold' fontSize='3xl'>{month + 1}月</Text>
      </Center>
      <Flex>
        {dateList.map((value) => <DateBlock date={value} />)}
      </Flex>
      <div>
        <h3>debug</h3>
        <p>
          year  : {year}<br />
          month : {month}<br />
          dateList : {dateList[0].getDate()}
        </p>
      </div>
    </>
  )
}

type DateBlockProps = {
  date: Date
}

const DateBlock: React.VFC<DateBlockProps> = (props) => {

  const property1 = {
    bg: '#E96565',
    date: props.date.getDate(),
    day: '月',
    color: 'white',
    shadow: 'inset 6px 6px 13px #c65656, inset -6px -6px 13px #ff7474'
  }

  const property2 = {
    bg: '#F4F4F4',
    date: 5,
    day: '火',
    color: '#363636',
    shadow: '6px 6px 13px #cfcfcf, -6px -6px 13px #ffffff'
  }

  return (
    <>
      <Box
        bg={property1.bg}
        p='3.5'
        m='3'
        boxSize='64px'
        borderRadius='10'
        shadow={property1.shadow}
      >
      <Center>
        <Box fontFamily='Khula' lineHeight='90%' fontWeight='bold' fontSize='2xl' color={property1.color}>{property1.date}</Box>
      </Center>
      <Center>
        <Box color={property1.color} fontSize='xs'>({property1.day})</Box>
      </Center>
      </Box>
      <Spacer />
    </>
  )
}

export default Schedule;