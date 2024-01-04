//Navbar aktif
const li = document.querySelectorAll('.nav-item');
const sec = document.querySelectorAll('section');

function activeMenu(){
    let len = sec.length;
    while(--len && window.scrollY+90 < sec[len].offsetTop){}
    li.forEach(ltx=>ltx.classList.remove('active'));
    li[len].classList.add('active');
}
activeMenu();
window.addEventListener('scroll',activeMenu)

//Toggle nav bar
const toggle = document.querySelector('.toggle input');
const nav = document.querySelector('nav ul');
toggle.addEventListener('click',function(){
    nav.classList.toggle('slide');
});

//Nav bar
window.onscroll = function(){scrollFunction()};
function scrollFunction(){
    var navbar = document.getElementById('navbar');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
        navbar.classList.add('scroll');
    }
    else{
        navbar.classList.remove('scroll');
    }
}

//Slider navbar img
var slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n){
    showSlides(slideIndex += n);
}
function currentSlides(n){
    showSlides(slideIndex = n);
}
function showSlides(n){
    var i;
    var slides = document.getElementsByClassName('slideshowslide');
    if (n > slides.length){slideIndex = 1};
    if (n < 1) {slideIndex = slides.length};
    for (i = 0; i <slides.length; i++){
        slides[i].style.display = 'none';
    }
    slides[slideIndex - 1].style.display = 'block';
}

//hubungi
document.getElementById('button-kirim').addEventListener('click',function(){
    let name = document.forms['form']['nama'].value;
    let email = document.forms['form']['email'].value;
    let nomor = document.forms['form']['nomor'].value;
    let pesan = document.forms['form']['pesan'].value;

    if (name!="" && email!="" && nomor!="" && pesan!=""){
        alert("Data sudah diterima, silahkan tunggu informasi selanjutnya. Terima kasih.");
    }
})


//Animation scroll
const anim = document.querySelectorAll('.anim');
window.addEventListener('scroll',check);
check()
function check(){
    const triggerBottom = window.innerHeight/5*4;
    anim.forEach((anim) => {
        const animTop = anim.getBoundingClientRect().top;
        if (animTop < triggerBottom){
            anim.classList.add('show')
        } else{
            anim.classList.remove('show');
        }
    })
}

//Percobaan konsep AI
const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('webcamButton');

// Mengecek apakah webcam diizinkan
function getUserMediaSupported() {
  return !!(navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia);
}

// Jika webcam diizinkan, tambahkan event listener pada button ketik user menekan tombol
if (getUserMediaSupported()) {
  enableWebcamButton.addEventListener('click', enableCam);
} else {
  console.warn('Mohon ijinkan akses kamera pada perangkat Anda');
}

function enableCam(event) {
}
//Mengaktifkan live cam dan projek model
function enableCam(event) {
  // Akan lanjut jika sudah selesai
  if (!model) {
    return;
  }
  // Sembunyikan button jika sudah ditekan
  event.target.classList.add('removed');  
  // Mendapatkan video user
  const constraints = {
    video: true
  };
  // Mengaktifkan stream
  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    video.srcObject = stream;
    video.addEventListener('loadeddata', predictWebcam);
  });
}
function predictWebcam() {
}
// Model sudah siap untuk lanjut step berikutnya
var model = true;
demosSection.classList.remove('invisible');
// Menyimpan data
var model = undefined;
cocoSsd.load().then(function (loadedModel) {
  model = loadedModel;
  demosSection.classList.remove('invisible');
});
var children = [];
function predictWebcam() {
  // Ini mengklasifikasi gambar
  model.detect(video).then(function (predictions) {
    for (let i = 0; i < children.length; i++) {
      liveView.removeChild(children[i]);
    }
    children.splice(0);
    for (let n = 0; n < predictions.length; n++) {
      // Jika klasifikasi lebih dari 66% maka akan ada gambar prediksi muncul
      if (predictions[n].score > 0.66) {
        const p = document.createElement('p');
        p.innerText = predictions[n].class  + ' - with ' 
            + Math.round(parseFloat(predictions[n].score) * 100) 
            + '% confidence.';
        p.style = 'margin-left: ' + predictions[n].bbox[0] + 'px; margin-top: '
            + (predictions[n].bbox[1] - 10) + 'px; width: ' 
            + (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';

        const highlighter = document.createElement('div');
        highlighter.setAttribute('class', 'highlighter');
        highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
            + predictions[n].bbox[1] + 'px; width: ' 
            + predictions[n].bbox[2] + 'px; height: '
            + predictions[n].bbox[3] + 'px;';

        liveView.appendChild(highlighter);
        liveView.appendChild(p);
        children.push(highlighter);
        children.push(p);
      }
    }
    window.requestAnimationFrame(predictWebcam);
  });
}