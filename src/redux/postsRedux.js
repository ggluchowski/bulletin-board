import Axios from 'axios';

/* selectors */
export const getAll = ({ posts }) => posts.data[0]; //tylko dla Post i PostAdd
export const getFiltered = ({ posts, email }) => posts.data;
export const getAllPublished = ({ posts }) => {
  const postType = typeof (posts.data);
  if (postType === 'object') return posts.data;
  else {
    posts.data.filter(post => post.status === 'published');
  }

};

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
    // dispatch(fetchStarted());

    Axios
      .get('http://localhost:8000/api/posts')
      .then(res => {
        const ifPosts = getState().posts.data;
        const loadingStatus = getState().posts.loading.active;
        if (ifPosts.length === 0 && loadingStatus === false)
          dispatch(fetchSuccess(res.data));
        if (loadingStatus === true)
          dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchId = (id) => {
  return (dispatch, getState) => {

    Axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
        dispatch(fetchStarted(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const postToDB = (data) => {
  return async (dispatch, getState) => {

    dispatch(fetchStarted());

    await Axios
      .post('http://localhost:8000/api/posts', data)
      .then(res => {
        // console.log(res.status, res.data);
        // dispatch(actionAddPost(data));
        const dataTab = [];
        dataTab.push(data);
        dispatch(fetchSuccess(dataTab));
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

    Axios
      .put(`http://localhost:8000/api/posts/${id}/edit`, {id, title, content, status, price, phoneNumber, localization, modDate})

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
