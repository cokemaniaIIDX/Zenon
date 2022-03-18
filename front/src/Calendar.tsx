import React from "react";

const Calendar: React.VFC = () => {

  const week: string[] = ["日", "月", "火", "水", "木", "金", "土"]
  const date = new Date();
  const dayOfWeek = date.getDay();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;  // getMonth() は 0-11 の数字で返ってくるので +1 する

  const Confirm = () => {
    console.log(dayOfWeek)
    console.log(typeof(dayOfWeek))
  }

  return (
    <div>
      <input type="button" value="確認！" onClick={Confirm} />
      <div>
        <h1>カレンダー</h1>
        <h2>{year}年 {month}月</h2>
        <table>
          <thead>
            <ListWeek week={week} />
          </thead>
          <tbody>
            <ListDays dayOfWeek={dayOfWeek} />
          </tbody>
        </table>
      </div>
    </div>
  )
}

type ListWeekProps = {
  week: string[];
}

const ListWeek: React.VFC<ListWeekProps> = (props) => {

  const weekList = props.week

  return (
    <tr>
      {weekList.map((item, key) =>
        <th key={key}>{item}</th>
      )}
    </tr>
  )
}

type ListDaysProps = {
  dayOfWeek: number;
}

const ListDays: React.VFC<ListDaysProps> = (props) => {
  return (
    <tr>
      <td>{props.dayOfWeek}</td>
    </tr>
  )
}

export default Calendar;