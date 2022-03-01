import './css/styles.css';
import {
  usersData,
  sleepData,
  activityData,
  hydrationData,
  getData,
  postData
} from './apiCalls';
import Hydration from './js/Hydration';
import UserRepository from './js/UserRepository';
import Sleep from './js/Sleep';
import Activity from './js/Activity';
import { updateDOM, showForms } from './domUpdates';
const userName = document.querySelector('#userName');
const stepGoal = document.querySelector('#stepGoal');
const infoCard = document.querySelector('#infoCard');
const displayButtons = document.querySelector('.form-display-buttons');
const statsSection = document.querySelector('#statsSection');
const hydrationForm = document.querySelector('#hydrationForm');
const sleepForm = document.querySelector('#sleepForm');
const activityForm = document.querySelector('#activityForm');
const todaysIntake = document.querySelector('#todaysIntake');
const weeklyIntake = document.querySelector('#weeklyIntake');
const todaysSleepHours = document.querySelector('#todaysSleepHours');
const todaysSleepQuality = document.querySelector('#todaysSleepQuality');
const weeklySleepHours = document.querySelector('#weeklySleepHours');
const weeklySleepQuality = document.querySelector('#weeklySleepQuality');
const avgSleepHours = document.querySelector('#avgSleepHours');
const avgSleepQuality = document.querySelector('#avgSleepQuality');
const todaysNumOfSteps = document.querySelector('#todaysNumOfSteps');
const todaysMinActive = document.querySelector('#todaysMinActive');
const todaysMilesWalked = document.querySelector('#todaysMilesWalked');
const comparedSteps = document.querySelector('#comparedSteps');
const comparedMinActive = document.querySelector('#comparedMinActive');
const comparedFlights = document.querySelector('#comparedFlights');
const weeklySteps = document.querySelector('#weeklySteps');
const weeklyFlights = document.querySelector('#weeklyFlights');
const weeklyMinActive = document.querySelector('#weeklyMinActive');



const fetchData = () => {
  Promise.all([usersData, sleepData, activityData, hydrationData]).then(data => {
    handleData(data);
  });
}

const handleData = (data) => {
  const users = new UserRepository(data[0].userData);
  const currentUser = getRandomUser(users);
  currentUser.hydration = new Hydration(data[3].hydrationData, currentUser.id);
  currentUser.sleep = new Sleep(data[1].sleepData, currentUser.id);
  currentUser.activity = new Activity(data[2].activityData, currentUser);
  updateDOM(currentUser, users);

  const sendData = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    if (e.target.name === 'activity') {
      const newActivity = {
        userID: currentUser.id,
        date: formData.get('date').split('-').join('/'),
        numSteps: parseInt(formData.get('numSteps')),
        minutesActive: parseInt(formData.get('minutesActive')),
        flightsOfStairs: parseInt(formData.get('flightsOfStairs'))
      }
      currentUser.activity.days.push(newActivity);
      currentUser.activity.days.sort((a, b) => {
        return new Date(a.date) - new Date(b.date) ;
      });
      postData(e.target.name, newActivity);
    }

    if (e.target.name === 'hydration') {
      const newHydrate = {
        userID: currentUser.id,
        date: formData.get('date').split('-').join('/'),
        numOunces: parseInt(formData.get('numOunces'))
      }
      postData(e.target.name, newHydrate);
      currentUser.hydration.days.push(newHydrate);
      currentUser.hydration.days.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      postData(e.target.name, newHydrate);
    }

    if (e.target.name === 'sleep') {
      const newSleep = {
        userID: currentUser.id,
        date: formData.get('date').split('-').join('/'),
        hoursSlept: parseInt(formData.get('hoursSlept')),
        sleepQuality: parseFloat(formData.get('sleepQuality'))
      }
      currentUser.sleep.days.push(newSleep);
      currentUser.sleep.days.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      postData(e.target.name, newSleep);
    }
    updateDOM(currentUser, users);
    e.target.reset();
  }

hydrationForm.onsubmit = sendData;
sleepForm.onsubmit = sendData;
activityForm.onsubmit = sendData;
}

const getRandomUser = (users) => {
  return users.getUser(Math.floor(Math.random() * users.users.length - 1));
}


window.onload = fetchData;
displayButtons.onclick = showForms;
