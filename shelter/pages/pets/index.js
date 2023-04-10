const ROUNDABOUT = document.getElementById('roundabout')
let counter = 1, cardsQuantity, allPets

(window.matchMedia("(min-width: 1280px)").matches)?(cardsQuantity = 8):(window.matchMedia("(max-width: 767px)").matches?cardsQuantity = 3:cardsQuantity = 6)
async function getPets() {
    const petsData = '../../assets/data/pets.json';
    const res = await fetch(petsData);
    const pets = await res.json();
    return pets
}

let pets = 0

getPets().then(item => {
    pets = item
    createPets()
    cardEdit()
});

function cardEdit() {
    for (let i = 0; i < (cardsQuantity) ; i++) {
        ROUNDABOUT.children[i].children[0].src = allPets[i+(counter-1)*cardsQuantity].img
        ROUNDABOUT.children[i].children[0].alt = allPets[i+(counter-1)*cardsQuantity].type
        ROUNDABOUT.children[i].petId = (i+(counter-1)*cardsQuantity)
        ROUNDABOUT.children[i].children[1].innerText = allPets[i+(counter-1)*cardsQuantity].name
    }
}

function createPets() {
    allPets = [...pets]
    for (let a = 0;a<5;a++){
        let itemArray = [allPets[0], allPets[1], allPets[2]]
        randomizePets(itemArray)
        itemArray = [allPets[3], allPets[4], allPets[5]]
        randomizePets(itemArray)
        itemArray = [allPets[6], allPets[7]]
        randomizePets(itemArray)
    }
}

function randomizePets(itemArray) {
    for (let i = itemArray.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [itemArray[i], itemArray[j]] = [itemArray[j], itemArray[i]];
        allPets.push(itemArray[i])
    }
}

window.addEventListener('resize', () => {
    const item = cardsQuantity;
    (window.matchMedia("(min-width: 1280px)").matches)?(cardsQuantity = 8):(window.matchMedia("(max-width: 767px)").matches?cardsQuantity = 3:cardsQuantity = 6)
    if (item !== cardsQuantity) {
        counter = 1
        cardEdit()
        document.getElementById('currentButton').innerHTML = counter
        prev.disabled = true
        toStart.disabled = true
        next.disabled = false
        toEnd.disabled = false
    }
})

exitModalWindow.onclick = () => {
    modalWindow.style.display = "none"
    document.body.style.overflow = "auto"
    modalshadow.style.display = "none"
}

ROUNDABOUT.addEventListener('click', (e) => {
    if (e.target.closest('.pets_card') != null) {
        document.body.style.overflow = "hidden"
        modalWindow.style.display = "flex"
        modalshadow.style.display = "flex"
        const item = e.target.closest('.pets_card').petId
        modalWindow.children[1].children[0].src = allPets[item].img
        modalWindow.children[1].children[0].alt = allPets[item].type
        modalWindow.children[2].children[0].innerText = allPets[item].name
        modalWindow.children[2].children[1].innerText = allPets[item].type + " - " + allPets[item].breed
        modalWindow.children[2].children[2].innerText = allPets[item].description
        modalWindow.children[2].children[3].children[0].children[1].innerText = allPets[item].age
        modalWindow.children[2].children[3].children[1].children[1].innerText = allPets[item].inoculations.join(', ')
        modalWindow.children[2].children[3].children[2].children[1].innerText = allPets[item].diseases.join(', ')
        modalWindow.children[2].children[3].children[3].children[1].innerText = allPets[item].parasites.join(', ')
    }
})

burgerShadow.onclick = () => {
    burgerShadow.style.display = "none"
}

burgerMenu.onclick = function() {
    if (burgerMenu.checked){
        document.body.style.overflow = "hidden"
        burgerShadow.style.display = "flex"
        burgerShadow.style.cursor = "pointer"
        burgerShadow.style.zIndex = '-1'
        document.getElementById('logo').classList.add("logoBurger")
        document.getElementById('menuNav').classList.add("petsNavMenu")
        document.getElementById('menuNav').addEventListener('click', ()=>{
            document.body.style.overflow = "auto"
            burgerShadow.style.display = "none"
            document.getElementById('logo').classList.remove("logoBurger")
            burgerMenu.checked = false
        })
    }

    else {
        document.body.style.overflow = "auto"
        document.getElementById('logo').classList.remove("logoBurger")
        document.getElementById('menuNav').classList.remove("petsNavMenu")
        burgerShadow.style.display = "none"
    }
}

toStart.onclick = function() {
    counter = 1
    cardEdit()
    document.getElementById('currentButton').innerHTML = counter
    prev.disabled = true
    toStart.disabled = true
    next.disabled = false
    toEnd.disabled = false
}

prev.onclick = function() {
    counter--
    cardEdit()
    document.getElementById('currentButton').innerHTML = counter
    if (counter === 1) {
        prev.disabled = true
        toStart.disabled = true
    }
    if (counter < (allPets.length/cardsQuantity)) {
        next.disabled = false
        toEnd.disabled = false
    }
}

next.onclick = function() {
    counter++
    cardEdit()
    document.getElementById('currentButton').innerHTML = counter
    if (counter > 1) {
        prev.disabled = false
        toStart.disabled = false
    }
    if (counter === (allPets.length/cardsQuantity)) {
        next.disabled = true
        toEnd.disabled = true
    }
}

toEnd.onclick = function() {
    counter = (allPets.length/cardsQuantity)
    cardEdit()
    document.getElementById('currentButton').innerHTML = counter
    next.disabled = true
    toEnd.disabled = true
    prev.disabled = false
    toStart.disabled = false
}

console.log('Score: 110/110 \n Реализация burger menu на обеих страницах: +26 \n Реализация слайдера-карусели на странице Main: +36 \n Реализация пагинации на странице Pets: +36 \n Реализация попап на обеих страницах: +12 \n')

