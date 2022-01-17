/* selectors */
export const getloginStatus = ({ loginStatus }) => loginStatus;

/* action name creator */
const reducerName = 'loginStatus';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const LOGIN_STATUS = createActionName('LOGIN_STATUS');

/* action creators */
export const actionChangeLoginStatus = payload => ({ payload, type: LOGIN_STATUS });

/* thunk creators */

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case LOGIN_STATUS:
      return action.payload;

    default:
      return statePart;
  }
};
