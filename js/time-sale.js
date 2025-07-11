const timeSaleData = [
   {
      brand: '브랜드A',
      product: '제품명 A',
      discount: 10,
      price: '29,000원',
      img: 'https://image.msscdn.net/thumbnails/images/goods_img/20250630/5213548/5213548_17512631003915_500.jpg?w=390',
      link: '#',
   },
   {
      brand: '브랜드B',
      product: '제품명 B',
      discount: 15,
      price: '41,000원',
      img: 'https://image.msscdn.net/thumbnails/images/goods_img/20250630/5213548/5213548_17512631003915_500.jpg?w=390',
      link: '#',
   },
   {
      brand: '브랜드C',
      product: '제품명 C',
      discount: 25,
      price: '59,000원',
      img: 'https://image.msscdn.net/thumbnails/images/goods_img/20250630/5213548/5213548_17512631003915_500.jpg?w=390',
      link: '#',
   },
   // 더 추가 가능
]

// 타이머
function updateTimer() {
   const now = new Date()
   const tomorrow = new Date(now)
   tomorrow.setHours(24, 0, 0, 0) // 자정(다음날 0시)
   const diff = tomorrow - now
   const hours = String(Math.floor(diff / 1000 / 60 / 60)).padStart(2, '0')
   const minutes = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0')
   const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0')
   document.getElementById('timer').textContent = `${hours}:${minutes}:${seconds}`
}
// 1초마다 업데이트
setInterval(updateTimer, 1000)
updateTimer() // 최초 1회 실행

// 카드 슬라이드
const cardTrack = document.querySelector('.card-track')
const dotContainer = document.getElementById('dotContainer')
const timeSalePrevBtn = document.querySelector('.slide-btn.prev')
const timeSaleNextBtn = document.querySelector('.slide-btn.next')

let currentSlide = 0
const cardsPerView = 3
function renderCards() {
   cardTrack.innerHTML = ''
   timeSaleData.forEach((item) => {
      const card = document.createElement('a')
      card.href = item.link
      card.classList.add('card')
      card.innerHTML = `
      <img src="${item.img}" alt="${item.product}" />
      <div class="price">
        <p style="font-weight: bold">${item.brand}</p>
        <p>${item.product}</p>
        <div style="display: flex">
          <p style="color: red; margin-right: 10px">${item.discount}%</p>
          <p>${item.price}</p>
        </div>
      </div>
    `
      cardTrack.appendChild(card)
   })
}
function renderDots() {
   dotContainer.innerHTML = ''
   const dotCount = Math.ceil(timeSaleData.length / cardsPerView)
   for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('span')
      dot.classList.add('dot')
      if (i === 0) dot.classList.add('active')
      dot.addEventListener('click', () => moveSlide(i))
      dotContainer.appendChild(dot)
   }
}
function moveSlide(index) {
   const cardWidth = document.querySelector('.card').offsetWidth + 16 // 카드 폭 + 마진
   cardTrack.style.transform = `translateX(-${index * cardWidth * cardsPerView}px)`
   const dots = document.querySelectorAll('.dot')
   dots.forEach((dot) => dot.classList.remove('active'))
   if (dots[index]) dots[index].classList.add('active')
   currentSlide = index
}
// 버튼 클릭 이벤트
timeSalePrevBtn.addEventListener('click', () => {
   if (currentSlide > 0) moveSlide(currentSlide - 1)
})
timeSaleNextBtn.addEventListener('click', () => {
   const maxSlide = Math.ceil(timeSaleData.length / cardsPerView) - 1
   if (currentSlide < maxSlide) moveSlide(currentSlide + 1)
})
// 자동 슬라이드
let timeSaleautoSlide = setInterval(() => {
   const maxSlide = Math.ceil(timeSaleData.length / cardsPerView) - 1
   currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1
   moveSlide(currentSlide)
}, 5000)
// 마우스 호버 시 멈춤
document.querySelector('.card-slider').addEventListener('mouseenter', () => clearInterval(timeSaleautoSlide))
document.querySelector('.card-slider').addEventListener('mouseleave', () => {
   timeSaleautoSlide = setInterval(() => {
      const maxSlide = Math.ceil(timeSaleData.length / cardsPerView) - 1
      currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1
      moveSlide(currentSlide)
   }, 5000)
})
renderCards()
renderDots()
