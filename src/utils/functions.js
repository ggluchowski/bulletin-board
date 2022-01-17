exports.setEmail = function (status) {
  if (status === 'logged user') return 'user@user.com';
  else if(status === 'administrator') return 'admin@admin.com';
  else return '';
};

exports.ifLogged = function (status) {
  if (status === 'logged user' || status === 'administrator') return true;
  else return false;
};

exports.ifAuthor = function (loggedEmail, authorEmail) {
  if (loggedEmail === authorEmail) return true;
  else return false;
};

exports.sendDataToApi = function (e, data) {
  e.preventDefault();
  return console.log(e, data);
};

exports.formatDate = function (date) {
  if (date === '') return '';
  else {
    const d = new Date(date);
    let yy = d.getFullYear(d);
    let mm = d.getMonth(d) + 1;
    let dd = d.getDay(d);

    if (mm < 10) mm = '0' + mm;
    if (dd < 10) dd = '0' + dd;

    return yy + '-' + mm + '-' + dd;
  }
};
