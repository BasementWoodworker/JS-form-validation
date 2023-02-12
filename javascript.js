function createElementWithIDAndContent(elemType, ID, content) {
  const temp = document.createElement(elemType);
  temp.id = ID;
  temp.textContent = content;
  return temp;
}

const Constraint = function(regExp, ErrMsg) {
  this.regExp = regExp;
  this.ErrMsg = ErrMsg;
}

const constraints = {
  email: new Constraint(new RegExp(/.*@.*\.(...|..)/), "Incorrect email. Examples: asd@gmail.com, a@b.de"),
  zip: {
    Canada: new Constraint(new RegExp(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/), "Incorrect ZIP. Example: A1B-4Z5"),
    USA: new Constraint(new RegExp(/^\d{5}(?:[-\s]\d{4})?$/), "Incorrecct ZIP. Example: 12345 1234"),
    Switzerland: new Constraint(new RegExp(/^(CH-)?\\d{4}$/), "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950"),
    France: new Constraint(new RegExp(/^(F-)?\\d{5}$/), "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012"),
    Germany: new Constraint(new RegExp(/^(D-)?\\d{5}$/), "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345"),
    Netherlands: new Constraint(new RegExp(/^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$/), "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS"),
  },
  password: new Constraint(new RegExp(/......+/), "Password should be at least 6 characters long")
}

function checkEmail() {
  (constraints.email.regExp.test(emailInput.value) || emailInput.value === "") ?
    emailInput.setCustomValidity("") :
    emailInput.setCustomValidity(constraints.email.ErrMsg);
}

function checkZIP() {
  const countryConstraint = constraints.zip[countryInput.value];
  (countryConstraint.regExp.test(zipInput.value) || zipInput.value === "") ?
    zipInput.setCustomValidity("") :
    zipInput.setCustomValidity(countryConstraint.ErrMsg);
}

function checkPassword() {
  (constraints.password.regExp.test(pwInput.value) || pwInput.value === "") ?
    pwInput.setCustomValidity("") :
    pwInput.setCustomValidity(constraints.password.ErrMsg);
}

function checkPasswordMatch() {
  ((pwInput.value === pwConfirmationInput.value) || pwConfirmationInput.value === "") ?
    pwConfirmationInput.setCustomValidity("") :
    pwConfirmationInput.setCustomValidity("Passwords don't match");
}

const form = document.createElement("form");
const emailLabel = createElementWithIDAndContent("label", "email-label", "Email");
const emailInput = createElementWithIDAndContent("input", "email", "");
const countryLabel = createElementWithIDAndContent("label", "country-label", "Country");
const countryInput = createElementWithIDAndContent("select", "country", "");
const zipLabel = createElementWithIDAndContent("label", "zip-label", "ZIP Code");
const zipInput = createElementWithIDAndContent("input", "zip", "")
const pwLabel = createElementWithIDAndContent("label", "password-lable", "Password");
const pwInput = createElementWithIDAndContent("input", "password", "");
const pwConfirmationLabel = createElementWithIDAndContent("label", "password-confirmation-lable", "Confirm password");
const pwConfirmationInput = createElementWithIDAndContent("input", "password-confirmation", "");
const submitButton = createElementWithIDAndContent("button", "submit-button", "Submit");
const submitResult = createElementWithIDAndContent("div", "submit-result", "");

emailLabel.setAttribute("for", "email");
countryLabel.setAttribute("for", "country");
zipLabel.setAttribute("for", "zip");
pwLabel.setAttribute("for", "password");
pwConfirmationLabel.setAttribute("for", "password-confirmation");

countryInput.innerHTML = `
<option value = "Canada">Canada</option>
<option value = "USA">USA</option>
<option value = "Switzerland">Switzerland</option>
<option value = "France">France</option>
<option value = "Germany">Germany</option>
<option value = "Netherlands">The Netherlands</option>
`;

document.body.appendChild(form);
form.append(
  emailLabel,
  emailInput,
  countryLabel,
  countryInput,
  zipLabel,
  zipInput,
  pwLabel,
  pwInput,
  pwConfirmationLabel,
  pwConfirmationInput,
  submitButton,
  submitResult
)

document.querySelectorAll("input").forEach(input => {
  input.setAttribute("required", "");
  input.setAttribute("placeholder", " ");
});

emailInput.oninput = checkEmail;
countryInput.onchange = checkZIP;
zipInput.oninput = checkZIP;
pwInput.oninput = () => {
  checkPassword();
  checkPasswordMatch();
};
pwConfirmationInput.oninput = checkPasswordMatch;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitResult.textContent = "Form is valid ✔️";
  setTimeout(() => submitResult.textContent = "", 3000);
})