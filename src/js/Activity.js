class Activity {
  constructor(data, user) {
    this.days = data.filter(day => day.userID === user.id);
    this.strideLength = user.strideLength;
  }
  getMiles(date) {
    let searchDate = this.days.find(day => day.date === date);
    return parseFloat((searchDate.numSteps * this.strideLength / 5280).toFixed(1));
  }
}

export default Activity;
