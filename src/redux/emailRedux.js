/* selectors */
export const getEmailStatus = ({ loginEmail }) => loginEmail;

export const filterBulletinByUser = ({ posts, loginEmail }) => (
  posts.data.filter(item => item.email === loginEmail)
);

/* action name creator */
const reducerName = 'emailStatus';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const EMAIL_STATUS = createActionName('EMAIL_STATUS');

/* action creators */
export const actionChangeEmailStatus = payload => ({ payload, type: EMAIL_STATUS });

/* thunk creators */

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case EMAIL_STATUS:
      return action.payload;

    default:
      return statePart;
  }
};
