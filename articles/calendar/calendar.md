# 【TypeScript】カレンダーを作りながら React × TypeScript の基本を学ぼう【React】

## 全体

まず、関数コンポーネントをTypeScriptで書くようにする
何事も型定義が大事になってくる
以下の記事で型定義の基本を学びつつカレンダーを作っていく

- 参考 : [【初心者】React × TypeScript 基本の型定義](https://zenn.dev/ogakuzuko/articles/react-typescript-for-beginner)

### 変更前

JavaScriptでのReactの関数コンポーネント

```js
function Calendar() {
  return (
    <div>hoge</div>
  )
}
```

### 変更後

TypeScriptを利用したReactの関数コンポーネント

```tsx
import React from "react";

const Calendar: React.VFC = () => {
  return (
    <div>
      <Component />
    </div>
  )
}
```

reactのFC,VFCというものをインポートして使うらしい

- FC  : Function Component の略
- VFC : Void Function Component の略

- 参考 : [【TypeScript】React.VFCとは何ぞや](https://qiita.com/tttocklll/items/c78aa33856ded870e843)

## ヘッダー

### 仕様

- 表示する日の年月を取得して月のカレンダーを表示
  - `getYear()`, `getMonth()`を使う
- 曜日のリストを利用してテーブルヘッダを並べる
  - `string[]`をpropsで渡して、それを`map`で並べる

### propsの受け渡し

親コンポーネント`Calendar`から子コンポーネント`ListWeek`を呼び出す際に、
propsとして文字列のリスト型`week: string[]`を渡したい

```tsx
<ListWeek week={week} />
```

このままやると、↓みたいなエラーになる

```shell
TS2322: Type '{ week: string[]; }' is not assignable to type 'IntrinsicAttributes'.
  Property 'week' does not exist on type 'IntrinsicAttributes'.
```

型を明示してpropsとして受けわたすように書く

- 参考 : [【TypeScript】React.VFCとは何ぞや](https://qiita.com/tttocklll/items/c78aa33856ded870e843)

```tsx
import React from "react";

const Calendar: React.VFC = () => {

  const week: string[] = ["日", "月", "火", "水", "木", "金", "土"]
  const date = new Date();
  const dayOfWeek = date.getDay();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 0-11 の数字で返ってくるので +1 する

  return (
    <div>
      <div>
        <h1>カレンダー</h1>
        <h2>{year}年 {month}月</h2>
        <table>
          <thead>
            <ListWeek week={week} />
          </thead>
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
```

### propsの型宣言に`type`と`interface`があるみたいだが、、

両者とも使い方はほぼ同じで、できることもほぼ同じなのでどちらでもよさそう
どちらかというと`type`のほうがよさそうなので、`type`を使っていくことにする

- 参考 : [interfaceとtypeの違い、そして何を使うべきかについて](https://zenn.dev/luvmini511/articles/6c6f69481c2d17)


### コンポーネントの分離

曜日(日~土)を7つ並べて表示するのと、
1週間における日付を7つ並べて表示するのは、
中身が違う(曜日か日付かの違い)だけなので、統一できる

週の日数の要素数分、中身を横に並べて表示するようにコンポーネントを分割する

```tsx
const Calendar: React.VFC = () => {

  const week: string[] = ["日", "月", "火", "水", "木", "金", "土"]
  const days: string[] = ["1", "2", "3", "4", "5", "6", "7"]

  return (
    <div>
      <input type="button" value="確認！" onClick={Confirm} />
      <div>
        <h1>カレンダー</h1>
        <h2>{year}年 {month}月</h2>
        <table>
          <thead>
            <ListContents list={week} /> {/* 呼び出すのはリストの中身を並べるだけの関数 */}
          </thead>
          <tbody>
            <ListContents list={days} /> {/* 呼び出すのはリストの中身を並べるだけの関数 */}
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
    <DisplayContents list={weekList} /> {/* 中身を表示するのはこっち */}
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
```

### 配列作成

#### 確認

- 2月の末と、4月のはじめを含む3月の日付配列(7 × 6 = 42要素)を作成
- 曜日の要素数(=7)で割ってそれぞれ7日ずつの配列に分割する
- 新しい配列にpushして、多重配列を作る
- 曜日は日～土の7要素で固定の想定
  - 月～金だけにするとかにしようとするとまた考える必要がある
    - 配列を作って並べるという機能に変わりはないから、考えるのは配列の要素を入れるときの処理で考えればいいか

- 参考 : [JavaScriptで配列を分割する方法を現役エンジニアが解説【初心者向け】](https://techacademy.jp/magazine/37904#:~:text=%E9%85%8D%E5%88%97%E3%81%AE%E5%88%86%E5%89%B2%E3%81%AF%E3%80%81slice,%E7%95%AA%E7%9B%AE%E3%82%92%E3%82%B3%E3%83%94%E3%83%BC%E3%81%97%E3%81%BE%E3%81%99%E3%80%82)

```tsx
const Calendar: React.VFC = () => {

  const week: string[] = ["日", "月", "火", "水", "木", "金", "土"]
  const days: string[] = [
    "27", "28", "1", "2", "3", "4", "5",
    "6", "7", "8", "9", "10", "11", "12",
    "13", "14", "15", "16", "17", "18", "19",
    "20", "21", "22", "23", "24", "25", "26",
    "27", "28", "29", "30", "31", "1", "2", 
    "3", "4", "5", "6", "7", "8", "9",
  ]

  const Confirm = () => {
    const list = week
    const list2 = days
    const dayList: string[][] = [] // 多重配列を初期化

    for (let i = 0; i < list2.length / list.length; i++) { // 日付の配列要素数(=42) ÷ 曜日の要素数(=7) = 週数(=6)の分 forを回す
      dayList.push(list2.slice(i*list.length,i*list.length + list.length)) // 配列をsliceしたものを多重配列にpushしていく
    }

    console.log(dayList)
  }

  return (
    <div>
      <input type="button" value="確認！" onClick={Confirm} />
    </div>
  )
}
```

### 実装

```tsx
import React from "react";

// カレンダーを表示するコンポーネント

const Calendar: React.VFC = () => {

  const week: string[] = ["日", "月", "火", "水", "木", "金", "土"]
  const days: string[] = [
    "27", "28", "1", "2", "3", "4", "5",
    "6", "7", "8", "9", "10", "11", "12",
    "13", "14", "15", "16", "17", "18", "19",
    "20", "21", "22", "23", "24", "25", "26",
    "27", "28", "29", "30", "31", "1", "2", 
    "3", "4", "5", "6", "7", "8", "9",
  ]
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;  // getMonth() は 0-11 の数字で返ってくるので +1 する

  return (
    <div>
      <input type="button" value="確認！" onClick={Confirm} />
      <div>
        <h1>カレンダー</h1>
        <h2>{year}年 {month}月</h2>
        <table>
          <thead>
            <ListContents weekList={week} contents={week} />
          </thead>
          <tbody>
            <ListContents weekList={week} contents={days} />
          </tbody>
        </table>
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
```

- ListContents には 2つの配列をpropsとして渡す (曜日の配列, 月の日付の配列)
  - 日付配列の要素数(=42)を曜日配列の要素数(=7)で割った回数(=週数=6)分、配列を作成して多重配列に格納する
  - その際、sliceは(0,7),(7,14),...と、7の倍数で増えていくので、(listLength * i, listLength * i + listLength)となる
  - array.push()は参考[Array.prototype.push() - MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
  - returnの時
    - <tr>が複数になるので、keyを指定しないとWarningが出る
      - 要素<th>は、こっちはこっちでいる
    - return ( {いきなり処理} )はむりなので、いったん`<></>`をかませる
      - `<></>`は`フラグメント`という
        - 参考 : [フラグメント - React 公式 Document](https://ja.reactjs.org/docs/fragments.html)

### 日付の作成と表示をコンポーネントで分ける

ボタンを押したら前の月次の月に表示を切り替えたいので、
日付リストを作成するコンポーネントを作成して、
今までのコンポーネントは表示用に切り替える

日付作成コンポーネントでpropsとして表示コンポーネントに渡すことで、
ボタンを押して日付を作成しなおした結果を表示コンポーネントに渡せるので、
月の移動が可能になる

```tsx
import React from "react";

// カレンダーの日付リストを作成し、表示用コンポーネントに

const CreateCalendar: React.VFC = () => {

  const days: string[] = [];
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const lastDayOfThisMonth = new Date(year, month + 1, 0); // getMonth() は 0-11 の数字で返ってくるので +1 する
  const lastDayOfLastMonth = new Date(year, month, 0);

  // カレンダー日付リストの作成
  // まず、先月の最終日の曜日分の日数を配列 days に unshift で追加
  for (let i = 0; i < (lastDayOfLastMonth.getDay() + 1); i++) {
    // 土曜の場合は何もしない
    // TODO: 土日を切り替える場合変数にする必要があると思う
    if (lastDayOfLastMonth.getDay() === 6) {
      break
    } else {
      let addDay = lastDayOfLastMonth.getDate() - i;
      // 最終日から減らしていくので、配列の先頭に追加していくのでunshift
      days.unshift(addDay.toString())
    }
  }
  // 次に、今月の最終日分を1から配列に追加していく
  for (let i = 1; i < (lastDayOfThisMonth.getDate() + 1); i++) {
    // 配列の最後に追加するときはpush
    days.push(i.toString())
  }
  // 最後に、43から配列の数を引いた数分の日数を別の配列に1から追加してく propsを渡すときにconcatする
  for (let i = 1; i < (43 - days.length); i++) {
    daysNextMonth.push(i.toString())
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

// 残り略

export default CreateCalendar;
```

### 月の表示切替

`<`,`>`ボタンを押すことで月を切り替える

```tsx
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
  // まず、先月の最終日の曜日分の日数を配列 days に unshift で追加
  for (let i = 0; i < (lastDayOfLastMonth.getDay() + 1); i++) {
    // 土曜の場合は何もしない
    // TODO: 土日を切り替える場合変数にする必要があると思う
    if (lastDayOfLastMonth.getDay() === 6) {
      break
    } else {
      let addDay = lastDayOfLastMonth.getDate() - i;
      // 最終日から減らしていくので、配列の先頭に追加していくのでunshift
      days.unshift(addDay.toString())
    }
  }
  // 次に、今月の最終日分を1から配列に追加していく
  for (let i = 1; i < (lastDayOfThisMonth.getDate() + 1); i++) {
    // 配列の最後に追加するときはpush
    days.push(i.toString())
  }
  // 最後に、43から配列の数を引いた数分の日数を別の配列に1から追加してく propsを渡すときにconcatする
  for (let i = 1; i < (43 - days.length); i++) {
    daysNextMonth.push(i.toString())
  }

  const Confirm = () => {
    console.log(days)
    console.log(daysNextMonth)
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
```