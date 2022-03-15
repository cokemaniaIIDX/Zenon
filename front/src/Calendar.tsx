function Calendar() {

  const week = ["日", "月", "火", "水", "木", "金", "土"];
  const today = new Date();
  const showDate = new Date(today.getFullYear(), today.getMonth(), 1);

  const prev = ()=> {
    console.log('Clicked prev')
  }

  const next = ()=> {
    console.log('Clicked next')
  }

  return (
    <div>
      <h1>カレンダー</h1>
      <h2>2022 / 03 / 15</h2>

      <div>
        <input type="button" value="<" onClick={prev} />
        <input type="button" value=">" onClick={next} />
      </div>

      <div>カレンダー本体</div>
    </div>
  )
}

export default Calendar;