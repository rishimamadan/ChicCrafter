let currentCategory = '';
let selectedShirt = null;
let selectedShorts = null;
let selectedPants = null;
let selectedSuit = null;

function toggleOptions(optionsId, avatarId) {
    // Hide all options
    document.getElementById('men-options').classList.add('hidden');
    document.getElementById('women-options').classList.add('hidden');
    
    // Show the selected options if optionsId is not empty
    if (optionsId) {
        document.getElementById(optionsId).classList.remove('hidden');
    }
    
    // Hide all avatars
    document.getElementById('men-avatar').classList.add('hidden');
    document.getElementById('women-avatar').classList.add('hidden');
    
    // Hide clothing items
    document.getElementById('shirt-suit-item').classList.add('hidden');
    document.getElementById('pant-short-item').classList.add('hidden');
    document.getElementById('blouse-dress-item').classList.add('hidden');
    document.getElementById('skirt-short-jeans-item').classList.add('hidden');
    // document.querySelectorAll('.clothing-item').forEach(item => item.classList.add('hidden'));
    // document.getElementById('clothing-item').classList.add('hidden');
    // document.getElementById('shirt-item').classList.add('hidden');
    // document.getElementById('pant-item').classList.add('hidden');
    // document.getElementById('shorts-item').classList.add('hidden');

    // Clear the src of clothing items to remove them from view
    document.getElementById('shirt-suit-item').src = '';
    document.getElementById('pant-short-item').src = '';
    document.getElementById('blouse-dress-item').src = '';
    document.getElementById('skirt-short-jeans-item').src = '';

    // Show the selected avatar if avatarId is not empty
    if (avatarId) {
        document.getElementById(avatarId).classList.remove('hidden');
        document.getElementById('avatar-container').classList.remove('hidden');
    }
}

function showImages(category) {
    const images = {
        shirts: ['Images/Shirt1.png', 'Images/Shirt2.png', 'Images/Shirt3.png', 'Images/Shirt4.png', 'Images/Shirt5.png'],
        pants: ['Images/Pant1.png', 'Images/Pant2.png'],
        shorts: ['Images/Shorts1.png', 'Images/Shorts2.png', 'Images/Shorts3.png'],
        suits: ['Images/Suit1.png'],
        dresses: ['Images/Dress1.png', 'Images/Dress2.png', 'Images/Dress3.png', 'Images/Dress4.png'],
        skirts: ['Images/Skirts1.png', 'Images/Skirts2.png',],
        shortsW: ['Images/ShortsW1.png', 'Images/ShortsW2.png', 'Images/ShortsW3.png'],
        jeans: ['Images/Jeans1.png', 'Images/Jeans2.png', 'Images/Jeans3.png', 'Images/Jeans4.png'],
        blouses: ['Images/Blouse1.png', 'Images/Blouse2.png', 'Images/Blouse3.png', 'Images/Blouse4.png', 'Images/Blouse5.png']
    };

    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = `<button class="custom-btn btn" onclick="resetClothingItem('${category}')">Reset</button>`;
    
    images[category].forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.alt = category;
        imgElement.onclick = () => displayClothingItem(image, category);
        imageContainer.appendChild(imgElement);
    });

    // Set the current category
    currentCategory = category;

    // Show the side menu
    document.getElementById('side-menu').classList.remove('hidden');
}

// function displayClothingItem(imageSrc, category) {
//     if (category === 'shirts' || category === 'dresses' || category === 'suits' || category === 'blouses') {
//         const shirtItem = document.getElementById('shirt-item');
//         shirtItem.src = imageSrc;
//         shirtItem.classList.remove('hidden');
//     } else if (category === 'pants' || category === 'skirts' || category === 'shorts' ) {
//         if(category == 'pants') {const pantItem = document.getElementById('pant-item');}
//         else if(category == 'shorts') {const pantItem = document.getElementById('shorts-item');}
//         else {const pantItem = document.getElementById('skirt-item');}
//         pantItem.src = imageSrc;
//         pantItem.classList.remove('hidden');
//     }
// }

function displayClothingItem(imageSrc, category) {
    // const clothingItem = document.getElementById('clothing-item');

    // // Reset other clothing items if necessary
    // if (['shirts', 'suits'].includes(category)) {
    //     document.querySelectorAll('.clothing-item.shirts, .clothing-item.suits').forEach(item => {
    //         item.classList.add('hidden');
    //     });
    // }
    // if (['pants', 'shorts'].includes(category)) {
    //     document.querySelectorAll('.clothing-item.pants, .clothing-item.shorts').forEach(item => {
    //         item.classList.add('hidden');
    //     });
    // }

    // clothingItem.src = imageSrc;
    // clothingItem.classList.remove('hidden');
    // clothingItem.classList.add(category);

    let itemElement;
    let clearAll = false;

    if (category === 'shirts' || category === 'suits') {
        itemElement = document.getElementById('shirt-suit-item');
    } else if (category === 'pants' || category === 'shorts' && document.getElementById('shirt-suit-item').src) {
        itemElement = document.getElementById('pant-short-item');
    } else if (category === 'blouses') {
        itemElement = document.getElementById('blouse-dress-item');
    } else if (category === 'skirts' || category === 'shortsW' || category === 'jeans') {
        itemElement = document.getElementById('skirt-short-jeans-item');
        // Remove dress if any skirt, shorts, or jeans are selected
        document.getElementById('blouse-dress-item').classList.add('hidden');
        document.getElementById('blouse-dress-item').src = '';
    } else if (category === 'dresses') {
        itemElement = document.getElementById('blouse-dress-item');
        clearAll = true;
    }

    if (clearAll) {
        // Clear all other items if a dress is selected
        document.getElementById('shirt-suit-item').classList.add('hidden');
        document.getElementById('pant-short-item').classList.add('hidden');
        document.getElementById('skirt-short-jeans-item').classList.add('hidden');
        
        document.getElementById('shirt-suit-item').src = '';
        document.getElementById('pant-short-item').src = '';
        document.getElementById('skirt-short-jeans-item').src = '';
    }

    itemElement.src = imageSrc;
    itemElement.classList.remove('hidden');
}

function resetClothingItem(category) {
    // if (category) {
    //     document.querySelectorAll(`.clothing-item.${category}`).forEach(item => item.classList.add('hidden'));
    // } else {
    //     document.querySelectorAll('.clothing-item').forEach(item => item.classList.add('hidden'));
    // }
    const clothingItem = document.getElementById('clothing-item');
    if (clothingItem.dataset.category === currentCategory) {
        clothingItem.classList.add('hidden');
        clothingItem.src = '';
    }
}

function closeMenu() {
    document.getElementById('side-menu').classList.add('hidden');
}
