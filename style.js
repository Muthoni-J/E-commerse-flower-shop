// =====================
//    Home Area Start
// =====================
 
// selecting parallax and slider elements
let parallax = document.querySelector('.bg-slider-1');
let bgSlideContents = document.querySelectorAll('.bg-slider');
 
// initialize slide index
let slideIndex = 0;
 
// slide left
function homeSlideLeft() {
   slideIndex--;
 
   if (slideIndex < 0) {
       slideIndex = bgSlideContents.length - 1;
   }
 
   bgSlideContents[slideIndex].classList.add('active-bg');
   parallax.style.backgroundPositionY = 0 + 'px';
   parallax = document.querySelector(`.bg-slider-${slideIndex + 1}`);
 
}
 
// slide right
function homeSlideRight() {
   slideIndex++;
 
   if (slideIndex >= bgSlideContents.length) {
       slideIndex = 0;
   }
 
   bgSlideContents[slideIndex].classList.add('active-bg');
   parallax.style.backgroundPositionY = 0 + 'px';
   parallax = document.querySelector(`.bg-slider-${slideIndex + 1}`);
 
}
 
// remove previous slide
function removePrevSlide() {
   for (let i = 0; i < bgSlideContents.length; i++) {
       bgSlideContents[i].classList.remove('active-bg');
   }
}
 
// auto slider
let homeSlide = setInterval(() => {
   removePrevSlide();
   homeSlideRight();
}, 8000);
 
 
// slide left right button
let bgSlideLeftBtn = document.querySelector('.bg-slide-left');
let bgSlideRightBtn = document.querySelector('.bg-slide-right');
 
// actions while left button click
bgSlideLeftBtn.onclick = () => {
   removePrevSlide();
   homeSlideLeft();
}
 
// actions while right button click
bgSlideRightBtn.onclick = () => {
   removePrevSlide();
   homeSlideRight();
}
 
// selecting navbar elements
let navbar = document.querySelector('nav');
let navItems = document.querySelectorAll('.nav-items li');
 
// home text
let hero = document.querySelector('#hero');
 
// actions while scroll up or down
window.onscroll = () => {
   let scrollTop = document.documentElement.scrollTop;
   let totalHeight = document.documentElement.scrollHeight - window.innerHeight;
   let percentage = (scrollTop / totalHeight) * 100;
 
   // parallax effect
   parallax.style.backgroundPositionY = scrollTop * 0.7 + 'px';
 
   // home text effect
   hero.style.top = 50 - percentage * 1.8 + '%';
 
   // sticky navbar
   if (scrollTop > navbar.offsetTop) {
       navbar.classList.add('active');
   } else {
       navbar.classList.remove('active');
   }
}
 
// selecting elements for menu toggle
let toggleBar = document.querySelector('#toggle-bar');
let navigationArea = document.querySelector('.nav-items');
 
// slelecting elements for search bar
let searchBtn = document.querySelector('#search-btn');
let searchBox = document.querySelector('.search-box');
 
// actions while toggle button click
toggleBar.addEventListener('click', function () {
   toggleBar.classList.toggle('active-toggler');
   navigationArea.classList.toggle('active-navbar');
   searchBox.classList.remove('active-search-box');
   for (let i = 0; i < navItems.length; i++) {
       navItems[i].addEventListener('click', function () {
           toggleBar.classList.remove('active-toggler');
           navigationArea.classList.remove('active-navbar');
       });
   }
});
 
// actions while search button click
searchBtn.addEventListener('click', function () {
   searchBox.classList.toggle('active-search-box');
   toggleBar.classList.remove('active-toggler');
   navigationArea.classList.remove('active-navbar');
});
 
// ===================
//    Home Area End
// ===================
 
 
 
 
 
// =====================================
//    Product Cart Control Area Start
// =====================================
 
// selecting featured products and product cart elements
let shoppingCartBtn = document.querySelector('#icon-shopping-cart');
let cartIconProductCounter = document.querySelector('#item-counter');
let productCartArea = document.querySelector('#product-cart-area');
 
let favoriteIcon = document.querySelectorAll('.add-to-favorite > span');
let cartWishlistArea = document.querySelector('.cart-wishlist-area');
 
let itemDeleteConfirmationBox = document.querySelector('.remove-confirmation-message');
let itemDeleteConfirmationBoxTitle = document.querySelector('.remove-message-title h2');
let popupShadow = document.querySelector('.popup-shadow');
let removeCancelBtn = document.querySelector('#remove-cancel-btn');
let removeConfirmBtn = document.querySelector('#remove-confirm-btn');
 
