# React + TypeScript + FullCalendar で カレンダーを作成する

## FullCalendar とは

[FullClanedar](https://fullcalendar.io/)はオープンソース(一部有料)のJavaScriptカレンダーライブラリで、  
軽量かつ豊富なカスタマイズ性能を持っています

React,Angular,Vueなどと組み合わせて使うことができます

...とまあ、詳細はいろいろ記事あったのでコピペみたいになっちゃうので各自ggってみてください

どんな感じか、実際に作って確認してみましょう

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

ほかの言語も対応させる場合は同様にしてlocalesに追加してlocaleで変える、  
もしくはall-localesというのもあるのでそちらをimportすることで対応できます    
英語、日本語以外を利用することは稀かなと思うので解説は割愛します

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

### 週で表示

ヘッダーのツールバーをカスタマイズすることで、週表示に切り替えることができます

基本、`左 中 右` の要素を''でくくって指定する感じです  
`,(コロン)`で区切ると連続したボタン、` (スペース)`で空けると独立したボタンになるようです

```tsx:App.tsx
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'; // 追加
import jaLocale from '@fullcalendar/core/locales/ja';
import './App.css';

function App() {

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]} // 追加
        initialView="dayGridMonth"
        locales={[jaLocale]}
        locale='ja'
        headerToolbar={{                          // 追加
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek',
        }}
      />
    </div>
  );
}

export default App;
```

- `左` : `< >` と `今日` ボタンを配置
- `中` : `年 月` を配置
- `右` : `月表示`, `週表示` 切り替えボタンを配置

### イベント登録

カレンダー上にイベントを登録することができます

```tsx:App.tsx
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import './App.css';

function App() {

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        locales={[jaLocale]}
        locale='ja'
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek',
        }}
        events={[
          {title:'eventを', start: '2022-03-14'},
          {title:'こんな感じで追加できます', start: '2022-03-15', end: '2022-03-17'}
        ]}
      />
    </div>
  );
}

export default App;
```

配列をほかの関数で作成してここに代入するなどの操作を追加すれば  
インタラクティブなアプリが作れそうですね！

### 予定リストを追加

予定をリスト表示できるページも用意されています

```tsx:App.tsx
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list'; // 追加
import jaLocale from '@fullcalendar/core/locales/ja';
import './App.css';

function App() {

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]} // 追加
        initialView="dayGridMonth"
        locales={[jaLocale]}
        locale='ja'
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek listWeek', // 追加
        }}
        events={[
          {title:'eventを', start: '2022-03-14'},
          {title:'こんな感じで追加できます', start: '2022-03-15', end: '2022-03-17'}
        ]}
      />
    </div>
  );
}

export default App;
```

こんな感じで予定をリスト表示してくれます


## おわりに

他にもイベントのドラッグアンドドロップでの追加など面白い機能が備わっており、  
なかなか汎用性が高いんじゃないかと思います

[DEMOページ](https://fullcalendar.io/demos)を見る限り、Themeの変更ができるっぽいんですが、実際に変更する方法に関して全く情報がなく、  
他のFullCalendarの記事を見ても誰もテーマの変更を行っていないため、  
僕はこのライブラリは使わない方向で行くことにしました、、

カレンダー自作はめんどくさいな～～～