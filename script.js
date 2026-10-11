(() => {
  const DEMO_EMAIL = "demo@nova.dev";
  const DEMO_PASSWORD = "Nova123!";
  const SESSION_KEY = "nova_demo_session";
  const USER_KEY = "nova_demo_user";

  const onLoginPage = document.getElementById("loginForm");
  if (onLoginPage) {
    if (sessionStorage.getItem(SESSION_KEY) === "active") {
      window.location.replace("dashboard.html");
      return;
    }
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const message = document.getElementById("message");
    document.getElementById("fillDemo").addEventListener("click", () => {
      email.value = DEMO_EMAIL;
      password.value = DEMO_PASSWORD;
      message.textContent = "Demo details filled in — click Sign in to continue.";
      message.className = "message success";
    });
    document.getElementById("togglePassword").addEventListener("click", () => {
      const showing = password.type === "text";
      password.type = showing ? "password" : "text";
      document.getElementById("togglePassword").setAttribute("aria-label", showing ? "Show password" : "Hide password");
    });
    onLoginPage.addEventListener("submit", (event) => {
      event.preventDefault();
      const enteredEmail = email.value.trim().toLowerCase();
      const enteredPassword = password.value;
      if (!enteredEmail || !enteredPassword) {
        message.textContent = "Please enter both your email and password.";
        message.className = "message";
        return;
      }
      if (enteredEmail !== DEMO_EMAIL || enteredPassword !== DEMO_PASSWORD) {
        message.textContent = "Those details don't match the demo account. Try “Use demo”.";
        message.className = "message";
        return;
      }
      sessionStorage.setItem(SESSION_KEY, "active");
      sessionStorage.setItem(USER_KEY, JSON.stringify({ name: "Demo User", email: DEMO_EMAIL }));
      message.textContent = "Signed in! Opening your dashboard…";
      message.className = "message success";
      window.setTimeout(() => window.location.href = "dashboard.html", 350);
    });
  }

  const dashboard = document.querySelector(".dashboard-page");
  if (dashboard) {
    if (sessionStorage.getItem(SESSION_KEY) !== "active") {
      window.location.replace("index.html");
      return;
    }
    let user = { name: "Demo User", email: DEMO_EMAIL };
    try { user = JSON.parse(sessionStorage.getItem(USER_KEY)) || user; } catch (_) {}
    document.getElementById("userName").textContent = user.name.split(" ")[0];
    document.getElementById("profileName").textContent = user.name;
    document.getElementById("profileEmail").textContent = user.email;
    document.getElementById("avatar").textContent = user.name.charAt(0).toUpperCase();
    const logout = () => {
      sessionStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(USER_KEY);
      window.location.replace("index.html");
    };
    document.getElementById("logoutBtn").addEventListener("click", logout);
    document.getElementById("logoutBtnBottom").addEventListener("click", logout);
  }
})();