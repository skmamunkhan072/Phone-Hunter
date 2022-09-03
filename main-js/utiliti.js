const dataLode = async (srechValue) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${srechValue}`;
  const res = await fetch(url);
  const data = await res.json();
  const worning = document.getElementById("worning");
  if (data.data.length === 0) {
    worning.classList.remove("d-none");
    isLoding(false);
  } else {
    worning.classList.add("d-none");
  }
  return data.data;
};

const cardDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.data;
};
const lodData = async (serchText) => {
  const data = dataLode(serchText);
  const apiData = await data;
  const showAllBtn = document.getElementById("show-All");
  if (apiData.length > 1) {
    const data = apiData.slice(0, 8);
    showAllBtn.classList.remove("d-none");
    card(data);
  }
};

const isLoding = (bullin) => {
  const windwoLode = document.getElementById("windwo-lod-container");
  if (bullin === true) {
    windwoLode.classList.remove("d-none");
  } else {
    windwoLode.classList.add("d-none");
  }
};

document.getElementById("show-All").addEventListener("click", async (e) => {
  e.target.classList.add("d-none");
  isLoding(true);
  const data = dataLode("apple");
  const apiData = await data;
  card(apiData);
});
const card = (data) => {
  const getCardContainer = document.getElementById("card-container");
  getCardContainer.innerHTML = "";
  data.forEach((data) => {
    creatCard(data);
  });
};

const creatCard = (data) => {
  const { brand, image, phone_name, slug } = data;
  const getCardContainer = document.getElementById("card-container");
  const cardWraper = document.createElement("div");
  cardWraper.classList.add("col");
  cardWraper.innerHTML = `
        <div class="card">
        <div   data-bs-toggle="modal"
        data-bs-target="#staticBackdrop">
        <img onclick="cardClick('${slug}')"  src="${
    image ? image : "../img/No.png"
  }" class="card-img-top" alt="Phone Phg">
        </div>
            <div class="card-body">
              <h5 class="card-title">Phone Name: <br> <span>${phone_name}</span></h5>
              <h6 class="card-title">Brand Name: ${brand}</h6>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in .</p>
            </div>
        </div>
  `;
  getCardContainer.appendChild(cardWraper);
  isLoding(false);
};
const cardClick = async (id) => {
  const data = await cardDetails(id);
  console.log(data);
  const NoDetails = "NO Details";
  const { brand, image, name, mainFeatures, others } = data;
  const { displaySize, memory } = mainFeatures;
  const { Bluetooth, USB, WLAN } = others ? others : NoDetails;
  document.getElementById("modal-taitle").innerText = `${name}`;
  const modalBodyContainer = document.getElementById("model-body-container");
  modalBodyContainer.innerHTML = ``;
  const modalContant = document.createElement("div");
  modalContant.innerHTML = `
          <div class="text-center">
          <img class="mb-4" src="${image}" alt="">
          </div>
          <div>
            <h5 class="mb-2">Brand Name: ${brand ? brand : NoDetails}</h5>
            <p class="mb-1">Display Size: ${
              displaySize ? displaySize : NoDetails
            }</p>
            <p class="mb-1">MOmori: ${memory ? memory : NoDetails}</p>
            <p class="mb-1">Bluetooth: ${Bluetooth ? Bluetooth : NoDetails}</p>
            <p class="mb-1">USB: ${USB ? USB : NoDetails}</p>
            <p class="mb-1">Wlan: ${WLAN ? WLAN : NoDetails}</p>
          </div>

  `;
  modalBodyContainer.appendChild(modalContant);
};
