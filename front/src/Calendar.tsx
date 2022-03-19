import React from "react";

// カレンダーを表示するコンポーネント

const Calendar: React.VFC = () => {

  const week: string[] = ["日", "月", "火", "水", "木", "金", "土"]
  const days: string[] = ["1", "2", "3", "4", "5", "6", "7"]
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
            <ListContents list={week} />
          </thead>
          <tbody>
            <ListContents list={days} />
          </tbody>
        </table>
      </div>
    </div>
  )
}

// 曜日リスト内の要素数分、中身を表示するコンポーネント

type ListContentsProps = {
  // 曜日リストの型宣言
  list: string[];
}

const ListContents: React.VFC<ListContentsProps> = (props) => {

  const weekList = props.list

  return (
    <DisplayContents list={weekList} />
  )
}

// カレンダーの中身を表示するコンポーネント

type DisplayContentsProps = {
  list: string[];
}

const DisplayContents: React.VFC<DisplayContentsProps> = (props) => {

  const week = props.list

  return (
    <tr>
      {week.map((item, key) =>
        <th key={key}>{item}</th>
      )}
    </tr>
  )
}

export default Calendar;