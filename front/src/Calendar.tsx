import React from "react";

// カレンダーを表示するコンポーネント

const Calendar: React.VFC = () => {

  const week: string[] = ["日", "月", "火", "水", "木", "金", "土"]
  const days: string[] = []
  const date = new Date();
  const dayOfWeek = date.getDay();
  const year = date.getFullYear();
  const month = date.getMonth();  // getMonth() は 0-11 の数字で返ってくるので +1 する
  const today = date.getDate();
  const lastDayOfThisMonth = new Date(year, month + 1, 0);
  const lastDayOfLastMonth = new Date(year, month, 0);

  const Confirm = () => {
    console.log(lastDayOfThisMonth)
    console.log(lastDayOfLastMonth)
    console.log("今日: " + year + "年 " + (month + 1) + "月 " + today + "日 " + week[dayOfWeek] + "曜日")
    console.log("今月の最終日: " + year + "年 " + (month + 1) + "月 " + lastDayOfThisMonth.getDate() + "日 " + week[lastDayOfThisMonth.getDay()] + "曜日")
    console.log("先月の最終日: " + lastDayOfLastMonth.getFullYear() + "年 " + (lastDayOfLastMonth.getMonth() + 1)+ "月 " + lastDayOfLastMonth.getDate() + "日 " + week[lastDayOfLastMonth.getDay()] + "曜日")
    console.log("先月最終日の曜日: " + week[lastDayOfLastMonth.getDay()] + "曜日")
    console.log("表示する先月分の日数: " + (lastDayOfLastMonth.getDay() + 1))
    console.log("今月の日数: " + lastDayOfThisMonth.getDate())
    console.log("表示する来月分の日数: " + (42 - (lastDayOfThisMonth.getDate() + (lastDayOfLastMonth.getDay() + 1))))
  }

  const CreateDays = () => {
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
    console.log(days)
  }

  return (
    <div>
      <input type="button" value="確認！" onClick={Confirm} />
      <div>
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
        <p>days: [{days}]</p>
        <input type="button" value="createDays" onClick={CreateDays} />
      </div>
    </div>
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

export default Calendar;