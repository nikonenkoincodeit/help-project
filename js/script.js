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
    return result.classList.add("error");
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

console.log(
  ' location.href = location.pathname + "/page.html?id="  :>> ',
  (location.href = location.pathname + "/page.html?id=")
);

function sendDataFirebase(data) {
  try {
    const playersRef = firebase.database().ref("events/");

    playersRef.push(data).then((data) => {
      location.href = location.pathname + "/page.html?id=" + data.key;
    });
  } catch (error) {
    console.log(error);
  }
}
