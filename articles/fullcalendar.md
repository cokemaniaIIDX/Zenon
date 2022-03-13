# React + TypeScript + FullCalendar で カレンダーを作成する

## FullCalendar とは

## 導入

### インストール手順

```shell
$ npm install --save @fullcalendar/react @fullcalendar/daygrid
```

### カレンダーの表示

```tsx:App.tsx
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './App.css';

function App() {
  return (
    <div>
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
    </div>
  );
}

export default App;
```

### 日本語表記にする

```
$ npm install --save @fullcalendar/core
```

```tsx:App.tsx

```