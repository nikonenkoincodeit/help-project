import { firebaseConfig } from "./firebaseConfig.js";
firebase.initializeApp(firebaseConfig);

const errorRef = $(".js-error");
const heroRef = $(".js-hero");
const heroTitleRef = $(".js-hero-title");

const HIDDEN_ELEM_CLASS = "hidden";
const search = location.search;
let data = null;

if (search) {
  const id = search.split("=")[1];
  try {
    const playersRef = firebase.database().ref("events/" + id);
    playersRef.on("value", (snapshot) => {
      data = snapshot.val();
      checkAnswer(data);
    });
  } catch (error) {
    removeClassElem(errorRef);
  }
} else {
  removeClassElem(errorRef);
}

function removeClassElem(elem) {
  elem.removeClass(HIDDEN_ELEM_CLASS);
}

const alertRef = $(".js-alert");
const alertBtnRef = $(".js-alert-btn");

alertBtnRef.on("click", () => {
  alertRef.fadeOut(500);
});

const heroSubtitleRef = $(".js-hero-subtitle");
const mainSectionRef = $(".js-main-section");
const detailsRef = $(".js-details-input");
const urlInputRef = $(".js-url-input");
const href = location.href;

function checkAnswer(data) {
  if (!data) return removeClassElem(errorRef);
  removeClassElem(mainSectionRef);
  const { name, details, reason_raise } = data;
  urlInputRef.val(href);
  detailsRef.val(details);
  heroTitleRef.text(name);
  heroSubtitleRef.text(reason_raise);
}

const copyDetailsRef = $(".js-copy-details");
const copyUrlRef = $(".js-copy-url");

copyDetailsRef.on("click", () => {
  alertRef.fadeIn(500);
  copyText(detailsRef);
  hideAlert();
});

copyUrlRef.on("click", () => {
  alertRef.fadeIn(500);
  copyText(urlInputRef);
  hideAlert();
});

function copyText(elem) {
  elem.select();
  document.execCommand("copy");
}

function hideAlert() {
  setTimeout(() => {
    alertRef.fadeOut(500);
  }, 1000);
}
