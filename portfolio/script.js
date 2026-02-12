const form = document.getElementById("studentForm");
const submitBtn = document.getElementById("submitBtn");
const formSuccess = document.getElementById("formSuccess");
const registeredPanel = document.getElementById("registeredPanel");
const registeredUsername = document.getElementById("registeredUsername");
const registeredEmail = document.getElementById("registeredEmail");
const registeredPhone = document.getElementById("registeredPhone");

const username = document.getElementById("username");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const emailRegex = /^[A-Za-z]{2,}@[A-Za-z]{3}\.[A-Za-z]{2,3}$/;
const phoneRegex = /^\d{10}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[&$#@]).{7,}$/;

function setError(id, message) {
  document.getElementById(id).innerHTML = message;
}

function clearErrors() {
  const errorNodes = document.getElementsByClassName("error-text");
  for (let i = 0; i < errorNodes.length; i += 1) {
    errorNodes[i].innerHTML = "";
  }
}

function validateUsernameLive() {
  const userVal = username.value.trim();
  if (userVal === "") {
    setError("usernameError", "Username cannot be empty.");
    return false;
  }
  setError("usernameError", "");
  return true;
}

function validateEmailLive() {
  const emailVal = email.value.trim();
  if (emailVal === "") {
    setError("emailError", "Email cannot be empty.");
    return false;
  }
  if (!emailRegex.test(emailVal)) {
    setError("emailError", "Use format like ab@xyz.in");
    return false;
  }
  setError("emailError", "");
  return true;
}

function validatePhoneLive() {
  const phoneVal = phone.value.trim();
  if (phoneVal === "") {
    setError("phoneError", "Phone number cannot be empty.");
    return false;
  }
  if (!/^\d*$/.test(phoneVal)) {
    setError("phoneError", "Only numeric digits are allowed.");
    return false;
  }
  if (!phoneRegex.test(phoneVal)) {
    setError("phoneError", "Phone must be exactly 10 numeric digits.");
    return false;
  }
  setError("phoneError", "");
  return true;
}

function validatePasswordLive() {
  const passVal = password.value.trim();
  if (passVal === "") {
    setError("passwordError", "Password cannot be empty.");
    return false;
  }

  const missing = [];
  if (passVal.length < 7) {
    missing.push("minimum 7 characters");
  }
  if (!/[A-Z]/.test(passVal)) {
    missing.push("1 uppercase letter");
  }
  if (!/\d/.test(passVal)) {
    missing.push("1 digit");
  }
  if (!/[&$#@]/.test(passVal)) {
    missing.push("1 special character (&,$,#,@)");
  }

  if (missing.length > 0) {
    setError("passwordError", `Missing: ${missing.join(", ")}`);
    return false;
  }

  if (!passwordRegex.test(passVal)) {
    setError("passwordError", "Min 7 chars, 1 uppercase, 1 digit, 1 special (&,$,#,@).");
    return false;
  }

  setError("passwordError", "");
  return true;
}

function validateConfirmPasswordLive() {
  const passVal = password.value.trim();
  const confirmVal = confirmPassword.value.trim();
  if (confirmVal === "") {
    setError("confirmPasswordError", "Confirm password cannot be empty.");
    return false;
  }
  if (passVal !== confirmVal) {
    setError("confirmPasswordError", "Passwords do not match.");
    return false;
  }
  setError("confirmPasswordError", "");
  return true;
}

username.addEventListener("input", validateUsernameLive);
email.addEventListener("input", validateEmailLive);
phone.addEventListener("input", validatePhoneLive);
password.addEventListener("input", () => {
  validatePasswordLive();
  if (confirmPassword.value.trim() !== "") {
    validateConfirmPasswordLive();
  }
});
confirmPassword.addEventListener("input", validateConfirmPasswordLive);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors();
  formSuccess.innerHTML = "";

  const isValid =
    validateUsernameLive() &&
    validateEmailLive() &&
    validatePhoneLive() &&
    validatePasswordLive() &&
    validateConfirmPasswordLive();

  if (isValid) {
    const userVal = username.value.trim();
    const emailVal = email.value.trim();
    const phoneVal = phone.value.trim();

    formSuccess.innerHTML = "Account created successfully.";
    registeredPanel.style.display = "block";
    registeredUsername.innerHTML = userVal;
    registeredEmail.innerHTML = emailVal;
    registeredPhone.innerHTML = phoneVal;
  } else {
    registeredPanel.style.display = "none";
  }
});

const changeTextBtn = document.getElementById("changeTextBtn");
const styleBtn = document.getElementById("styleBtn");
const imageBtn = document.getElementById("imageBtn");
const addNodeBtn = document.getElementById("addNodeBtn");
const deleteNodeBtn = document.getElementById("deleteNodeBtn");
const enhanceBtn = document.getElementById("enhanceBtn");

const domStatus = document.getElementById("domStatus");
const moveTarget = document.getElementById("moveTarget");
const profileImage = document.getElementById("profileImage");
const domList = document.getElementById("domList");

let moved = false;
let imageChanged = false;
let addCount = 3;
let panelHighlighted = false;

changeTextBtn.addEventListener("click", () => {
  const allListTags = domList.getElementsByTagName("li");
  if (allListTags.length > 0) {
    allListTags[0].innerHTML = "Pinned activity feed text updated";
  }
  domStatus.innerHTML = "Workspace feed text updated.";
});

styleBtn.addEventListener("click", () => {
  const items = document.getElementsByClassName("dom-item");
  for (let i = 0; i < items.length; i += 1) {
    items[i].style.color = "#00ffee";
  }

  moved = !moved;
  moveTarget.style.left = moved ? "80px" : "0px";
  moveTarget.style.color = moved ? "#00ffee" : "#e6e6e6";
  domStatus.innerHTML = "Skill tags highlighted and card position updated.";
});

imageBtn.addEventListener("click", () => {
  const svgData =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="420" height="320"><rect width="100%" height="100%" fill="#0f172a"/><text x="50%" y="50%" text-anchor="middle" fill="#00ffee" font-size="28" font-family="Courier New">Profile Swapped</text></svg>',
    );

  imageChanged = !imageChanged;
  profileImage.src = imageChanged ? svgData : "Profile .jpeg";
  domStatus.innerHTML = "Profile banner preview switched.";
});

addNodeBtn.addEventListener("click", () => {
  const listItem = document.createElement("li");
  listItem.className = "dom-item";
  const textNode = document.createTextNode(`Skill tag ${addCount} added`);
  listItem.appendChild(textNode);
  domList.appendChild(listItem);
  addCount += 1;
  domStatus.innerHTML = "New skill tag added to your profile.";
});

deleteNodeBtn.addEventListener("click", () => {
  if (domList.lastElementChild) {
    domList.removeChild(domList.lastElementChild);
    domStatus.innerHTML = "Last skill tag removed.";
  }
});

$("#enhanceBtn").on("click", () => {
  $("#submitBtn").text("Create Verified Account");
  $("#submitBtn").attr("data-mode", "enhanced");
  $("#submitBtn").attr("title", "Primary action upgraded");

  panelHighlighted = !panelHighlighted;
  $("#featurePanel").css(
    "background-image",
    panelHighlighted
      ? "linear-gradient(135deg, rgba(0,255,238,0.1), rgba(255,255,255,0.02))"
      : "none",
  );

  const jqData = `Preview ready for ${$("#username").val().trim() || "Guest"} | ${$("#email").val().trim() || "No email yet"}`;
  $("#domStatus").text(jqData);
});
