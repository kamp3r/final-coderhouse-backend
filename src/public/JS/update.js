const phoneInputUpdate = document.getElementById("phoneupdate");
const phoneUpdate = window.intlTelInput(phoneInputUpdate, {
  hiddenInput: "full_phone",
  initialCountry: "ar",
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.0/js/utils.js",
});
