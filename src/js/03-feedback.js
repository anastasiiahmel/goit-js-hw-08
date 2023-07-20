import throttle from 'lodash.throttle';

const inputEmailEl = document.querySelector('input');
const inputMessageEl = document.querySelector('textarea');
const feedbackForm = document.querySelector('.feedback-form');

feedbackForm.addEventListener('input', throttle(onValue, 500));
feedbackForm.addEventListener('submit', onSubmitValue);

const STORAGE_KEY = 'feedback-form-state';
let formData = { email: '', message: '' };

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

function formUpdate() {
  const form = localStorage.getItem(STORAGE_KEY);
  if (form) {
    formData = JSON.parse(form);
    for (let key in formData) {
      feedbackForm[key].value = formData[key];
    }
  }
}
formUpdate();
