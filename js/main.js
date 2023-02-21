
'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('step-1', 'step-1.html',true),            
            new Route('step-2', 'step-2.html'),
            new Route('step-3', 'step-3.html'),
            new Route('step-4', 'step-4.html'),
            new Route('step-5', 'step-5.html'),
        ]);
    }
    init();
}());

$(document).on("click",".sidebar-link" ,function(){
    window.scrollTo(0,0);
});

function initMenuAnchor(){
    $(window).unbind('scroll');
    // $window.scrollTo(0,0);
    $('#container').MenuAnchor();
}

// open sidebar


$(document).on("click",".sidebar-button" ,function(){
    $('.theme-container').toggleClass('sidebar-open')
});
// close sidebar    


$(document).on("click",".click-modal" ,function(event){
    $('.modal').toggleClass('active')
    $('body').toggleClass('no-scroll')
});



const form = document.forms["form"];
const formArr = Array.from(form);
const validFormArr = [];
const button = form.elements["button"];

formArr.forEach((el) => {
  if (el.hasAttribute("data-reg")) {
    el.setAttribute("is-valid", "0");
    validFormArr.push(el);
  }
});

form.addEventListener("input", inputHandler);
form.addEventListener("submit", formCheck);

function inputHandler({ target }) {
  if (target.hasAttribute("data-reg")) {
    inputCheck(target);
  }
}

function inputCheck(el) {
  const inputValue = el.value;
  const inputReg = el.getAttribute("data-reg");
  const reg = new RegExp(inputReg);
  if (reg.test(inputValue)) {
    el.setAttribute("is-valid", "1");
    el.style.border = "2px solid rgb(0, 196, 0)";
  } else {
    el.setAttribute("is-valid", "0");
    el.style.border = "2px solid rgb(255, 0, 0)";
  }
}

function formCheck(e) {
  e.preventDefault();
  const allValid = [];
  validFormArr.forEach((el) => {
    allValid.push(el.getAttribute("is-valid"));
  });
  const isAllValid = allValid.reduce((acc, current) => {
    return acc && current;
  });
  if (!Boolean(Number(isAllValid))) {
    alert("Заполните поля правильно!");
    return;
  }
  formSubmit();
}

async function formSubmit() {
  const data = serializeForm(form);
  const response = await sendData(data);
  if (response.ok) {
    let result = await response.json();
    alert(result.message);
    formReset();
  } else {
    alert("Код ошибки: " + response.status);
  }
}

function serializeForm(formNode) {
  return new FormData(form);
}

async function sendData(data) {
  return await fetch("send_mail.php", {
    method: "POST",
    body: data,
  });
}

function formReset() {
  form.reset();
  validFormArr.forEach((el) => {
    el.setAttribute("is-valid", 0);
    el.style.border = "none";
  });
}






