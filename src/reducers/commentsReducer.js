// actions
import {
  MORE_INFO_FAILURE,
  MORE_INFO_REQUEST,
  MORE_INFO_SUCCESS,
} from '../types';
import initialState from './initialState';

const commentsReducer = (state = initialState.commentsInfo, action) => {
  switch (action.type) {
  case MORE_INFO_REQUEST:
    return {
      ...state,
      message: {
        type: 'info',
        text: 'Sending ...',
      },
      requesting: true,
    };
  case MORE_INFO_SUCCESS:
    return {
      ...state,
      comment: [...state.comment, action.comment.data],
      message: {
        type: 'success',
        text: action.comment.message,
      },
      requesting: false,
    };
  case MORE_INFO_FAILURE:
    return {
      ...state,
      message: {
        type: 'error',
        text: action.error,
      },
      requesting: false,
      hasError: true,
    };
  default:
    return state;
  }
};

export default commentsReducer;
