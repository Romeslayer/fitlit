import { expect } from 'chai';
import UserRepository from '../src/js/UserRepository';
import userTestData from '../src/data/user-test-data';
import activityTestData from '../src/data/activity-test-data';
import User from '../src/js/User';
import Activity from '../src/js/Activity';

describe('Activity', () => {
  let userRepository;
  let user1;
  let user2;
  let activity;

  beforeEach(() => {
    userRepository = new UserRepository(userTestData)
    user1 = new User(userTestData[0]);
    user2 = new User(userTestData[1]);
    user1.activity = new Activity(activityTestData, user1);
    user2.activity = new Activity(activityTestData, user2);
  });

  it('should be a function', () => {
    expect(Activity).to.be.a('function');
  });

  it('should be an instance of Activity', () => {
    expect(user1.activity).to.be.an.instanceof(Activity);
  });

  it('should hold an array of activity info', () => {
    expect(user1.activity.days).to.be.an('array');
  });

  it('should be able to populate activity.days array based on ID', () => {
    expect(user1.activity.days.length).to.eql(14);
    expect(user1.activity.days[0]).to.eql(
      {
        userID: 1,
        date: "2019/06/15",
        numSteps: 3577,
        minutesActive: 140,
        flightsOfStairs: 16
      },
    );
  });

  it('should be able to populate activity.days with different ID', () => {
    expect(user2.activity.days.length).to.eql(14);
    expect(user2.activity.days[0]).to.eql(
      {
        userID: 2,
        date: "2019/06/15",
        numSteps: 4294,
        minutesActive: 138,
        flightsOfStairs: 10
      },
    );
  });

  it('should be able to calculate amount of miles walked on a given day', () => {
    expect(user1.activity.getMiles("2019/06/15")).to.eql(2.9);
    expect(user2.activity.getMiles("2019/06/15")).to.eql(3.7);
  });

  it('should be able to return the amount of minutes active on a given day', () => {
    expect(user1.activity.getDailyMinutes("2019/06/15")).to.eql(140);
    expect(user2.activity.getDailyMinutes("2019/06/15")).to.eql(138);
  });

  it('should be able to calculate the average minutes active for a given week', () => {
    expect(user1.activity.getWeeklyMinutes("2019/06/15")).to.eql(171);
    expect(user2.activity.getWeeklyMinutes("2019/06/15")).to.eql(156);
  });

  it('should be able to determine if the user has reached their step goal for a given day', () => {
    expect(user1.activity.reachStepGoal("2019/06/15")).to.eql(false);
    expect(user2.activity.reachStepGoal("2019/06/15")).to.eql(false);
    expect(user1.activity.reachStepGoal("2019/06/17")).to.eql(true);
  });

  it('should be able to determine all days that the user met/exceeded their step goal', () => {
    expect(user1.activity.daysExceededStepGoal()).to.eql([
    {
      userID: 1,
      date: '2019/06/17',
      numSteps: 14329,
      minutesActive: 168,
      flightsOfStairs: 18
    },
    {
      userID: 1,
      date: '2019/06/20',
      numSteps: 14478,
      minutesActive: 140,
      flightsOfStairs: 12
    },
    {
      userID: 1,
      date: '2019/06/22',
      numSteps: 10289,
      minutesActive: 119,
      flightsOfStairs: 6
    },
    {
      userID: 1,
      date: '2019/06/23',
      numSteps: 13928,
      minutesActive: 218,
      flightsOfStairs: 21
    },
    {
      userID: 1,
      date: '2019/06/28',
      numSteps: 10517,
      minutesActive: 169,
      flightsOfStairs: 6
    }
  ]);
    expect(user2.activity.daysExceededStepGoal()).to.eql([
    {
      userID: 2,
      date: '2019/06/17',
      numSteps: 13750,
      minutesActive: 65,
      flightsOfStairs: 4
    },
    {
      userID: 2,
      date: '2019/06/19',
      numSteps: 9858,
      minutesActive: 243,
      flightsOfStairs: 44
    },
    {
      userID: 2,
      date: '2019/06/20',
      numSteps: 8153,
      minutesActive: 74,
      flightsOfStairs: 10
    },
    {
      userID: 2,
      date: '2019/06/21',
      numSteps: 10225,
      minutesActive: 174,
      flightsOfStairs: 26
    },
    {
      userID: 2,
      date: '2019/06/24',
      numSteps: 8568,
      minutesActive: 81,
      flightsOfStairs: 31
    },
    {
      userID: 2,
      date: '2019/06/25',
      numSteps: 10305,
      minutesActive: 214,
      flightsOfStairs: 5
    },
    {
      userID: 2,
      date: '2019/06/26',
      numSteps: 11522,
      minutesActive: 88,
      flightsOfStairs: 18
    },
    {
      userID: 2,
      date: '2019/06/28',
      numSteps: 12555,
      minutesActive: 193,
      flightsOfStairs: 45
    }
    ]);
  });

  it('should be able to return the all-time stair climbing record', () => {
    expect(user1.activity.stairClimbRecord()).to.eql(39);
    expect(user2.activity.stairClimbRecord()).to.eql(45);
  });

  it('should be able to calculate the average numbers of stairs climbed for all users on a specific date', () => {
    expect(user1.activity.allUsersStairsAvg("2019/06/15")).to.eql(13);
    expect(user2.activity.allUsersStairsAvg("2019/06/16")).to.eql(36);
  });

  it('should be able to calculate the average number of steps taken for all users on a specific date', () => {
    expect(user1.activity.allUsersStepsAvg("2019/06/15")).to.eql(3935);
    expect(user2.activity.allUsersStepsAvg("2019/06/16")).to.eql(5374);
  });

  it('should be able to calculate the average minutes active for all users on a specific date', () => {
    expect(user1.activity.allUsersMinutesAvg("2019/06/15")).to.eql(139);
    expect(user2.activity.allUsersMinutesAvg("2019/06/16")).to.eql(197);
  });
});
