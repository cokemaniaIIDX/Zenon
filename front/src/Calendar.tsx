function Calendar() {

  const Confirm = ()=> {
    const Today = new Date();
    console.log("toString: " + Today.toString())
    console.log("toDateString: " + Today.toDateString())
    console.log("toISOString: " + Today.toISOString())
    console.log("toJSON: " + Today.toJSON())
    console.log("toUTCString: " + Today.toUTCString())
    console.log("toLocaleString: " + Today.toLocaleString())
  }

  return (
    <div>
      <input type="button" value="確認！" onClick={Confirm} />
    </div>
  )
}
export default Calendar;