let shoppingCart = document.querySelector('.shopping-cart-area');
let cartContentMenu = document.querySelectorAll('.cart-menu-items h2');
let cartCloseButton = document.querySelector('.cart-close-btn button');
let shoppingCartContentsArea = document.querySelectorAll('.shopping-cart-contents-area');
 
let featuredProducts = document.querySelectorAll('.product-wrap');
let productImage = document.querySelectorAll('.product-img img');
let productPrice = document.querySelectorAll('.f-product-price');
let productDiscount = document.querySelectorAll('.discount');
let productName = document.querySelectorAll('.product-name');
let currentPrice = document.querySelectorAll('.f-cur-price');
let productUnit = document.querySelectorAll('.f-product-unit');
let addToCartBtn = document.querySelectorAll('.add-to-cart-btn p');
let cartContentArea = document.querySelector('.cart-contents-area');
let shoppingCartArea = document.querySelector('.shopping-cart-wrap');
let buyingProductContent = document.querySelector('.buying-product-title');
let buyingDetailsFooter = document.querySelector('.buying-details-footer');
let totalBuyingItems = document.querySelector('.calculate-total-items p span');
let shoppingDetailsContent = document.querySelector('.shopping-details-content');
let totalBuyingItemsQuantity = document.querySelector('.calculate-total-quantity p');
let totalBuyingItemsAmount = document.querySelector('.calculate-total-amount p span');
 
let totalSelectedProduct = document.querySelector('#total-selected');
let totalFavoriteProduct = document.querySelector('#total-favorite');
let totalSelectedCounter = document.querySelector('#total-selected span');
let totalFavoriteCounter = document.querySelector('#total-favorite span');
let totalAddToBuyCounter = document.querySelector('#total-buying-item-counter');
 
let controllScrolling = document.querySelector('html');
 
// item counter
let countSelectedItem = 0;
let countFavoriteItem = 0;
let countAddToBuyItem = 0;
let countBuyProductSl = 0;
let countTotalWeight = 0;
let countTotalPieces = 0;
let countTotalAmount = 0;
let countTotalDozen = 0;
 
// store event data
let addedToCart = [];
let addedForBuy = [];
let newCartContent = [];
let addedToFavorite = [];
let newfavoriteItem = [];
let shoppingCartItem = [];
let storeShopItemsIndex = [];
 
let isSelectedItemActive = true;
 
// calculate and update current price
(function () {
   for (let i = 0; i < featuredProducts.length; i++) {
       let oldPrice = productPrice[i].textContent;
       let discount = productDiscount[i].textContent;
 
       let newPrice = oldPrice - Math.round((oldPrice * (discount / 100)));
 
       currentPrice[i].textContent = newPrice;
   }
})();
 
// show cart area
shoppingCartBtn.onclick = () => {
   productCartArea.classList.add('active-cart');
   controllScrolling.style.overflowY = 'hidden';
}
 
// remove cart area
cartCloseButton.onclick = () => {
   productCartArea.classList.remove('active-cart');
   controllScrolling.style.overflowY = 'auto';
}
 
// display cart buying header
function displayBuyingHeader(countValue) {
   let totalShopItems = shoppingDetailsContent.children.length;
   if (countValue > 0 && isSelectedItemActive === true) {
       buyingProductContent.classList.add('acvie-buying-title');
   } else if (totalShopItems > 0 && isSelectedItemActive === true) {
       buyingProductContent.classList.add('acvie-buying-title');
   } else {
       buyingProductContent.classList.remove('acvie-buying-title');
   }
}
 
// cart header menu switch and show/hide total items counter
(function () {
   for (let i = 0; i < cartContentMenu.length; i++) {
       cartContentMenu[i].addEventListener('click', function () {
           for (let j = 0; j < cartContentMenu.length; j++) {
               cartContentMenu[j].classList.remove('active-cart-menu');
               shoppingCartContentsArea[j].classList.remove('active-cart-content');
               totalSelectedProduct.classList.remove('active-product-counter');
               totalFavoriteProduct.classList.remove('active-product-counter');
           }
           cartContentMenu[i].classList.add('active-cart-menu');
           shoppingCartContentsArea[i].classList.add('active-cart-content');
           if (cartContentMenu[i].getAttribute('id') === 'selected-products') {
               totalSelectedProduct.classList.add('active-product-counter');
               if (countSelectedItem > 0) {
                   buyingProductContent.classList.add('acvie-buying-title');
                   totalSelectedCounter.innerHTML = countSelectedItem;
               } else {
                   totalSelectedCounter.innerHTML = 'No item found';
               }
               isSelectedItemActive = true;
           } else {
               totalFavoriteProduct.classList.add('active-product-counter');
               buyingProductContent.classList.remove('acvie-buying-title');
               if (countFavoriteItem > 0) {
                   totalFavoriteCounter.innerHTML = countFavoriteItem;
               } else {
                   totalFavoriteCounter.innerHTML = 'No item found';
               }
 
               isSelectedItemActive = false;
           }
 
           displayBuyingHeader(countSelectedItem);
 
       });
   }
})();
 
