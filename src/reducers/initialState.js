const initialState = {
  userInfo: {},
  myActivities: {
    requesting: false,
    activities: [],
    error: null,
    message: null,
  },
  societyInfo: {
    requesting: false,
    info: {
      name: '',
      image: '',
      loggedActivities: [],
      totalPoints: 0,
      usedPoints: 0,
      remainingPoints: 0,
    },
    error: {},
  },
  categories: {
    requesting: false,
    categories: [],
    error: {},
    message: null,
  },
  societyActivities: {
    activities: [],
    requesting: false,
    error: {},
    updating: false,
  },
  userProfile: {
    requesting: false,
    info: {
      society: {
        name: '',
      },
      roles: {},
    },
    error: {},
  },
  redemptionsInfo: {
    message: {},
    requesting: false,
    redemptions: [],
    hasError: false,
    updating: false,
  },
};

export default initialState;
