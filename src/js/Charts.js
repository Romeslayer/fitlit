let colors = {
  lime: '#BAFF29',
  darkBlue: '#1A1B41',
  lightBlue: '#6290C3',
  white: '#F1FFE7',
  blueWhite: '#C2E7DA',
  transparent: 'rgba(0, 0, 0, 0)'
};

let todaysIntakeChart = (currentUser) => {
  let hydration = currentUser.hydration;
  let lastRecordDate = hydration.days[hydration.days.length - 1].date;
  let todaysIntake = hydration.getDaily(lastRecordDate);
  return {
    type: 'doughnut',
    data: {
      labels: ['Total Intake', 'Remaining Intake'],
      datasets:[{
        label: `Today's Intake`,
        data: hydration.getAverage() > todaysIntake ? [todaysIntake, hydration.getAverage() - todaysIntake]
                 : [todaysIntake],
        backgroundColor: [
          colors.lightBlue, colors.transparent
        ],
        borderColor: [
          colors.darkBlue
        ]
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Today\'s Fluid intake (oz)'
        }
      }
    }
  };
};

let weeklyIntakeChart = (currentUser) => {
  let hydration = currentUser.hydration;
  let lastWeekDates = hydration.getWeekly().map(day => day.date);
  let weeklyIntake = hydration.getWeekly().map(day => day.numOunces);
  return {
    type: 'line',
    data: {
      labels: lastWeekDates,
      datasets:[{
        label: `Number of Ounces`,
        data: weeklyIntake,
        borderColor: colors.darkBlue,
        backgroundColor: colors.darkBlue
      },
      {
        label: `Average`,
        data: lastWeekDates.map(day => hydration.getAverage()),
        borderColor: colors.lightBlue,
        backgroundColor: colors.lightBlue
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Last Week\'s Fluid Intake (oz)',
          padding: {
            bottom: 10
          }
        }
      }
    }
  };
};

let todaysSleepHoursChart = (currentUser) => {
  let sleep = currentUser.sleep;
  let lastRecordDate = sleep.days[sleep.days.length - 1].date;
  let todaysSleepHours = sleep.getSleep(lastRecordDate);
  return {
    type: 'doughnut',
    data: {
      labels: ['Total Sleep', 'Sleep Deficiency'],
      datasets:[{
        label: `Today's Sleep`,
        data: sleep.getAverage() > todaysSleepHours ? [todaysSleepHours, sleep.getAverage() - todaysSleepHours]
                 : [todaysSleepHours],
        backgroundColor: [colors.darkBlue, colors.lime],
        borderColor: [colors.lightBlue]
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Hours Slept Last Night'
        }
      }
    }
  };
};

let todaysSleepQualityChart = (currentUser) => {
  let sleep = currentUser.sleep;
  let lastRecordDate = sleep.days[sleep.days.length - 1].date;
  let todaysSleepQuality = sleep.getSleepQuality(lastRecordDate);
  return {
    type: 'doughnut',
    data: {
      labels: ['Sleep Quality', 'Sleep Quality Deficiency'],
      datasets:[{
        label: `Today's Sleep Quality`,
        data: sleep.getAverageQuality() > todaysSleepQuality ? [todaysSleepQuality, sleep.getAverageQuality() - todaysSleepQuality]
                 : [todaysSleepQuality],
        backgroundColor: [colors.lime, colors.blueWhite],
        borderColor: [colors.darkBlue]
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Last Night\'s Sleep Quality'
        }
      }
    }
  };
};

let weeklySleepHoursChart = (currentUser) => {
  let sleep = currentUser.sleep;
  let lastWeekDates = sleep.getWeekSleep(sleep.days[sleep.days.length - 8].date).map(day => day.date);
  let weeklySleep = sleep.getWeekSleep(sleep.days[sleep.days.length - 8].date).map(day => day.hoursSlept);
  return {
    type: 'line',
    data: {
      labels: lastWeekDates,
      datasets:[{
        label: `Number of Hours Slept`,
        data: weeklySleep,
        backgroundColor: colors.darkBlue,
        borderColor: colors.darkBlue
      },
      {
        label: `Average Hours Slept`,
        data: lastWeekDates.map(day => sleep.getAverage()),
        backgroundColor: colors.lime,
        borderColor: colors.lime
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Last Week\'s Sleep Hours',
          padding: {
            bottom: 10
          }
        }
      }
    }
  };
};

