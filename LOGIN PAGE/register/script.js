function login(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "admin@example.com" && password === "password") {
    alert("Login successful!");
  } else {
    alert("Invalid credentials!");
  }
}

function register(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const dob = document.getElementById("dob").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return false;
  }

  alert(`Registration Successful!\nWelcome, ${name}`);
  // Optionally save to localStorage or redirect
  return true;
}
