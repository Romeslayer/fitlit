import Chart from 'chart.js/auto';
import charts from './js/Charts';

const displayButtons = document.querySelector('.form-display-buttons');

let updateDOM = (currentUser, users) => {
  updateUser(currentUser, users);
  makeCharts(currentUser);
  hideForms();
  displayStats(currentUser);
}

const makeCharts = (currentUser) => {
  let myCharts = [
     "todaysIntake",
     "weeklyIntake",
     "todaysSleepHours",
     "todaysSleepQuality",
     "weeklySleepHours",
     "weeklySleepQuality",
     "avgSleepHours",
     "avgSleepQuality",
     "todaysNumOfSteps",
     "todaysMinActive",
     "todaysMilesWalked",
     "comparedSteps",
     "comparedMinActive",
     "comparedFlights",
     "weeklySteps",
     "weeklyFlights",
     "weeklyMinActive",
  ]

  myCharts.forEach(chart => {
    let chartConfig = charts[chart + 'Chart'](currentUser);
    let article = document.querySelector(`#${chart}`);
    article.innerHTML = `<canvas id="${chart}Chart"></canvas>`;
    let canvas = article.querySelector('canvas');
    let setCanvas = new Chart(canvas, chartConfig);
  });
}



const updateUser = (currentUser, users) => {
  let friends = `Friends: `;
  userName.innerText = `Welcome ${currentUser.getName()}`;
  stepGoal.innerText = `Your step goal: ${currentUser.dailyStepGoal} / Average: ${users.averageStepGoal()}`;
  currentUser.friends.forEach(friend => {
    friends += `${users.getUser(friend).getName()}, `;
  });
  friends = friends.slice(0, -2);
  infoCard.innerHTML = `
    <p>Name: ${currentUser.name}</p>
    <p>Id: ${currentUser.id}</p>
    <p>Address: ${currentUser.address}</p>
    <p>Email: ${currentUser.email}</p>
    <p>Stride Length: ${currentUser.strideLength}</p>
    <p>${friends}</p>
  `;
}

const displayStats = (currentUser) => {
  todaysIntake.querySelector('canvas').innerHTML +=
  `<p>Your water intake for today is: ${currentUser.hydration.getDaily(currentUser.hydration.days[currentUser.hydration.days.length - 1].date)} fl oz, compared to your record intake which was: ${hydration.days.map(day => day.numOunces).sort((a,b) => b - a)[0]}`;
  currentUser.hydration.getWeekly().forEach(day => weeklyIntake.querySelector('canvas').innerHTML +=
  `<p>On ${day.date} you drank: ${day.numOunces} fl oz</p>`);
  avgSleepHours.querySelector('canvas').innerHTML +=
  `<p>Your total sleep hour average is: ${currentUser.sleep.getAverage()}`;
  avgSleepQuality.querySelector('canvas').innerHTML +=
  `<p>Your total sleep quality average is: ${currentUser.sleep.getAverageQuality()}`;
  todaysSleepHours.querySelector('canvas').innerHTML +=
  `<p>You slept ${currentUser.sleep.getSleep(currentUser.sleep.days[currentUser.sleep.days.length - 1].date)} hours last night.`;
  todaysSleepQuality.querySelector('canvas').innerHTML +=
  `<p>Your sleep quality last night was: ${currentUser.sleep.getSleepQuality(currentUser.sleep.days[currentUser.sleep.days.length - 1].date)}.`;
  currentUser.sleep.getWeekSleep(currentUser.sleep.days[currentUser.sleep.days.length - 8].date).forEach(day => weeklySleepHours.querySelector('canvas').innerHTML +=
  `<p>On ${day.date}, you slept ${day.hoursSlept} hours.`);
  currentUser.sleep.getWeekQuality(currentUser.sleep.days[currentUser.sleep.days.length - 8].date).forEach(day => weeklySleepQuality.querySelector('canvas').innerHTML +=
  `<p>On ${day.date}, your sleep quality was: ${day.sleepQuality}.`);
  todaysNumOfSteps.querySelector('canvas').innerHTML +=
  `<p>On ${day.date} you walked ${currentUser.activity.days[currentUser.activity.days.length - 1].numSteps} number of steps today. Your step goal is ${currentUser.dailyStepGoal}</p>`;
  todaysMinActive.querySelector('canvas').innerHTML +=
  `<p>On ${day.date} you were active for ${currentUser.activity.days[activity.days.length - 1].minutesActive}. Your personal record is ${currentUser.activity.days.map(day => day.minutesActive).sort((a,b) => b - a)[0]}</p>`;
  todaysMilesWalked.querySelector('canvas').innerHTML +=
  `<p>On ${day.date} you walked ${currentUser.activity.getMiles(currentUser.activity.days[activity.days.length - 1].date)} miles. Your personal record is ${currentUser.activity.days.map(day => day).sort((a,b) => b.numSteps - a.numSteps)[0]}</p>`;
  comparedSteps.querySelector('canvas').innerHTML +=
  `<p>On ${day.date} you walked ${currentUser.activity.days[activity.days.length - 1].numSteps} steps. The Fitlit average was ${currentUser.activity.allUsersStepsAvg(currentUser.activity.days[activity.days.length - 1].date)}</p>`;
  comparedMinActive.querySelector('canvas').innerHTML +=
  `<p>On ${day.date} you were active for ${currentUser.activity.days[activity.days.length - 1].minutesActive}. The Fitlit average was ${currentUser.activity.allUsersMinutesAvg(currentUser.activity.days[activity.days.length - 1].date)}</p>`;
  comparedFlights.querySelector('canvas').innerHTML +=
  `<p>On ${day.date} you climbed ${currentUser.activity.days[activity.days.length - 1].flightsOfStairs} flights of stairs. The Fitlit average was ${currentUser.activity.allUsersStairsAvg(currentUser.activity.days[activity.days.length - 1].date)}</p>`;
  currentUser.activity.days.slice(-7).forEach(day => weeklySteps.querySelector('canvas').innerHTML +=
  `<p>On ${day.date} you walked ${day.numSteps} steps.</p>`);
  currentUser.activity.days.slice(-7).forEach(day => weeklyFlights.querySelector('canvas').innerHTML +=
  `<p>On ${day.date} you climbed ${day.flightsOfStairs} flights of stairs.</p>`);
  currentUser.activity.days.slice(-7).forEach(day => weeklyMinActive.querySelector('canvas').innerHTML +=
  `<p>On ${day.date} you were active for ${day.minutesActive} minutes.</p>`);
};

const hideForms = () => {
  activityForm.classList = 'activity-form hidden';
  hydrationForm.classList = 'hydration-form hidden';
  sleepForm.classList = 'sleep-form hidden';
}

displayButtons.addEventListener('click', (e) => {
  hideForms();
  let classes = e.target.closest('button').classList;
  if (classes.value.includes('hydration')) {
    hydrationForm.classList.remove('hidden');
  } else if (classes.value.includes('sleep')) {
    sleepForm.classList.remove('hidden');
  } else if (classes.value.includes('activity')) {
    activityForm.classList.remove('hidden');
  }
});

export default updateDOM;
