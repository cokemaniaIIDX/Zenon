import React from "react";

// カレンダーの日付リストを作成し、表示用コンポーネントに

const CreateCalendar: React.VFC = () => {

  const days: string[] = [];
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth(); // getMonth() は 0-11 の数字で返ってくるので +1 する
  const lastDayOfThisMonth = new Date(year, month + 1, 0);
  const lastDayOfLastMonth = new Date(year, month, 0);

  for (let i = 0; i < (lastDayOfLastMonth.getDay() + 1); i++) {
    let addDay = lastDayOfLastMonth.getDate() - i;
    days.push(addDay.toString())
  }
  for (let i = 1; i < (lastDayOfThisMonth.getDate() + 1); i++) {
    days.push(i.toString())
  }
  for (let i = 1; i < (41 - lastDayOfThisMonth.getDate()); i++) {
    days.push(i.toString())
  }

  return (
    <div>
      <DisplayCalendar days={days} year={year} month={month} />
    </div>
  )
}

// カレンダーを表示するコンポーネント

type DisplayCalendarProps = {
  days: string[];
  year: number;
  month: number;
}

const DisplayCalendar: React.VFC<DisplayCalendarProps> = (props) => {

  const week: string[] = ["日", "月", "火", "水", "木", "金", "土"]
  const days = props.days;
  const year = props.year
  const month = props.month;

  return (
    <>
      <h1>カレンダー</h1>
      <h2>{year}年 {month + 1}月</h2>
      <table>
        <thead>
          <ListContents weekList={week} contents={week} />
        </thead>
        <tbody>
          <ListContents weekList={week} contents={days} />
        </tbody>
      </table>
    </>
  )
}

// 曜日リスト内の要素数分、中身を表示するコンポーネント

type ListContentsProps = {
  // 曜日リストの型宣言
  weekList: string[];
  contents: string[];
}

const ListContents: React.VFC<ListContentsProps> = (props) => {

  const listLength = props.weekList.length
  const fullContents = props.contents

  // contentsを多重配列として初期化
  const contents: string[][] = []

  for (let i = 0; i < fullContents.length / listLength; i++) {
    contents.push(fullContents.slice(listLength*i, listLength*i + listLength))
  }

  return (
    <>
      {contents.map((item, key) => {
        return (
          <tr key={key}><DisplayContents contents={item} /></tr>
        )
      })}
    </>
  )
}

// カレンダーの中身を表示するコンポーネント

type DisplayContentsProps = {
  contents: string[];
}

const DisplayContents: React.VFC<DisplayContentsProps> = (props) => {

  const contents = props.contents

  return (
    <>
      {contents.map((item, key) =>
        <th key={key}>{item}</th>
      )}
    </>
  )
}

export default CreateCalendar;