const brandData = [
   {
      name: 'Nike Swim',
      products: [
         { id: 1, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001004_17507308943066_big.png', name: 'KIRSH 상품 1', sale: '10%', price: '49,000원' },
         { id: 2, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001004_17507308943066_big.png', name: 'KIRSH 상품 2', sale: '10%', price: '59,000원' },
         { id: 3, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001004_17507308943066_big.png', name: 'KIRSH 상품 3', sale: '10%', price: '39,000원' },
         { id: 4, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001004_17507308943066_big.png', name: 'ADER 상품 1', sale: '10%', price: '69,000원' },
         { id: 5, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001004_17507308943066_big.png', name: 'ADER 상품 2', sale: '10%', price: '79,000원' },
         { id: 6, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001004_17507308943066_big.png', name: 'ADER 상품 3', sale: '10%', price: '89,000원' },
      ],
      thumbnails: [
         { id: 1, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001004_17507308943066_big.png' },
         { id: 2, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001004_17507308943066_big.png' },
         { id: 3, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001004_17507308943066_big.png' },
      ],
   },
   {
      name: 'Ocldt',
      products: [
         { id: 1, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001002_17508170341539_big.png', name: 'ADER 상품 1', sale: '10%', price: '69,000원' },
         { id: 2, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001002_17508170341539_big.png', name: 'ADER 상품 2', sale: '10%', price: '79,000원' },
         { id: 3, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001002_17508170341539_big.png', name: 'ADER 상품 3', sale: '10%', price: '89,000원' },
         { id: 4, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001002_17508170341539_big.png', name: 'ADER 상품 1', sale: '10%', price: '69,000원' },
         { id: 5, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001002_17508170341539_big.png', name: 'ADER 상품 2', sale: '10%', price: '79,000원' },
         { id: 6, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001002_17508170341539_big.png', name: 'ADER 상품 3', sale: '10%', price: '89,000원' },
      ],
      thumbnails: [
         { id: 1, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001002_17508170341539_big.png' },
         { id: 2, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001002_17508170341539_big.png' },
         { id: 3, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001002_17508170341539_big.png' },
      ],
   },
   {
      name: 'GARMENTS FAB',
      products: [
         { id: 1, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001004_17507308943066_big.png', name: 'ADER 상품 1', sale: '10%', price: '69,000원' },
         { id: 2, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001004_17507308943066_big.png', name: 'ADER 상품 2', sale: '10%', price: '79,000원' },
         { id: 3, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001004_17507308943066_big.png', name: 'ADER 상품 3', sale: '10%', price: '89,000원' },
         { id: 4, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001004_17507308943066_big.png', name: 'ADER 상품 1', sale: '10%', price: '69,000원' },
         { id: 5, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001004_17507308943066_big.png', name: 'ADER 상품 2', sale: '10%', price: '79,000원' },
         { id: 6, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001004_17507308943066_big.png', name: 'ADER 상품 3', sale: '10%', price: '89,000원' },
      ],
      thumbnails: [
         { id: 1, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001004_17507308943066_big.png' },
         { id: 2, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001004_17507308943066_big.png' },
         { id: 3, img: 'https://image.msscdn.net/images/category_img/men/ITEM_001004_17507308943066_big.png' },
      ],
   },
]

const brandTabs = document.getElementById('brandTabs')
const tabDot = document.getElementById('tabDot')
const productTrack = document.getElementById('productTrack')
const productDots = document.getElementById('productDots')
const thumbTrack = document.getElementById('thumbTrack')
const thumbDots = document.getElementById('thumbDots')
let currentBrand = 0
let currentProductSlide = 0
let currentThumbSlide = 0
let productInterval, thumbInterval
function renderTabs() {
   brandTabs.innerHTML = ''
   brandData.forEach((brand, index) => {
      const tab = document.createElement('div')
      tab.className = 'brand-tab'
      tab.textContent = brand.name
      tab.addEventListener('click', () => switchBrand(index))
      if (index === 0) tab.classList.add('active')
      brandTabs.appendChild(tab)
   })
   const dot = document.createElement('div')
   dot.className = 'tab-dot'
   dot.id = 'tabDot'
   brandTabs.appendChild(dot)
   setTimeout(updateTabDot, 0)
}
function updateTabDot() {
   const activeTab = document.querySelector('.brand-tab.active')
   if (!activeTab) return
   const tabRect = activeTab.getBoundingClientRect()
   const parentRect = brandTabs.getBoundingClientRect()
   const offsetLeft = activeTab.offsetLeft
   const dot = document.getElementById('tabDot')
   dot.style.left = `${offsetLeft - 10}px` // 글자 왼쪽에 dot 오게
}

function switchBrand(index) {
   document.querySelectorAll('.brand-tab').forEach((tab) => tab.classList.remove('active'))
   brandTabs.children[index].classList.add('active')
   currentBrand = index
   currentProductSlide = 0
   currentThumbSlide = 0
   renderProductSlides()
   renderThumbSlides()
   updateTabDot()
}
function renderProductSlides() {
   const products = brandData[currentBrand].products
   productTrack.innerHTML = ''
   productDots.innerHTML = ''
   // 카드 렌더링
   products.forEach((item) => {
      const card = document.createElement('div')
      card.className = 'product-card'
      card.innerHTML = `
         <a href="#">
            <img src="${item.img}" alt="${item.name}">
            <p>${item.name}</p>
            <div class="price">
               <span style="color: red" class="sale">${item.sale}</span>
               <span class="amount">${item.price}</span>
            </div>
         </a>
      `
      productTrack.appendChild(card)
   })
   // 슬라이드 개수 (3개씩)
   const slidesCount = Math.ceil(products.length / 3)
   // dot 생성
   for (let i = 0; i < slidesCount; i++) {
      const dot = document.createElement('span')
      dot.className = 'dot'
      if (i === 0) dot.classList.add('active')
      dot.addEventListener('click', () => {
         currentProductSlide = i
         updateProductSlide()
      })
      productDots.appendChild(dot)
   }
   // 초기 슬라이드 설정
   currentProductSlide = 0
   updateProductSlide()
   // 자동 슬라이드
   clearInterval(productInterval)
   productInterval = setInterval(() => {
      currentProductSlide = (currentProductSlide + 1) % slidesCount
      updateProductSlide()
   }, 4000)
}
function renderThumbSlides() {
   const thumbs = brandData[currentBrand].thumbnails
   thumbTrack.innerHTML = ''
   thumbDots.innerHTML = ''
   thumbs.forEach((item, i) => {
      const thumb = document.createElement('div')
      thumb.className = 'thumb-card'
      thumb.innerHTML = `
      <a href="#">
      <img src="${item.img}" alt="썸네일${i + 1}">
      </a>`
      thumbTrack.appendChild(thumb)
      const dot = document.createElement('span')
      dot.className = 'dot'
      if (i === 0) dot.classList.add('active')
      dot.addEventListener('click', () => {
         currentThumbSlide = i
         updateThumbSlide()
      })
      thumbDots.appendChild(dot)
   })
   updateThumbSlide()
   clearInterval(thumbInterval)
   thumbInterval = setInterval(() => {
      currentThumbSlide = (currentThumbSlide + 1) % thumbs.length
      updateThumbSlide()
   }, 3000)
}
function updateProductSlide() {
   const card = productTrack.querySelector('.product-card') // 카드 하나
   const cardWidth = card.offsetWidth + parseInt(getComputedStyle(card).marginRight || 0) // 카드 + 간격
   const slideWidth = cardWidth * 3 // 카드 3개짜리 슬라이드 하나
   productTrack.style.transform = `translateX(-${slideWidth * currentProductSlide}px)`
   // dot active 처리
   document.querySelectorAll('#productDots .dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentProductSlide)
   })
}
function updateThumbSlide() {
   const width = thumbTrack.offsetWidth
   thumbTrack.style.transform = `translateX(-${width * currentThumbSlide}px)`
   document.querySelectorAll('#thumbDots .dot').forEach((d, i) => d.classList.toggle('active', i === currentThumbSlide))
}
window.addEventListener('resize', updateTabDot)
window.addEventListener('load', () => {
   renderTabs()
   switchBrand(0)
})
