import React, { useState } from 'react';
import './style.css'
import {
  Box,
  Center,
  Text,
} from "@chakra-ui/react";

const Schedule: React.VFC = () => {

  return (
    <div>
      <Center>
        <Box p='5'>head</Box>
      </Center>
      <Calendar />
    </div>
  )
}

const Calendar: React.VFC = () => {
  const dateLength: number = 3;
  const dateList: Date[] = [];
  const dateToday: Date = new Date();
  const year: number = dateToday.getFullYear();
  const month: number = dateToday.getMonth();
  const [selectedDate, setSelectedDate] = useState<number>(dateToday.getDate());
  const SetSelectedDate = (props: number) => {
    setSelectedDate(props)
  }

  for(let i = 0; i < dateLength; i++){
    dateList.push(new Date(year, month, dateToday.getDate() + i))    
  }

  return (
    <>
      <Center>
        <Text fontFamily='Khula' fontWeight='bold' fontSize='3xl'>{month + 1}月</Text>
      </Center>
      <Center overflow='auto'>
        {dateList.map((value) => <DateBlock date={value} selectedDate={selectedDate} SetSelectedDate={SetSelectedDate} />)}
      </Center>
    </>
  )
}

type DateBlockProps = {
  date: Date;
  selectedDate: number;
  SetSelectedDate: (props: number) => void;
}

const DateBlock: React.VFC<DateBlockProps> = (props) => {
  const dayList: string[] = ["日", "月", "火", "水", "木", "金", "土"];
  const date: Date = props.date;
  const displayDate: number = date.getDate();
  const displayDay: string = dayList[date.getDay()];
  const selectedDate: number = props.selectedDate;
  let property;

  const propertySelected = {
    bg: '#E96565',
    color: 'white',
    shadow: 'inset 6px 6px 13px #c65656, inset -6px -6px 13px #ff7474'
  }

  const propertyDefault = {
    bg: '#F4F4F4',
    color: '#363636',
    shadow: '6px 6px 13px #cfcfcf, -6px -6px 13px #ffffff'
  }

  if (selectedDate == displayDate) {
    property = propertySelected
  }
  else {
    property = propertyDefault
  }

  return (
    <Box
      bg={property.bg}
      p='3.5'
      m='3'
      boxSize='64px'
      borderRadius='10'
      shadow={property.shadow}
      onClick={() => props.SetSelectedDate(displayDate)}
    >
    <Center>
      <Box fontFamily='Khula' lineHeight='90%' fontWeight='bold' fontSize='2xl' color={property.color}>{displayDate}</Box>
    </Center>
    <Center>
      <Box color={property.color} fontSize='xs'>({displayDay})</Box>
    </Center>
    </Box>
  )
}

export default Schedule;