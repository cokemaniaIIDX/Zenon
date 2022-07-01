import React, { useState } from "react";

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

  return (
    <>
      <h1>Schedule</h1>
      <h2>{year} / {month + 1}</h2>
      <div>today: {today.getDate()} ({dayOfToday})</div>
      <div>tomorrow: {tomorrow.getDate()} ({dayOfTomorror})</div>
      <div>the day after tomorrow: {theDayAfterTomorrow.getDate()} ({dayOfTheDayAfterTomorrow})</div>

      <p>
        year  : {year}<br />
        month : {month}<br />
      </p>
    </>
  )
}

export default Schedule;