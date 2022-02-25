class Activity {
  constructor(data, user) {
    this.days = data.filter(day => day.userID === user.id);
    this.strideLength = user.strideLength;
  }
  getMiles(date) {
    let result = this.days.find(day => day.date === date);
    return parseFloat((result.numSteps * this.strideLength / 5280).toFixed(1));
  }
  getDailyMinutes(date) {
    let result = this.days.find(day => day.date === date);
    return result.minutesActive;
  }
  getWeeklyMinutes(date) {
    let weekStart = this.days.findIndex(day => day.date === date);
    let week = this.days.slice(weekStart, weekStart + 7);
    let result = week.reduce((acc, day) => {
      return acc + day.minutesActive;
    }, 0);
    return Math.floor(result / 7);
  }
}

export default Activity;
