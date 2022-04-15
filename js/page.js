import { firebaseConfig } from "./firebaseConfig.js";
firebase.initializeApp(firebaseConfig);

const errorRef = $(".js-error");
const heroRef = $(".js-hero");
const heroTitleRef = $(".js-hero-title");
const boxSpinierRef = $(".js-box-spinier");

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
      hideSpinier();
    });
  } catch (error) {
    removeClassElem(errorRef);
    hideSpinier();
  }
} else {
  removeClassElem(errorRef);
  hideSpinier();
}

function removeClassElem(elem) {
  elem.removeClass(HIDDEN_ELEM_CLASS);
}

function hideSpinier() {
  boxSpinierRef.fadeOut(100);
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
const alertTitleRef = $(".js-alert-title");
const alertTextRef = $(".js-alert-text");
const copyUrlRef = $(".js-copy-url");

const message1 = "Тепер ви можете поділитися ним у соцмережах.";
const message2 = "Тепер ви можете зробити переказ за вірними реквізитами.";
const title1 = "Посилання скопійовано!";
const title2 = "Реквізити скопійовані!";

copyDetailsRef.on("click", () => {
  alertTextRef.text(message2);
  alertTitleRef.text(title2);
  alertRef.fadeIn(500);
  copyText(detailsRef);
  hideAlert();
});

copyUrlRef.on("click", () => {
  alertTextRef.text(message1);
  alertTitleRef.text(title1);
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
  }, 3000);
}
