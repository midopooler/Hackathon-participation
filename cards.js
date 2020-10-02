const url = "https://spreadsheets.google.com/feeds/list/1-cvS-r8_Xf9-CMedUa3BFR-2AulcdfCuzI8YswUR7hk/1/public/full?alt=json";
const cardsContainer = document.getElementById("cards_container")
let data = []
window.onload = fetchData

function fetchData() {
    fetch(url)
        .then((res) => res.json())
        .then((result) => {
            data = result.feed.entry;
            console.log(data)
            setCards()
        })
        .catch((err) => {
            console.log(err);
        });
}

function parseKey(obj, key) {
    return obj["gsx$" + key].$t.trim();
}

function setCards() {
    let temp = "";
    data.forEach(e => {
        temp += ` <a class="col-sm-6 col-md-4 col-lg-3" href=${parseKey(e,"link")} data-aos="zoom-in" target="_blank">
   <div class="border card">
     <h5 class="mb-3">${parseKey(e,"name")}</h5>
     <div>
       <i class="fa fa-calendar text-info" aria-hidden="true"></i>${parseKey(e,"date")}
     </div>
     <div>
       <i class="fa fa-map-marker text-danger" aria-hidden="true"></i>
       ${parseKey(e,"venue")}
     </div>
     <div class="desc my-2">
       <p class="text-secondary m-0">Description:</p>
       <span>${parseKey(e,"description")}</span>
     </div>
     <div class="text-center">
       <i
         class="fa fa-external-link text-primary"
         aria-hidden="true"
       ></i>
     </div>
   </div>
 </a>`
    })

    cardsContainer.innerHTML = temp
}