const coordinates = {
    "sanJuan" : {
        "lat": 16.682427,
        "lng": 120.337279
    },
    "baler": {
        "lat": 16.682427,
        "lng": 120.337279
    }
}
const params = ["seaLevel","swellDirection","swellHeight","swellPeriod","secondarySwellPeriod","secondarySwellDirection","secondarySwellHeight","waterTemperature","waveDirection","waveHeight","wavePeriod"];

const selectButton = document.querySelector(".select-location");
// const header = document.querySelector(".header-base");
const sanJuan = document.querySelector(".san-juan");
const card = document.querySelector(".card");
const infoButton = document.querySelector(".info-icon");
const mainContainer = document.querySelector(".container");
const headerContainer = document.querySelector(".header-container");
const cardContainer = document.querySelector(".card-container");

const headerCode = `
    <h1 class="display-1 header-top">Surf</h1>
    <h1 class="display-1 header-bottom">Check</h1>
`;

//Setup screen width condition on when to move info icon.
console.log(screen.width);

class Header {
    constructor() {
        this.elementContent = `<h1 class="display-1 header-top">Surf</h1> 
        <h1 class="display-1 header-bottom">Check</h1>
        `;
        this.state = false;
        this.currentDOM;
    }
    createLogo() {
        //This function adds the logo/header element to the DOM.
        let headerCreate = document.createElement("div");
        headerCreate.className = "jumbotron header-base";
        headerCreate.innerHTML = this.elementContent;
        headerContainer.appendChild(headerCreate);
    }
    hideLogo() {
        //This function removes show header class then removes from the DOM.
        this.checkLogoState();
        if (this.state) {

            function timeOut(element, time) {
                setTimeout(()=> {
                    element.remove();
                }, time);
            }

            this.getElement();
            headerContainer.classList.remove("header-show");
            timeOut(this.currentDOM, 200);
        }
    }
    showLogo() {
        //This function adds show class to the header-container element
        if (!this.state) {
            this.createLogo();
            headerContainer.classList.add("header-show");
        }
    }
    checkLogoState() {
        //This function checks if the logo is in the DOM. Sets a boolean value to the constructor.
        let headerContainer = document.querySelector(".header-container");
        if (headerContainer.firstChild) {
            this.state = true;
        } else {
            this.state = false;
        }
    }
    getElement() {
        //This function gets the latest element from DOM. Update contructor attribute.
        const header = document.querySelector(".header-base");
        this.currentDOM = header;
    }
}

class CardBase {
    constructor(cardTitle, waveDirection, time, waveHeightRange) {
        this.cardElement = `
                <div class="card-body">
                    <h5 class="card-title">${cardTitle}</h5>
                    <i class="fa-solid fa-location-arrow wave-direction"></i>
                    <p class="card-text">${waveDirection}</p>
                    <h2 class="card-title"><strong>${time}</strong></h1>
                    <p class="card-text">${waveHeightRange}</p>
                </div>
        `;
        this.contents;
        this.state = false;
    }
    createCard() {
        let cardContainer = document.querySelector(".card-container");
        let cardCreate = document.createElement("div");
        cardCreate.classList.add("card");
        cardCreate.innerHTML = this.cardElement;
        cardContainer.appendChild(cardCreate);
    }
    show() {
        let cardContainer = document.querySelector(".card-container");
        cardContainer.classList.add("card-show");
    }
    hide() {
        this.checkState();
        if (this.state) {
            let cardContainer = document.querySelector(".card-container");
            cardContainer.classList.remove("card-show");
            // this.removeCard();
        }   
        
    }
    removeCard() {
        let card = document.querySelector(".card");
        card.remove();
    }
    checkState() {
        //This functions checks if the element is currently in the DOM.
        let cardContainer = document.querySelector(".card-container");
        if (cardContainer.firstChild) {
            this.state = true;
        } else {
            this.state = false;
        }
    }
}

class InfoCard extends CardBase {
    constructor() {
        this.contents;
    }
}

const headerMain = new Header();
let sanJuanCard = new CardBase("San Juan, La Union", "South East", "8:00 AM", "0.3-0.4m");
let balerCard = new CardBase("Baler, Aurora", "South East", "8:00 AM", "0.3-0.4m");
let cloud9Card = new CardBase("Cloud 9, Siargao", "South East", "8:00 AM", "0.3-0.4m");

infoButton.addEventListener("mouseenter", (e) => {
    console.log("Mouse hover at info icon.");
});

window.addEventListener("load", (e) => {
    //Configure logo to show up with animation
    headerMain.showLogo();
    headerMain.checkLogoState();
    fetchData().then((data) => {
        console.log(data);
    });
})

//Update event listener 
document.addEventListener("click", (e) => {

    if (e.target.className === "dropdown-item san-juan") {

        headerMain.hideLogo();
        if (cardContainer.firstChild) {
            let card = cardContainer.firstChild;
            cardContainer.classList.add("card-hide");
            cardContainer.classList.remove("card-show");
            card.remove();
        }
        
        setTimeout(() => {
            cardContainer.classList.remove("card-hide");
            sanJuanCard.createCard();
            sanJuanCard.show();
        }, 500);
        selectButton.innerText = e.target.innerText;

    } else if (e.target.className === "dropdown-item baler") {
        
        headerMain.hideLogo();
        if (cardContainer.firstChild) {
            let card = cardContainer.firstChild;
            cardContainer.classList.add("card-hide");
            cardContainer.classList.remove("card-show");
            card.remove();
        }
        setTimeout(() => {
            cardContainer.classList.remove("card-hide");
            balerCard.createCard();
            balerCard.show();
        }, 500);
        selectButton.innerText = e.target.innerText;

    } 
    else if (e.target.className === "dropdown-item cloud-9") {
        
        headerMain.hideLogo();
        if (cardContainer.firstChild) {
            let card = cardContainer.firstChild;
            cardContainer.classList.add("card-hide");
            cardContainer.classList.remove("card-show");
            card.remove();
        }
        setTimeout(() => {
            cardContainer.classList.remove("card-hide");
            cloud9Card.createCard();
            cloud9Card.show();
        }, 500);
        selectButton.innerText = e.target.innerText;
        
    } 
});


async function fetchData() {
    let response = await fetch("https://pacific-citadel-61643.herokuapp.com/data")
    let data = await response.json();
    return Promise.resolve(data);

    // .then((res) => {
    //     // console.log("On-going");
    //     return res.json();
    // })
    // .then((data) => {
    //     // console.log(JSON.stringify(data));
    //     return JSON.stringify(data);
    // })
    // return Promise.resolve(data);
}

// fetch(`https://api.stormglass.io/v2/weather/point?lat=${coordinates.sanJuan.lat}&lng=${coordinates.sanJuan.lng}&params=${params}`, {
//   headers: {
//     'Authorization': apiKey
//     }
//     })
//     .then((res) => {
//         return res.json();
//     })
//     .then((data)=> {
//         console.log(JSON.stringify(data));
//     })

// fetch(`https://api.stormglass.io/v2/tide/sea-level/point?lat=${coordinates.sanJuan.lat}&lng=${coordinates.sanJuan.lng}`, {
//   headers: {
//     'Authorization': apiKey
//   }
// }).then((response) => response.json()).then((jsonData) => {
//     console.log(JSON.stringify(jsonData));
// });