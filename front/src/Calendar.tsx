import React, { useState } from "react";

// カレンダーの日付リストを作成し、表示用コンポーネントに渡す

const CreateCalendar: React.VFC = () => {

  const days: string[] = [];
  const daysNextMonth: string[] = [];
  const date = new Date();
  const [year, setYear] = useState<number>(date.getFullYear());
  const [month, setMonth] = useState<number>(date.getMonth());
  const lastDayOfThisMonth = new Date(year, month + 1, 0); // getMonth() は 0-11 の数字で返ってくるので +1 する
  const lastDayOfLastMonth = new Date(year, month, 0);

  const ChangeMonth = (value: React.MouseEvent<HTMLElement>) => {
    if (value.currentTarget.getAttribute("value") === "<") {
      setMonth(month - 1)
      if (month === 0) {
        setYear(year - 1)
        setMonth(11)
      }
    } else if (value.currentTarget.getAttribute("value") === ">") {
      setMonth(month + 1)
      if (month === 11) {
        setYear(year + 1)
        setMonth(0)
      }
    }
  }

  // カレンダー日付リストの作成
  // まず、先月の最終日の曜日分の日数を配列 days に追加
  for (let i = 0; i < (lastDayOfLastMonth.getDay() + 1); i++) {
    // 土曜の場合は何もしない
    // TODO: 土日を切り替える場合変数にする必要があると思う
    if (lastDayOfLastMonth.getDay() === 6) {
      break
    } else {
      let addDay = lastDayOfLastMonth.getDate() - i;
      days.unshift(addDay.toString())
    }
  }
  // 次に、今月の最終日分を1から配列に追加していく
  for (let i = 1; i < (lastDayOfThisMonth.getDate() + 1); i++) {
    days.push(i.toString())
  }
  // 最後に、43から配列の数を引いた数分の日数を別の配列に1から追加してく propsを渡すときにconcatする
  for (let i = 1; i < (43 - days.length); i++) {
    daysNextMonth.push(i.toString())
  }

  return (
    <div>
      <h1>カレンダー</h1>
      <h2>{year}年 {month + 1}月</h2>
      <input type="button" value="<" onClick={ChangeMonth} />
      <input type="button" value=">" onClick={ChangeMonth} />
      <DisplayCalendar days={days.concat(daysNextMonth)} year={year} month={month} />
      <h3>debug</h3>
      <p>
        year  : {year}<br />
        month : {month}<br />
        ldtm : {lastDayOfThisMonth.toLocaleString()}<br />
        ldlm : {lastDayOfLastMonth.toLocaleString()}<br />
        ldlm.getDay : {lastDayOfLastMonth.getDay() + 1}<br />
        ldtm.length : {lastDayOfThisMonth.getDate()}<br />
        ldlm.length : {lastDayOfLastMonth.getDate()}<br />
        needToPush : {40 - lastDayOfThisMonth.getDate()}
      </p>
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