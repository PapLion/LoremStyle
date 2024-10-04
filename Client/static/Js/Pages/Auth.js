const loginCard = document.getElementById('login-card');
const registerCard = document.getElementById('register-card');

loginCard.addEventListener('click', function() {
  loginCard.classList.add('active');
  loginCard.classList.remove('inactive');
  registerCard.classList.remove('active');
  registerCard.classList.add('inactive');
});

registerCard.addEventListener('click', function() {
  registerCard.classList.add('active');
  registerCard.classList.remove('inactive');
  loginCard.classList.remove('active');
  loginCard.classList.add('inactive');
});

// Handle login form submission
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent default form submission

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const data = {
    name: null,
    email: email,
    password: password,
  };

  try {
    const response = await fetch('/join_request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    console.log(result); // Handle the response from the server
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
});

// Handle registration form submission
const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent default form submission

  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  const data = {
    name: name,
    email: email,
    password: password,
  };

  try {
    const response = await fetch('/join_request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    console.log(result); // Handle the response from the server
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
});
