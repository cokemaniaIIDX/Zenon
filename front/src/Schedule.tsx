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

  const week: string[] = ["日", "月", "火", "水", "木", "金", "土"];
  const today = new Date();
  const [year, setYear]   = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth());
  const tomorrow = new Date(year, month, today.getDate() + 1)
  const theDayAfterTomorrow = new Date(2022, month, today.getDate() + 2)
  const dayOfToday = week[today.getDay()];
  const dayOfTomorror = week[tomorrow.getDay()];
  const dayOfTheDayAfterTomorrow = week[theDayAfterTomorrow.getDay()];

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div>
        <h1>Schedule</h1>
        <h2>{year} / {month + 1}</h2>
        <div>today: {today.getDate()} ({dayOfToday})</div>
        <div>tomorrow: {tomorrow.getDate()} ({dayOfTomorror})</div>
        <div>the day after tomorrow: {theDayAfterTomorrow.getDate()} ({dayOfTheDayAfterTomorrow})</div>
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