let weeklySleepQualityChart = (currentUser) => {
  let sleep = currentUser.sleep;
  let lastWeekDates = sleep.getWeekQuality(sleep.days[sleep.days.length - 8].date).map(day => day.date);
  let weeklySleepQuality = sleep.getWeekQuality(sleep.days[sleep.days.length - 8].date).map(day => day.sleepQuality);
  return {
    type: 'line',
    data: {
      labels: lastWeekDates,
      datasets:[{
        label: `My Sleep Quality`,
        data: weeklySleepQuality,
        backgroundColor: colors.lightBlue,
        borderColor: colors.lightBlue
      },
      {
        label: `Average`,
        data: lastWeekDates.map(day => sleep.getAverageQuality()),
        backgroundColor: colors.lime,
        borderColor: colors.lime
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Last Week\'s Sleep Quality',
          padding: {
            bottom: 10
          }
        }
      }
    }
  };
};

let avgSleepHoursChart = (currentUser) => {
  let sleep = currentUser.sleep;
  return {
    type: 'bar',
    data: {
      labels: ['My Average', 'FitLit Average'],
      datasets: [{
        label: '',
        data: [sleep.getAverage(),sleep.getAverageAll()],
        backgroundColor: [colors.lightBlue, colors.darkBlue],
        borderColor: [colors.darkBlue]
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Average Sleep Hours',
          padding: {
            bottom: 10
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }
};

let avgSleepQualityChart = (currentUser) => {
  let sleep = currentUser.sleep;
  return {
    type: 'bar',
    data: {
      labels: ['My Average'],
      datasets: [{
        label: '',
        data: [sleep.getAverageQuality()],
        backgroundColor: [colors.lime]
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Average Sleep Quality',
          padding: {
            bottom: 10
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
};

let todaysNumOfStepsChart = (user) => {
  let activity = user.activity;
  let lastRecordDate = activity.days[activity.days.length - 1].date;
  let todaysSteps = activity.days[activity.days.length - 1].numSteps;
  return {
    type: 'doughnut',
    data: {
      labels: ['Total Steps', 'Remaining to Goal'],
      datasets:[{
        label: `Today's Total Steps`,
        data: user.dailyStepGoal > todaysSteps ? [todaysSteps, user.dailyStepGoal - todaysSteps]
                 : [todaysSteps],
        backgroundColor: [colors.lime, colors.blueWhite],
        borderColor: [colors.darkBlue]
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Today\'s Total Steps Compared to Goal'
        }
      }
    }
  };
}

let todaysMinActiveChart = (user) => {
  let activity = user.activity;
  let minutesActive = activity.days[activity.days.length - 1].minutesActive;
  let personalRecord = activity.days.map(day => day.minutesActive).sort((a,b) => b - a)[0]
  return {
    type: 'bar',
    data: {
      labels: ['Today', 'Personal Record'],
      datasets: [{
        label: '',
        data: [minutesActive, personalRecord],
        backgroundColor: [colors.lime, colors.darkBlue]
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'My Minutes Active Compared to All Time High',
          padding: {
            bottom: 10
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
}

let todaysMilesWalkedChart = (user) => {
  let activity = user.activity;
  let latestDate = activity.days[activity.days.length - 1].date;
  let personalRecordDate = activity.days.map(day => day).sort((a,b) => b.numSteps - a.numSteps)[0].date
  return {
    type: 'bar',
    data: {
      labels: ['Today', 'Personal Record'],
      datasets: [{
        label: '',
        data: [activity.getMiles(latestDate), activity.getMiles(personalRecordDate)],
        backgroundColor: [colors.lime, colors.darkBlue]
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'My Miles Walked Compared to All Time High',
          padding: {
            bottom: 10
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
}

let comparedStepsChart = (user) => {
  let activity = user.activity;
  let lastRecordDate = activity.days[activity.days.length - 1].date;
  let todaysSteps = activity.days[activity.days.length - 1].numSteps;
  return {
    type: 'bar',
    data: {
      labels: ['User Steps Today', 'FitLit Average'],
      datasets:[{
        label: `My Steps Today Compared to FitLit Average`,
        data: [todaysSteps, activity.allUsersStepsAvg(lastRecordDate)],
        backgroundColor: [colors.lime, colors.blueWhite],
        borderColor: [colors.darkBlue]
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: `My Steps Today Compared to FitLit Average`,
          padding: {
            bottom: 10
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
}

export default {
  todaysIntakeChart,
  weeklyIntakeChart,
  todaysSleepHoursChart,
  todaysSleepQualityChart,
  weeklySleepHoursChart,
  weeklySleepQualityChart,
  avgSleepHoursChart,
  avgSleepQualityChart,
  todaysNumOfStepsChart,
  todaysMinActiveChart,
  todaysMilesWalkedChart,
  comparedStepsChart,
  // comparedMinActiveChart,
  // comparedFlightsChart,
  // weeklyStepsChart,
  // weeklyFlightsChart,
  // weeklyMinActiveChart,
};
