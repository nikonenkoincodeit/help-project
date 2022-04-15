import { firebaseConfig } from "./firebaseConfig.js";

const sectionFormRef = $(".js-section-form");
const scrollBtnRef = $(".js-scroll-btn");
const formRef = $(".js-form");
const bodyRef = $("html, body");
const formControlRef = $(".js-form-control");

firebase.initializeApp(firebaseConfig);

scrollBtnRef.on("click", () => {
  bodyRef
    .stop()
    .animate(
      { scrollTop: sectionFormRef[0].offsetTop },
      1000,
      "swing",
      function () {
        const result = checkForm();
        if (result) result.focus();
      }
    );
});

formRef.on("submit", (e) => {
  e.preventDefault();
  const result = checkForm();
  if (result) {
    return result.classList.add("error-style");
  }

  const formData = new FormData(e.target);
  const obj = {};
  formData.forEach((val, key) => {
    obj[key] = val;
  });
  e.target.reset();
  sendDataFirebase(obj);
});

formControlRef.on("input", (e) => {
  e.target.classList.remove("error-style");
});

function checkForm() {
  for (let i = 0; i < formControlRef.length; i++) {
    const element = formControlRef[i];
    if (!element.value.trim()) {
      return element;
    }
  }
  return false;
}

const textInput = "Збираю на: ";

function sendDataFirebase(data) {
  data.reason_raise = data.reason_raise.replace(textInput, "");
  try {
    const playersRef = firebase.database().ref("events/");

    playersRef.push(data).then((data) => {
      let url = location.href;
      url = url.replace("index.html", "");
      location.href = url + "page.html?id=" + data.key;
    });
  } catch (error) {
    console.log(error);
  }
}

const reasonRaiseRef = $('[name="reason_raise"]');
let flag = true;

reasonRaiseRef.on("focus", () => {
  if (!flag) return;
  setTimeout(() => {
    reasonRaiseRef.val(textInput);
    reasonRaiseRef[0].selectionStart = textInput.length;
  }, 50);
  flag = false;
});
