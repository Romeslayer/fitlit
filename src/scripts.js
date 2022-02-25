import './css/styles.css';
import {
  usersData,
  sleepData,
  activityData,
  hydrationData
} from './apiCalls';
import Hydration from './js/Hydration';
import UserRepository from './js/UserRepository';
import Sleep from './js/Sleep';

import updateDOM from './domUpdates';

const userName = document.querySelector('#userName');
const stepGoal = document.querySelector('#stepGoal');
const infoCard = document.querySelector('#infoCard');
const statsSection = document.querySelector('#statsSection');
const todaysIntake = document.querySelector('#todaysIntake');
const weeklyIntake = document.querySelector('#weeklyIntake');
const todaysSleepHours = document.querySelector('#todaysSleepHours');
const todaysSleepQuality = document.querySelector('#todaysSleepQuality');
const weeklySleepHours = document.querySelector('#weeklySleepHours');
const weeklySleepQuality = document.querySelector('#weeklySleepQuality');
const avgSleepHours = document.querySelector('#avgSleepHours');
const avgSleepQuality = document.querySelector('#avgSleepQuality');

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
  updateDOM(currentUser, users);
}

const getRandomUser = (users) => {
  return users.getUser(Math.floor(Math.random() * users.users.length));
}

window.onload = fetchData;
