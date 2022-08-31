const phoneInputField = document.querySelector("#phonex");
const phoneInput = window.intlTelInput(phoneInputField, {
  hiddenInput: "full_phone",
  initialCountry: "ar",
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.0/js/utils.js",
});


