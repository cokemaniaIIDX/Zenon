# React + TypeScript + FullCalendar で カレンダーを作成する

## FullCalendar とは

## 導入

### インストール手順

```shell
$ npm install --save @fullcalendar/react @fullcalendar/core @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/list
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

日本語だけlocalesに追加して、日本語表記に変える

```tsx:App.tsx
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja'; // 追加
import './App.css';

function App() {

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locales={[jaLocale]}         // 追加
        locale='ja'                  // 追加
      />
    </div>
  );
}

export default App;
```