class Hydration {
  constructor(data, id) {
    this.id = id;
    this.days = data.filter(day => day.userID === this.id);
  }
  getAverage() {
    let intakeAverage = this.days.reduce((acc, day) => {
      return acc + day.numOunces;
    }, 0) / this.days.length;
    return Math.floor(intakeAverage);
  }
  getDaily(date) {
    return this.days.find(day => day.date === date).numOunces;
  }
  getWeekly() {
    return this.days.slice(-7);
  }


  //43 50 50 91 61 96 69
}

export default Hydration;