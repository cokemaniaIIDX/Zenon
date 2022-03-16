# 【超基本】Dateオブジェクトについていろいろ確認【JavaScript】

JavaScriptを基礎の基礎からやり直し
今回は`Dateオブジェクト`について仕様を確認しながらまとめてみました

## そもそもDateとは

`Date` は、世界時間(UTC)の 1970/01/01 からの経過ミリ秒数 を表す`Number`の値を含んだオブジェクト

## 確認用コード

`create-react-app --template typescript`で作成したTypeScript上に作る
Calendarというコンポーネントを作成して、index.tsxで読み込ませる

ボタンを押したらコンソールにいろいろ出す感じのオーソドックスな確認方法です

typescriptでは型を理解することが大事だと思うので、
確認したい変数や関数と同時に`typeof`で型もできるだけ調べようと思います

```tsx:Calendar.tsx
function Calendar() {
  const Confirm = ()=> {
    console.log({/* ここに確認したいモノを入れる */})
    console.log(typeof({/* 確認したいモノのタイプを調べる */}))
  }

  return (
    <div>
      <input type="button" value="確認！" onClick={Confirm} />
    </div>
  )
}
export default Calendar;
```

## コンストラクタ

### Date()

関数として呼び出すと現在の日時の文字列が返ってくる
`new Date().toString()`でも同じ

```js
function Calendar() {
  const date1 = new Date();
  const date2 = new Date().toString();

  const Confirm = ()=> {
    console.log("Date() : " + Date())
    console.log("date1 : " + date1)
    console.log("date2 : " + date2)
    console.log("Date() type : " + typeof(Date()))
    console.log("date1 type : " + typeof(date1))
    console.log("date2 type : " + typeof(date2))
  }

  return (
    <div>
      <input type="button" value="確認！" onClick={Confirm} />
    </div>
  )
}
export default Calendar;
```

*出力*

```
> Date() : Wed Mar 16 2022 21:40:26 GMT+0900 (日本標準時)
> date1 : Wed Mar 16 2022 21:37:38 GMT+0900 (日本標準時)
> date2 : Wed Mar 16 2022 21:37:38 GMT+0900 (日本標準時)
> Date() type : string
> date1 type : object
> date2 type : string
```

関数としての`Date()`は`String`を返して、
コンストラクタとしての`new Date()`(date1)は`Dateオブジェクト`を返していることが分かる

## 静的メソッド

### Date.now()

UTCから経過したミリ秒数(number型)を返す

```js
function Calendar() {

  const Confirm = ()=> {
    console.log("Date.now() : " + Date.now())
    console.log("Date.now() type : " + typeof(Date.now()))
  }

  return (
    <div>
      <input type="button" value="確認！" onClick={Confirm} />
    </div>
  )
}
export default Calendar;
```

*出力*

```
> Date.now() : 1647434659476
> Date.now() type : number
```

### Date.parse()

こちらは日時を表す文字列を解釈して、now()と同様UTCからの経過時間を返す

```js
function Calendar() {

  const Confirm = ()=> {
    console.log("Date.parse(2022/03/16) : " + Date.parse("2022/03/16"))
    console.log("Date.parse(2022/03/16) type : " + typeof(Date.parse("2022/03/16")))
  }

  return (
    <div>
      <input type="button" value="確認！" onClick={Confirm} />
    </div>
  )
}
export default Calendar;
```

*出力*

```
> Date.parse(2022/03/16) : 1647356400000
> Date.parse(2022/03/16) type : number
```

### Date.UTC()

引数(左から year, month, day, hour, minute, second, millisecond)を`2~7(つまり月までは最低要る)`を指定して、  
UTCからの経過ミリ秒数を返す

```js
function Calendar() {

  const Confirm = ()=> {
    console.log("Date.UTC(2022,3,16,21,53) : " + Date.UTC(2022,3,16,21,53))
    console.log("Date.UTC(2022,3,16,21,53) type : " + typeof(Date.UTC(2022,3,16,21,53)))
  }

  return (
    <div>
      <input type="button" value="確認！" onClick={Confirm} />
    </div>
  )
}
export default Calendar;
```

*出力*

```
> Date.UTC(2022,3,16,21,53) : 1650145980000
> Date.UTC(2022,3,16,21,53) type : number
```

## インスタンスメソッド

### Date.get`○○`()

Dateオブジェクト内の各要素の取り出し

```js
function Calendar() {

  const Confirm = ()=> {
    const Today = new Date();
    console.log("Today.getFullYear() : " + Today.getFullYear())
    console.log("Today.getMonth() : " + Today.getMonth())
    console.log("Today.getDate() : " + Today.getDate())
    console.log("Today.getDay() : " + Today.getDay())
    console.log("Today.getHours() : " + Today.getHours())
    console.log("Today.getMinutes() : " + Today.getMinutes())
    console.log("Today.getSeconds() : " + Today.getSeconds())
    console.log("Today.getMilliseconds() : " + Today.getMilliseconds())
  }

  return (
    <div>
      <input type="button" value="確認！" onClick={Confirm} />
    </div>
  )
}
export default Calendar;
```

*出力*

```
> Today.getFullYear() : 2022
> Today.getMonth() : 2
> Today.getDate() : 16
> Today.getDay() : 3
> Today.getHours() : 22
> Today.getMinutes() : 7
> Today.getSeconds() : 50
> Today.getMilliseconds() : 909
```

**`月`と`曜日`が`0`から始まることに注意**

月   : `0 - 11`
曜日 : `0 - 6` , 0:日 ,1:月 ~ 6:土


### Date.set`○○`()

今度は時間をセットする

```js
function Calendar() {

  const Confirm = ()=> {
    const Today = new Date();
    console.log("Today : " + Today)

    Today.setFullYear(2023)
    Today.setMonth(11)
    Today.setDate(17)
    Today.setHours(12)
    Today.setMinutes(35)
    Today.setSeconds(15)

    console.log("Today : " + Today)
  }

  return (
    <div>
      <input type="button" value="確認！" onClick={Confirm} />
    </div>
  )
}
export default Calendar;
```

*出力*

```
> Today : Wed Mar 16 2022 22:21:45 GMT+0900 (日本標準時)
> Today : Sun Dec 17 2023 12:35:15 GMT+0900 (日本標準時)
```

setで指定した日時になっている
当たり前だけど曜日はセットできない