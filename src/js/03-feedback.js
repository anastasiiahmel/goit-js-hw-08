import throttle from 'lodash.throttle';

const inputEmailEl = document.querySelector('input');
const inputMessageEl = document.querySelector('textarea');
const feedbackForm = document.querySelector('.feedback-form');

feedbackForm.addEventListener('input', onValue);
feedbackForm.addEventListener('submit', throttle(onSubmitValue, 500));

const STORAGE_KEY = 'feedback-form-state';
let formData = {};
function onValue(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onSubmitValue(evt) {
  evt.preventDefault();
  const {
    elements: { email, message },
  } = evt.currentTarget;

  if (email.value === '' || message.value === '') {
    return alert('Please fill in all the fields!');
  }

  console.log({ email: email.value, message: message.value });
  evt.currentTarget.reset();

  localStorage.removeItem(STORAGE_KEY);
}
