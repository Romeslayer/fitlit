class Activity {
  constructor(data, user) {
    this.days = data.filter(day => day.userID === user.id);
    this.strideLength = user.strideLength;
    this.stepGoal = user.dailyStepGoal;
    this.usersStairsAvg = {};
    this.usersStepsAvg = {};
    this.usersMinutesAvg = {};

    data.forEach(day => {
      if (!this.usersStairsAvg[day.date]) {
        this.usersStairsAvg[day.date] = 0;
        this.usersStepsAvg[day.date] = 0;
        this.usersMinutesAvg[day.date] = 0;
      }
    });
    Object.keys(this.usersStairsAvg).forEach(key => {
      let days = data.filter(day => key === day.date);
      let stairAvg = days.reduce((acc, day) => {
        return acc + day.flightsOfStairs;
      }, 0) / days.length;
      this.usersStairsAvg[key] = Math.floor(stairAvg);

      let stepsAvg = days.reduce((acc, day) => {
        return acc + day.numSteps;
      }, 0) / days.length;
      this.usersStepsAvg[key] = Math.floor(stepsAvg);

      let minutesAvg = days.reduce((acc, day) => {
        return acc + day.minutesActive;
      }, 0) / days.length;
      this.usersMinutesAvg[key] = Math.floor(minutesAvg);
    });


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
  reachStepGoal(date) {
    let day = this.days.find(day => day.date === date);
    return (day.numSteps >= this.stepGoal ? true : false);
  }
  daysExceededStepGoal() {
    return this.days.filter(day => this.reachStepGoal(day.date));
  }
  stairClimbRecord() {
    return this.days.reduce((acc, day) => {
      return acc > day.flightsOfStairs ? acc : day.flightsOfStairs;
    }, 0);
  }
  allUsersStairsAvg(date) {
    return this.usersStairsAvg[date];
  }
  allUsersStepsAvg(date) {
    return this.usersStepsAvg[date];
  }
  allUsersMinutesAvg(date) {
    return this.usersMinutesAvg[date];
  }
}

export default Activity;
