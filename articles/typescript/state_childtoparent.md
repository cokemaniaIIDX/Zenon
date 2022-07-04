# 子コンポーネントで親コンポーネントのstateを更新したい

## 経緯

カレンダーコンポーネント(親)でボタンを表示している。
ボタンはコンポーネント(子)として作成して、mapで表示するようにしている。

ボタン(子)をクリックすることで、
親コンポーネントのselectedDateステートを更新する。
子コンポーネントに渡すselectedDateステートの値を動的に変更されて、
ボタンのプロパティ(css)が変更されるようにしたい。

```tsx:Calenderコンポーネント
<Center overflow='auto'>
  {dateList.map((value) => <DateBlock date={value} selectedDate={selectedDate} />)}
</Center>
```

```tsx:DateBlockコンポーネント
const DateBlock: React.VFC<DateBlockProps> = (props) => {
  const date: Date = props.date;
  const displayDate: number = date.getDate();
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
    >
    <Center>
      <Box fontFamily='Khula' lineHeight='90%' fontWeight='bold' fontSize='2xl' color={property.color}>{displayDate}{selectedDate}</Box>
    </Center>
    <Center>
      <Box color={property.color} fontSize='xs'>({displayDay})</Box>
    </Center>
    </Box>
  )
}
```

## 実装

[ここ](https://qiita.com/akifumii/items/ec9fdb9dd7d649c2f3dc)の記事の、`②関数経由`の方法を利用。

### state化

まず、カレンダー(親)から日付ブロック(子)へ渡しているpropsの`selectedDate`をstateにする。
で、selectedDateを更新するための`setSelectedDate関数`もconstで定義しておく。

```tsx:Schedule.tsx
const [selectedDate, setSelectedDate] = useState<number>(dateToday.getDate());
const SetSelectedDate = (props: number) => {
  setSelectedDate(props)
}
```

### propsで子コンポーネントに渡す

selectedDateを更新する関数、`SetSelectedDate`を子コンポーネントにpropsで渡して、
子コンポーネント内でその関数を実行することで実装が機能するようになる。

まず、propsの方を指定

```tsx:Schedule.tsx
type DateBlockProps = {
  date: Date;
  selectedDate: number;
  SetSelectedDate: (props: number) => void;
}
```

selectedDateに加えて、`SetSelectedDate`を、propsに数字型の引数を持つvoid型`(props: number) => void;`として定義

親側のコンポーネントに追加する

```tsx:Schedule.tsx
<DateBlock date={value} selectedDate={selectedDate} SetSelectedDate={SetSelectedDate} />
```

### 子コンポーネント内で関数を実行する

BoxでonClickを定義して、クリック時にstateが変わるようにする。
stateの変更先は、そのブロックに表示している日数(`displayDate`)。

```tsx:Schedule.tsx
<Box
  bg={property.bg}
  p='3.5'
  m='3'
  boxSize='64px'
  borderRadius='10'
  shadow={property.shadow}
  onClick={() => props.SetSelectedDate(displayDate)}
>
```

これで、クリックしたボタンのcssが切り替わる！