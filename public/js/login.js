const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

// type is 'success' or 'error'
const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);

  window.setTimeout(hideAlert, 5000);
};

const login = async (user, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/login',
      data: {
        user,
        password,
      },
    });

    console.log(res);

    const today = new Date();
    console.log(today.getTime());

    if (res.status === 200) {
      console.log('suceess');
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/update');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const loginForm = document.querySelector('.login-form');

if (loginForm)
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('user').value;
    const password = document.getElementById('password').value;
    await login(email, password);
  });
