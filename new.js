function myFetch() {
    document.addEventListener("DOMContentLoaded", (event) => {
        fetch("./data.json")
            .then((response) => response.json())
            .then((data) => addClothes(data, 0))
            .catch((error) => console.log("Error: " + error));
    });
}

function sortLowToHigh() {
    fetch("./data.json")
        .then((response) => response.json())
        .then((data) => addClothes(data, 1))
        .catch((error) => console.log("Error: " + error));
}

function sortHighToLow() {
    fetch("./data.json")
        .then((response) => response.json())
        .then((data) => addClothes(data, 2))
        .catch((error) => console.log("Error: " + error));
}

function addClothes(data, sort) {
    let clothesArr = [];
    for (let i of data) {
        if (i.secondHand == false) {
            clothesArr.push({ price: i.price, frontImage: i.frontImage, backImage: i.backImage, item: i.item, description: i.description, secondHand: i.secondHand });
        }
    }

    let mainContainer = document.getElementById("clothes");
    mainContainer.innerHTML = "";
    //create sorted array
    let sortedClothes = [];
    if (sort === 0) { //not sorted
        sortedClothes = clothesArr;
    } else if (sort === 1) { // sorted price low to high
        sortedClothes = clothesArr.sort((p1, p2) => (p1.price > p2.price) ? 1 : (p1.price < p2.price) ? -1 : 0);
    } else if (sort === 2) { // sorted price high to low
        sortedClothes = clothesArr.sort((p1, p2) => (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0);
    }
    for (let i of sortedClothes) {
        let item = i.item;
        let frontImage = i.frontImage;
        let description = i.description;
        let price = i.price;
        let secondHand = i.secondHand;


        let div = document.createElement("div");
        // Using Bootstrap Card component
        div.classList.add("col-sm-6", "col-md-4", "col-lg-3");
        div.innerHTML = `
        <div class="card mb-4" style="width": %100;>
            <img src=${frontImage} class="card-img-top" alt="clothing item" width="100" height="250" onmousemove="change(this)" onmouseleave="changeBack(this)"/>
            <div class="card-body">
                <h5 class="card-title">${item}</h5>
                <p class="cad-text">
                <strong>Description:</strong> ${description} <br>
                <strong>Price:</strong> $${price}
                </p>
            </div>
        </div>
        `;
        mainContainer.appendChild(div);
    }
}

function change(x) {
    imgString = x.src;
    if (imgString.includes("front.jpg")) {
        start = imgString.indexOf("/images");
        end = imgString.indexOf("front.jpg");
        backImage = "." + imgString.substring(start, end) + "back.jpg";
        x.src = backImage;

    }
}

function changeBack(x) {
    imgString = x.src;
    start = imgString.indexOf("/images");
    end = imgString.indexOf("back.jpg");
    backImage = "." + imgString.substring(start, end) + "front.jpg";
    x.src = backImage;
}

myFetch();
