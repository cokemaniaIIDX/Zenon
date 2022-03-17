import React from "react";

interface Props {
  item: string;
  children: React.ReactNode;
}

const Calendar: React.VFC = () => {

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const Confirm = () => {
    console.log(year)
    console.log(typeof(year))
  }

  return (
    <div>
      <input type="button" value="確認！" onClick={Confirm} />
      <div>
        <h1>カレンダー</h1>
        <h2>{year}年 {month}月</h2>
        <table>
          <thead>
            <ListWeek />
          </thead>
        </table>
      </div>
    </div>
  )
}

const ListWeek: React.VFC = () => {

  const week: string[] = ["日", "月", "火", "水", "木", "金", "土"]

  return (
    <tr>
      {week.map((item, key) =>
        <th key={key}><Week /></th>
      )}
    </tr>
  )
}

const Week: React.VFC = () => {
  return (
    <p>あ</p>
  )
}

export default Calendar;