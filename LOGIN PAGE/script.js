function login(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Simple dummy login check
  if (email === "admin@example.com" && password === "password") {
    alert("Login successful!");
  } else {
    alert("Invalid credentials!");
  }
}
