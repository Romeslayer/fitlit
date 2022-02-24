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
    user1.activity = new Activity(activityTestData, user1.id);
    user2.activity = new Activity(activityTestData, user2.id);
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
    expect(user1.activity.getMiles("2019/06/15")).to.eql(2.9)
    expect(user2.activity.getMiles("2019/06/15")).to.eql(3.6)
  });
})
