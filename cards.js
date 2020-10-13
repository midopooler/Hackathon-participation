const url =
  "https://spreadsheets.google.com/feeds/list/1-cvS-r8_Xf9-CMedUa3BFR-2AulcdfCuzI8YswUR7hk/1/public/full?alt=json";
const cardsContainer = document.getElementById("cards_container");
const cards_section = document.getElementById("cards_section");
let data = [];
window.onload = fetchData;

function fetchData() {
  fetch(url)
    .then((res) => res.json())
    .then((result) => {
      data = result.feed.entry;
      console.log(data);
      setCards();
      cards_section.style.display = "block";
    })
    .catch((err) => {
      console.log(err);
    });
}

function parseKey(obj, key) {
  return obj["gsx$" + key].$t.trim() || "#";
}

function setCards() {
  let temp = "";
  data.forEach((e) => {
    temp += ` <div class="parentcardbox col-sm-6 col-md-4 col-lg-3"  data-aos="zoom-in">
   <div class="card">
     <h5 class="mb-3">${parseKey(e, "name")}</h5>
     <div class="card_body">
     <div>
       <i class="fa fa-calendar text-info" aria-hidden="true"></i>
       <span>${parseKey(e, "date")}
       </span>
     </div>
     <div>
       <i class="fa fa-map-marker text-danger" aria-hidden="true"></i>
       <span>${parseKey(e, "venue")}</span>
     </div>
     <div class="desc my-2">
       <p class="text-secondary m-0">Description:</p>
       <span>${parseKey(e, "description")}</span>
     </div>
     <a href=${parseKey(e, "link")} class="text-center d-block" target="_blank">
       <i
         class="fa fa-external-link text-primary"
         aria-hidden="true"
       ></i>
     </a>
     </div>
   </div>
 </div>`;
  });

  cardsContainer.innerHTML = temp;
}
