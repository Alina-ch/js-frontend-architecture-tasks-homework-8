import keyBy from 'lodash/keyBy.js';
import has from 'lodash/has.js';
import isEmpty from 'lodash/isEmpty.js';
import * as yup from 'yup';
import onChange from 'on-change';
import axios from 'axios';

const routes = {
  usersPath: () => '/users',
};

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().required('email must be a valid email').email(),
  password: yup.string().required().min(6),
  passwordConfirmation: yup.string()
    .required('password confirmation is a required field')
    .oneOf(
      [yup.ref('password'), null],
      'password confirmation does not match to password',
    ),
});

// Этот объект можно использовать для того, чтобы обрабатывать ошибки сети.
// Это необязательное задание, но крайне рекомендуем попрактиковаться.
const errorMessages = {
  network: {
    error: 'Network Problems. Try again.',
  },
};

// Используйте эту функцию для выполнения валидации.
// Выведите в консоль её результат, чтобы увидеть, как получить сообщения об ошибках.
const validate = (fields) => {
  try {
    schema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return keyBy(e.inner, 'path');
  }
};

// BEGIN
export default () => {
  const state = {
    form: {
      valid: false,
      errors: {},
      processState: 'filling',
    },
  };

  const container = document.querySelector('[data-container="sign-up"]');
  const form = document.querySelector('[data-form="sign-up"]');
  const submitButton = form.querySelector('input[type="submit"]');
  const fields = ['name', 'email', 'password', 'passwordConfirmation'];

  const watchedState = onChange(state, (path, value) => {
    if (path === 'form.valid' || path === 'form.processState') {
      if (watchedState.form.valid && watchedState.form.processState === 'filling') {
        submitButton.removeAttribute('disabled');
      } else {
        submitButton.setAttribute('disabled', 'true');
      }
    }

    if (path === 'form.errors') {
      fields.forEach((fieldName) => {
        const input = form.querySelector(`[name="${fieldName}"]`);
        const errorFeedback = input.nextElementSibling;

        if (errorFeedback && errorFeedback.classList.contains('invalid-feedback')) {
          errorFeedback.remove();
        }
        input.classList.remove('is-invalid');

        const fieldError = watchedState.form.errors[fieldName];

        if (fieldError) {
          input.classList.add('is-invalid');
          const div = document.createElement('div');
          div.classList.add('invalid-feedback');
          div.textContent = fieldError.message;
          input.after(div);
        }
      });
    }

    if (path === 'form.processState' && value === 'finished') {
      container.textContent = 'User Created!';
    }
  });

  form.addEventListener('input', () => {
    const currentValues = {
      name: form.querySelector('[name="name"]').value,
      email: form.querySelector('[name="email"]').value,
      password: form.querySelector('[name="password"]').value,
      passwordConfirmation: form.querySelector('[name="passwordConfirmation"]').value,
    };

    const errors = validate(currentValues);
    watchedState.form.errors = errors;
    watchedState.form.valid = isEmpty(errors);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    watchedState.form.processState = 'sending';

    const currentValues = {
      name: form.querySelector('[name="name"]').value,
      email: form.querySelector('[name="email"]').value,
      password: form.querySelector('[name="password"]').value,
      passwordConfirmation: form.querySelector('[name="passwordConfirmation"]').value,
    };

    axios.post(routes.usersPath(), currentValues)
      .then(() => {
        watchedState.form.processState = 'finished';
      })
      .catch(() => {
        watchedState.form.processState = 'filling';
      });
  });
};
// END
