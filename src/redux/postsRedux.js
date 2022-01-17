import Axios from 'axios';
import { api } from '../settings';

/* selectors */
export const getAll = ({ posts }) => posts.data;
export const getFiltered = ({ posts, email }) => posts.data;

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_POST = createActionName('ADD_POST');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const actionAddPost = payload => ({ payload, type: ADD_POST });

/* thunk creators */
export const fetchFromAPI = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .get('http://localhost:3000')
      .then(res => {
        console.log(res);
        dispatch(fetchStarted());
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const putToAPI = (id, title, content, status, price, phoneNumber, localization, modDate) => {
  return async (dispatch, getState) => {
    dispatch(fetchStarted());

    console.log(id, title, content, status, price, phoneNumber, localization, modDate);

    Axios
      .put(`${api.url}/${api.post}/${id}/${api.edit}`, { id: id, title: title, content: content, status: status, price: price, phoneNumber: phoneNumber, localization: localization, modDate: modDate })
      .then(res => {
        dispatch(actionAddPost(res.data));
        dispatch(fetchFromAPI());
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START:
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };

    case FETCH_SUCCESS:
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };

    case FETCH_ERROR:
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };

    case ADD_POST:
      return {
        ...statePart,
        data: [...statePart.data, action.payload],
      };

    default:
      return statePart;
  }
};
