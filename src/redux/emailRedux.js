/* selectors */
export const getEmailStatus = ({ loginEmail}) => loginEmail;

export const filterBulletinByUser = ({ posts,loginEmail }) => {
  const data = posts.data;
  let output = data.filter(post => post.email === loginEmail);
  return output;
};

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
