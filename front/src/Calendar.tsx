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