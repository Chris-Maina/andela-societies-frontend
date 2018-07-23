const store = {
  pageInfo: {
    url: '',
    title: '',
  },
  userInfo: {
    name: '',
    picture: '',
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
  myActivities: {
    requesting: false,
    activities: [],
    message: null,
    error: null,
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
  redeemPointsInfo: {
    message: {},
    requesting: false,
    redemptions: [],
    updating: false,
  },
};

export default store;
