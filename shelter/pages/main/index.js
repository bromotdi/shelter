const ROUNDABOUT = document.getElementById('roundabout')
let counter = 0
let roundaboutType = true
let allPets = []

async function getPets() {
    const petsData = '../../assets/data/pets.json';
    const res = await fetch(petsData);
    const pets = await res.json();
    return pets
}

let pets = 0

getPets().then( item => {
    pets = item
    createPets()
    for (let i = 0; i < (ROUNDABOUT.children.length) ; i++) {
        activeCardEdit(i, 0)
    }
});

function createPets() {
    allPets = [pets[0], pets[1], pets[2]]
    let itemArray = [pets[3], pets[4], pets[5]]
    randomizePets(itemArray)
    itemArray = [pets[6], pets[7]]
    randomizePets(itemArray)
    for (let a = 0;a<5;a++){
        let itemArray = [pets[0], pets[1], pets[2]]
        randomizePets(itemArray)
        itemArray = [pets[3], pets[4], pets[5]]
        randomizePets(itemArray)
        itemArray = [pets[6], pets[7]]
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

function activeCardEdit(cardPosition, petsOffset) {
    for (let i = 0; i < (ROUNDABOUT.children[cardPosition].children.length) ; i++){
        let item = petsOffset+i;
        (item<0) ? item=(item%allPets.length+allPets.length) : item;
        (item >= allPets.length) ? item=item%allPets.length : item;
        ROUNDABOUT.children[cardPosition].children[i].children[0].src = allPets[item].img
        ROUNDABOUT.children[cardPosition].children[i].children[0].alt = allPets[item].type
        ROUNDABOUT.children[cardPosition].children[i].petId = item
        ROUNDABOUT.children[cardPosition].children[i].children[1].innerText = allPets[item].name
    }
}

function rndCounter(offset) {
    if (roundaboutType === false) {
        counter = counter +3;
        (counter>=allPets.length) ? counter = counter%allPets.length : counter;
    }
    if (roundaboutType === true) {
        counter = counter + offset
    }
}

btnLeft.onclick = function() {
    activeCardEdit(2,(counter))
    rndCounter(-3)
    activeCardEdit(1,(counter))
    btnRight.disabled = true
    btnLeft.disabled = true
    ROUNDABOUT.classList.add("transitionLeft")
}

btnRight.onclick = function() {
    activeCardEdit(0,counter)
    rndCounter(3)
    activeCardEdit(1,counter)
    btnRight.disabled = true
    btnLeft.disabled = true
    ROUNDABOUT.classList.add("transitionRight")
}

exitModalWindow.onclick = () => {
    modalWindow.style.display = "none"
    document.body.style.overflow = "auto"
    modalShadow.style.display = "none"
}

ROUNDABOUT.addEventListener('click', (e) => {
    if (e.target.closest('.pets_card') != null) {
        document.body.style.overflow = "hidden"
        modalWindow.style.display = "flex"
        modalShadow.style.display = "flex"
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

ROUNDABOUT.addEventListener("animationend", (animationEvent) => {
    ROUNDABOUT.classList.remove("transitionLeft")
    ROUNDABOUT.classList.remove("transitionRight")
    btnRight.disabled = false
    btnLeft.disabled = false
})

burgerShadow.onclick = () => {
    burgerShadow.style.display = "none"
}

burgerMenu.onclick = function() {
    if (burgerMenu.checked) {
        document.body.style.overflow = "hidden"
        burgerShadow.style.display = "flex"
        burgerShadow.style.cursor = "pointer"
        burgerShadow.style.zIndex = '-1'
        document.getElementById('logo').classList.add("logoBurger")
        document.getElementById('menuNav').addEventListener('click', () => {
            document.body.style.overflow = "auto"
            burgerShadow.style.display = "none"
            document.getElementById('logo').classList.remove("logoBurger")
            burgerMenu.checked = false
        })
    }

    else{
        document.body.style.overflow = "auto"
        document.getElementById('logo').classList.remove("logoBurger")
        burgerShadow.style.display = "none"
    }
}

console.log('Score: 110/110 \n Реализация burger menu на обеих страницах: +26 \n Реализация слайдера-карусели на странице Main: +36 \n Реализация пагинации на странице Pets: +36 \n Реализация попап на обеих страницах: +12 \n')
