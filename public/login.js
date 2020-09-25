
// login/sign up 
const loginBtns = document.querySelectorAll('.tab-btn');
const forms = document.querySelectorAll('form');

// add click event
// remove active from other buttons
// hide other forms

loginBtns.forEach((item) => {
  item.addEventListener('click', (e) => {
    // get purpose button
    const purpose = e.target.dataset.purpose;

    // remove active from all buttons, add it to current
    loginBtns.forEach((btn) => {
      btn.classList.remove('active');
    });
    e.target.classList.add('active');

    // remove active to all forms, add it to current
    forms.forEach((form) => {
      form.classList.remove('active');
    });
    document.querySelector(`form[purpose=${purpose}]`).classList.add('active');
  });
});

// handle login or signup
const users = JSON.parse(localStorage.getItem('usersData')) || {};

// sign up handling
forms[0].addEventListener('submit', (e) => {
  e.preventDefault();
  let message = e.currentTarget.querySelector('.info');

  // sign up info
  const usernameInput = e.currentTarget.querySelector('#username');
  const emailInput = e.currentTarget.querySelector('#email');
  const passwordInput = e.currentTarget.querySelector('#password');

  // get sign up values
  let username = generateHash(usernameInput.value);
  let email = generateHash(emailInput.value);
  let password = generateHash(passwordInput.value);

  // clear data in input fields
  usernameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';

  // store details
  let user = { username: username, email: email, password: password };
  users[username] = user;
  localStorage.setItem('usersData', JSON.stringify(users));

  // show feedback to user
  message.classList.add('success');
  message.textContent = 'Successfully signed up.';

  setInterval(() => {
    window.location.replace('./main.html');
  }, 2000);
});

/** Return hash of a string */
function generateHash(string) {
  var hash = 0;
  if (string.length == 0)
    return hash;
  for (let i = 0; i < string.length; i++) {
    var charCode = string.charCodeAt(i);
    hash = ((hash << 7) - hash) + charCode;
    hash = hash & hash;
  }
  return hash;
}

// login handling
forms[1].addEventListener('submit', (e) => {
  e.preventDefault();
  let message = e.currentTarget.querySelector('.info');

  // get input fields
  let usernameInput = e.currentTarget.querySelector('#username-login');
  let passwordInput = e.currentTarget.querySelector('#password-login');

  // get value from fields
  let username = generateHash(usernameInput.value);
  let password = generateHash(passwordInput.value);

  // check whether the value exists
  for (const key in users) {
    if (users.hasOwnProperty(key)) {
      const user = users[key];
      if (username === user.username && password === user.password) {
        // log in this person
        console.log('Logged In');
        message.classList.add('success');
        message.textContent = 'Successfully logged in.';
        setInterval(() => {
          window.location.replace('./main.html');
        }, 2000);
        return;
      } else {
        console.log('Check your password and/or username.');
        message.classList.add('error');
        message.textContent = 'Check your username or password';
        return;
      }
    }
  }
});