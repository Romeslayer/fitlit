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
import updateDOM from './domUpdates';
const userName = document.querySelector('#userName');
const stepGoal = document.querySelector('#stepGoal');
const infoCard = document.querySelector('#infoCard');
const statsSection = document.querySelector('#statsSection');
const hydrationForm = document.querySelector('#hydrationForm');
const sleepForm = document.querySelector('#sleepForm');
const activityForm = document.querySelector('#activityForm');
const displayButtons = document.querySelector('.form-display-buttons');

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
        numSteps: formData.get('numSteps'),
        minutesActive: formData.get('minutesActive'),
        flightsOfStairs: formData.get('flightsOfStairs')
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
        numOunces: formData.get('numOunces')
      }
      console.log(postData(e.target.name, newHydrate));
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
        hoursSlept: formData.get('hoursSlept'),
        sleepQuality: formData.get('sleepQuality')
      }
      currentUser.sleep.days.push(newSleep);
      currentUser.sort((a, b) => {
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



// **This logic isn't working**
const hideForms = () => {
  activityForm.classList = 'activity-form hidden';
  hydrationForm.classList = 'hydration-form hidden';
  sleepForm.classList = 'sleep-form hidden';
  // let forms = document.querySelectorAll('form');
  // forms.forEach(form => {
  //   if (!form.classList.value.includes('hidden')) {
  //     form.classList += ' hidden';
  //   }
  //   // form.classList.add('hidden');
  // });
}

window.onload = fetchData;
displayButtons.addEventListener('click', (e) => {
  //e.preventDefault();
  hideForms();
  let classes = e.target.classList;
  if (classes.value.includes('hydration')) {
    document.querySelector('.hydration-form').classList.remove('hidden');
  } else if (classes.value.includes('sleep')) {
    document.querySelector('.sleep-form').classList.remove('hidden');
  } else if (classes.value.includes('activity')) {
    document.querySelector('.activity-form').classList.remove('hidden');
  }
})
