import React, { useState } from "react";
import {
  Button,
  Box,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerBody,
  Text,
  useDisclosure
} from "@chakra-ui/react";

const Schedule: React.VFC = () => {

  const dateToday: Date = new Date();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div>
        <Calendar dateToday={dateToday} />
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

type CalendarProps = {
  dateToday: Date;
}

const Calendar: React.VFC<CalendarProps> = (props) => {
  const weekList: string[] = ["日", "月", "火", "水", "木", "金", "土"];
  const year = props.dateToday.getFullYear();
  const month = props.dateToday.getMonth();
  const dateTomo = new Date(year, month, props.dateToday.getDate() + 1)
  const dateTDAT = new Date(year, month, props.dateToday.getDate() + 2)

  return (
    <>
      <Text>{month + 1}月</Text>
      <div>今日 : {props.dateToday.getDate()} ({weekList[props.dateToday.getDay()]})</div>
      <div>明日 : {dateTomo.getDate()} ({weekList[dateTomo.getDay()]})</div>
      <div>明後日 : {dateTDAT.getDate()} ({weekList[dateTDAT.getDay()]})</div>
      <div>
        <h3>debug</h3>
        <p>
          year  : {year}<br />
          month : {month}<br />
        </p>
      </div>
    </>
  )
}

export default Schedule;