// set event data false
(function () {
   for (let i = 0; i < addToCartBtn.length; i++) {
       addedToCart[i] = false;
       addedForBuy[i] = false;
       addedToFavorite[i] = false;
   }
})();
 
// create elements for selected product content
function createSelectedProductsContent(image, name, price, unit, discount, preservative, time) {
   let newCartContent = document.createElement('div');
   newCartContent.setAttribute('class', 'cart-content');
 
   let newCartImageArea = document.createElement('div');
   newCartImageArea.setAttribute('class', 'cart-image-area');
 
   let newCartDetails = document.createElement('div');
   newCartDetails.setAttribute('class', 'cart-details');
 
   //children of newCartImageArea
   let newImage = document.createElement('img');
   newImage.src = image;
 
   newCartImageArea.appendChild(newImage);
 
   // childrens of newCartDetails
   let newHeading2 = document.createElement('h2');
   newHeading2.textContent = 'Product Details';
 
   let newPara = [];
   let newStrong = [];
 
   for (let i = 0; i < 6; i++) {
       newPara[i] = document.createElement('p');
       newStrong[i] = document.createElement('strong');
   }
 
   newStrong[0].textContent = 'Product name: ';
   newStrong[1].textContent = 'Price: ';
   newStrong[2].textContent = 'Discount: ';
   newStrong[3].textContent = 'Quantity: ';
   newStrong[4].textContent = 'Preservatives: ';
   newStrong[5].textContent = 'Added Time: ';
 
   for (let i = 0; i < 6; i++) {
       newPara[i].appendChild(newStrong[i]);
   }
 
   let newInput = document.createElement('input');
   newInput.setAttribute('type', 'number');
   newPara[3].appendChild(newInput);
 
   let newQuantitySpan = document.createElement('span');
   newQuantitySpan.innerHTML = `${unit}`;
   newQuantitySpan.style.paddingLeft = '0.4rem';
   newPara[3].appendChild(newQuantitySpan);
 
   let newSpan = [];
   for (let i = 0; i < 3; i++) {
       newSpan[i] = document.createElement('span');
   }
 
   newSpan[0].textContent = name;
   newSpan[1].textContent = price + `Tk/${unit}`;
   newSpan[2].textContent = discount + '%';
 
   for (let i = 0; i < 3; i++) {
       newPara[i].appendChild(newSpan[i]);
   }
 
   let preservativeSpan = document.createElement('span');
   preservativeSpan.textContent = preservative;
 
   let timeSpan = document.createElement('span');
   timeSpan.textContent = time;
 
   newPara[4].appendChild(preservativeSpan);
   newPara[5].appendChild(timeSpan);
 
   let newShoppingButton = [];
 
   for (let i = 0; i < 2; i++) {
       newShoppingButton[i] = document.createElement('button');
   }
 
   newShoppingButton[0].textContent = 'Add to Buy';
   newShoppingButton[1].textContent = 'Remove Item';
 
   newShoppingButton[0].setAttribute('class', 'add-to-buy-btn');
   newShoppingButton[1].setAttribute('class', 'remove-item-btn');
 
   // adding children to parent element
   newCartDetails.appendChild(newHeading2);
 
   for (let i = 0; i < 6; i++) {
       newCartDetails.appendChild(newPara[i]);
   }
 
   for (let i = 0; i < 2; i++) {
       newCartDetails.appendChild(newShoppingButton[i]);
   }
 
   newCartContent.appendChild(newCartImageArea);
   newCartContent.appendChild(newCartDetails);
 
   return newCartContent;
}
 
// get product added time
function getAddedTime() {
   let dt = new Date();
 
   let dd = dt.getDate();
   let mm = dt.getMonth() + 1;
   let yyyy = dt.getFullYear();
 
   let HH = dt.getHours();
   let MM = dt.getMinutes();
   let XM = null;
 
   (HH >= 12) ? XM = 'PM': XM = 'AM';
 
   if (HH > 12) {
       HH -= 12;
   }
 
   if (HH == 0) {
       HH = 12;
   }
 
   if (dd < 10) {
       dd = '0' + dd;
   }
 
   if (mm < 10) {
       mm = '0' + mm;
   }
 
   if (HH < 10) {
       HH = '0' + HH;
   }
 
   if (MM < 10) {
       MM = '0' + MM;
   }
 
   let format = `${dd}/${mm}/${yyyy}  ${HH}:${MM} ${XM}`;
 
   return format;
}
