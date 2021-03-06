import types from './types';

const fetchUserActivitiesRequest = userId => ({
  type: types.FETCH_USER_ACTIVITIES_REQUEST,
  userId,
});

const fetchUserActivitiesSuccess = (activities, pointsEarned, activitiesLogged, society, dlevel) => ({
  society,
  activities,
  pointsEarned,
  activitiesLogged,
  dlevel,
  type: types.FETCH_USER_ACTIVITIES_SUCCESS,
});

const fetchUserActivitiesError = error => ({
  type: types.FETCH_USER_ACTIVITIES_ERROR,
  error,
});

const loadCategories = () => ({
  type: types.CATEGORIES_REQUEST,
});

const setCategories = categories => ({
  type: types.CATEGORIES_SUCCESS,
  categories,
});

const setError = error => ({
  type: types.CATEGORIES_FAIL,
  error,
});

const logPointsRequest = activity => ({
  type: types.LOG_POINTS_REQUEST,
  activity,
});

const logPointsSuccess = activity => ({
  type: types.LOG_POINTS_SUCCESS,
  activity,
});

const logPointsFail = error => ({
  type: types.LOG_POINTS_FAIL,
  error,
});

export default {
  fetchUserActivitiesError,
  fetchUserActivitiesRequest,
  fetchUserActivitiesSuccess,
  logPointsRequest,
  logPointsSuccess,
  logPointsFail,
  setCategories,
  setError,
  loadCategories,
};
