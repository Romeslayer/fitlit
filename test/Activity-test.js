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
})
