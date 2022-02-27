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
  let lastRecordedDate = hydration.days[hydration.days.length - 1].date;
  let personalRecord = hydration.days.map(day => day.numOunces).sort((a,b) => b - a)[0]
  let todaysIntake = hydration.getDaily(lastRecordedDate);
  return {
    type: 'doughnut',
    data: {
      labels: ['Total Intake', 'Remaining oz to Record'],
      datasets:[{
        label: `Today's Intake`,
        data: [todaysIntake, personalRecord - todaysIntake],
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
          text: `Today\'s Fluid Intake is ${todaysIntake}oz / ${personalRecord}oz record`
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
  let lastRecordedDate = sleep.days[sleep.days.length - 1].date;
  let personalRecord = sleep.days.map(day => day.hoursSlept).sort((a,b) => b - a)[0]
  let todaysSleepHours = sleep.getSleep(lastRecordedDate);
  return {
    type: 'doughnut',
    data: {
      labels: ['Total Hours Slept', 'Hours to Record'],
      datasets:[{
        label: `Today's Sleep`,
        data: [todaysSleepHours, personalRecord - todaysSleepHours],
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
          text: `Slept for ${todaysSleepHours}hrs Last Night vs A Record of ${personalRecord}hrs`
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
        data: [todaysSleepQuality, 5 - todaysSleepQuality],
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
          text: `Last Night\'s Sleep Quality was ${todaysSleepQuality} out of 5`
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
          text: `Today\'s Total Steps: ${todaysSteps} / ${user.dailyStepGoal} Goal`
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
      labels: ['My Steps Today', 'FitLit Average'],
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

let comparedMinActiveChart = (user) => {
  let activity = user.activity;
  let lastRecordDate = activity.days[activity.days.length - 1].date;
  let minutesActive = activity.days[activity.days.length - 1].minutesActive;
  return {
    type: 'bar',
    data: {
      labels: ['My Minutes Active Today', 'FitLit Average'],
      datasets:[{
        label: `My Minutes Active Today Compared to FitLit Average`,
        data: [minutesActive, activity.allUsersMinutesAvg(lastRecordDate)],
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
          text: `My Minutes Active Today Compared to FitLit Average`,
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

let comparedFlightsChart = (user) => {
  let activity = user.activity;
  let lastRecordDate = activity.days[activity.days.length - 1].date;
  let todaysStairs = activity.days[activity.days.length - 1].flightsOfStairs;
  return {
    type: 'bar',
    data: {
      labels: ['Flights of Stairs Climbed Today', 'FitLit Average'],
      datasets:[{
        label: `Flights of Stairs Climbed Today Compared to FitLit Average`,
        data: [todaysStairs, activity.allUsersStairsAvg(lastRecordDate)],
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
          text: `Flights of Stairs Climbed Today Compared to FitLit Average`,
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

let weeklyStepsChart = (user) => {
  let activity = user.activity;
  let lastWeekDays = activity.days.slice(-7);
  let lastWeekDates = lastWeekDays.map(day => day.date);
  let weekAverages = lastWeekDates.map(date => activity.allUsersStepsAvg(date));
  let userWeekSteps = lastWeekDays.map(day => day.numSteps);

  return {
    type: 'line',
    data: {
      labels: lastWeekDates,
      datasets:[{
        label: `My Past Week's Steps`,
        data: userWeekSteps,
        backgroundColor: colors.lightBlue,
        borderColor: colors.lightBlue
      },
      {
        label: `Other Users' Weekly Average Steps`,
        data: weekAverages,
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
          text: 'My Weekly Steps Compared to Fitlit Average',
          padding: {
            bottom: 10
          }
        }
      }
    }
  };
}

let weeklyFlightsChart = (user) => {
  let activity = user.activity;
  let lastRecordDate = activity.days[activity.days.length - 1].date;
  let todaysStairs = activity.days[activity.days.length - 1].flightsOfStairs;
  let lastWeekDays = activity.days.slice(-7);
  let lastWeekDates = lastWeekDays.map(day => day.date);
  let userWeekStairs = lastWeekDays.map(day => day.flightsOfStairs);

  return {
    type: 'bar',
    data: {
      labels: lastWeekDates,
      datasets:[{
        label: `Flights of Stairs Climbed Each Day This Week`,
        data: userWeekStairs,
        backgroundColor: [colors.lime, colors.blueWhite, colors.lightBlue, colors.darkBlue, colors.lightBlue, colors.blueWhite, colors.lime],
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
          text: `Flights of Stairs Climbed Each Day This Week`,
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


let weeklyMinActiveChart = (user) => {
  let activity = user.activity;
  let lastWeekDays = activity.days.slice(-7);
  let lastWeekDates = lastWeekDays.map(day => day.date);
  let weekAverages = lastWeekDates.map(date => activity.allUsersMinutesAvg(date));
  let userWeekMinActive = lastWeekDays.map(day => day.minutesActive);

  return {
    type: 'line',
    data: {
      labels: lastWeekDates,
      datasets:[{
        label: `Minutes Active This Week`,
        data: userWeekMinActive,
        backgroundColor: colors.lightBlue,
        borderColor: colors.lightBlue
      },
      {
        label: `Other Users' Minutes Active`,
        data: weekAverages,
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
          text: 'My Weekly Steps Compared to Fitlit Average',
          padding: {
            bottom: 10
          }
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
  comparedMinActiveChart,
  comparedFlightsChart,
  weeklyStepsChart,
  weeklyFlightsChart,
  weeklyMinActiveChart,
};
