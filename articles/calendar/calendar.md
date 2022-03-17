# React で カレンダーを自力で作成

## 全体

まず、関数コンポーネントをTypeScriptで書くようにする

### 変更前

```js
function Calendar() {
  return (
    <div>hoge</div>
  )
}
```

### 変更後

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

## ヘッダー

### 仕様

- 表示する日の年月を取得して月のカレンダーを表示
  - `getYear()`, `getMonth()`を使う