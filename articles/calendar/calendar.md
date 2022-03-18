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