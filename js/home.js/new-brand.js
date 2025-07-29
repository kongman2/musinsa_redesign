import { brandData } from '../json-data.js'
import { getProducts, toggleLike } from '../productUtils.js'

let Products = groupProductsByBrand(getProducts())
console.log(Products)
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
function groupProductsByBrand(data) {
   const filtered = data.filter((item) => item.tab === '상품')
   const brandMap = {}
   filtered.forEach((item) => {
      if (!brandMap[item.brand]) {
         brandMap[item.brand] = []
      }
      brandMap[item.brand].push(item)
   })
   return Object.entries(brandMap).map(([brand, items]) => ({
      name: brand,
      products: items,
   }))
}
function renderTabs() {
   brandTabs.innerHTML = ''
   Products.forEach((brand, index) => {
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
   const offsetLeft = activeTab.offsetLeft
   const dot = document.getElementById('tabDot')
   dot.style.left = `${offsetLeft - 10}px`
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
   const products = Products[currentBrand].products
   productTrack.innerHTML = ''
   productDots.innerHTML = ''
   products.forEach((item) => {
      const card = document.createElement('div')
      card.className = 'product-card'
      card.innerHTML = `
      <div>
        <a href="./productdetail.html?id=${item.id}">
          <img src="${item.img}" alt="${item.name}">
          <p>${item.name}</p>
          <div class="price">
            <span style="color: red" class="sale">${item.discount}</span>
            <span class="amount">${item.price}</span>
          </div>
        </a>
        <button class="heart-btn" data-id="${item.id}">
          <img src="./images/${item.liked ? 'r_heart_icon.png' : 'tabler_heart.png'}" alt="하트" />
        </button>
      </div>
      `
      productTrack.appendChild(card)
   })
   // 하트 이벤트 바인딩
   productTrack.querySelectorAll('.heart-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
         e.preventDefault()
         e.stopPropagation()
         const id = parseInt(btn.dataset.id)
         toggleLike(id) // localStorage 업데이트
         Products = groupProductsByBrand(getProducts()) // :뇌: 메모리 데이터도 동기화
         renderProductSlides() // :전구: 다시 렌더링해서 하트 UI 갱신
      })
   })
   const slidesCount = Math.ceil(products.length / 3)
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
   currentProductSlide = 0
   updateProductSlide()
   clearInterval(productInterval)
   productInterval = setInterval(() => {
      currentProductSlide = (currentProductSlide + 1) % slidesCount
      updateProductSlide()
   }, 4000)
}
function renderThumbSlides() {
   const brandName = Products[currentBrand].name
   const brandThumb = brandData.find((b) => b.name === brandName)
   if (!brandThumb || !brandThumb.thumbnails) {
      thumbTrack.innerHTML = '<p>썸네일 없음</p>'
      thumbDots.innerHTML = ''
      return
   }
   const thumbs = brandThumb.thumbnails
   thumbTrack.innerHTML = ''
   thumbDots.innerHTML = ''
   thumbs.forEach((item, i) => {
      const thumb = document.createElement('div')
      thumb.className = 'thumb-card'
      thumb.innerHTML = `
      <a href="#">
        <img src="${item.img}" alt="썸네일${i + 1}">
      </a>
      `
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
   const card = productTrack.querySelector('.product-card')
   if (!card) return
   const cardWidth = card.offsetWidth + parseInt(getComputedStyle(card).marginRight || 0)
   const slideWidth = cardWidth * 3
   productTrack.style.transform = `translateX(-${slideWidth * currentProductSlide}px)`
   document.querySelectorAll('#productDots .dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentProductSlide)
   })
}
function updateThumbSlide() {
   const width = thumbTrack.offsetWidth
   thumbTrack.style.transform = `translateX(-${width * currentThumbSlide}px)`
   document.querySelectorAll('#thumbDots .dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentThumbSlide)
   })
}
window.addEventListener('load', () => {
   renderTabs()
   switchBrand(0)
})
window.addEventListener('resize', updateTabDot)
