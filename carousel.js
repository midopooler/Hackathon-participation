let apiurl =
  "https://spreadsheets.google.com/feeds/list/1zzlJAXOy3OZdHm9U29Gose7GB1IfYp64NCW7NP47iTk/1/public/full?alt=json";
let slideIndex = 0;
const slideTimeInterval = 3000;
const carContainer = document.querySelector(".carousel_container");
const dots = document.querySelector(".dots");

function fetchApiData() {
  fetch(apiurl)
    .then((res) => res.json())
    .then((result) => {
      let data = result.feed.entry;
      console.log(data);
      setCarouselImages(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

fetchApiData();
function setCarouselImages(data = []) {
  let temp = "";

  data.forEach((d, i) => {
    console.log(i);
    temp += `<div class="caro_image fadeIn">
    <img src=${extractor(parseKey(d, "images"))} />
  </div>`;
    dots.innerHTML += `<div class="dot" onclick="setSlide(${i})"></div>`;
  });

  carContainer.innerHTML += temp;
  setSlide(slideIndex);
  setInterval(() => setSlide(slideIndex + 1), slideTimeInterval);
}
function parseKey(obj, key) {
  return obj["gsx$" + key].$t.trim();
}

function moveSlide(m) {
  setSlide((slideIndex += m));
}

function setSlide(n) {
  const slides = document.getElementsByClassName("caro_image");
  const dots = document.getElementsByClassName("dot");
  if (n == -1) slideIndex = slides.length - 1;
  else if (n == slides.length) slideIndex = 0;
  else slideIndex = n;

  Array.from(slides).forEach((s) => {
    s.style.display = "none";
  });
  Array.from(dots).forEach((d) => {
    d.classList.remove("active_dot");
  });

  console.log(n, slideIndex, slides);
  slides[slideIndex].style.display = "block";
  dots[slideIndex].classList.add("active_dot");
}

function extractor(url_id) {
  console.log(url_id);
  if (url_id) {
    if (url_id.search("google.com") != -1) {
      var id = url_id.split("/");
      console.log(id);
      var url = "https://drive.google.com/thumbnail?id=" + id[5];
    } else url = url_id;

    return url;
  } else
    return "https://drive.google.com/thumbnail?id=1mz35ArVCMbBHQTXebpm2OWFoTvTMrkXA";
}
