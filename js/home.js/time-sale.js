import { getProducts, toggleLike } from '../productUtils.js'
document.addEventListener('DOMContentLoaded', () => {
   const timerEl = document.getElementById('timer')
   const cardTrack = document.querySelector('.card-track')
   const dotContainer = document.getElementById('dotContainer')
   const prevBtn = document.querySelector('.slide-btn.prev')
   const nextBtn = document.querySelector('.slide-btn.next')
   const cardsPerView = 3
   let currentSlide = 0
   let autoSlideInterval
   // 1. 타이머
   function updateTimer() {
      const now = new Date()
      const tomorrow = new Date()
      tomorrow.setHours(24, 0, 0, 0)
      const diff = tomorrow - now
      const h = String(Math.floor(diff / 1000 / 60 / 60)).padStart(2, '0')
      const m = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0')
      const s = String(Math.floor((diff / 1000) % 60)).padStart(2, '0')
      timerEl.textContent = `${h}:${m}:${s}`
   }
   setInterval(updateTimer, 1000)
   updateTimer()
   // 2. 카드 렌더링 (매번 최신 Products 가져와야 하트 반영됨)
   function renderCards() {
      const Products = getProducts()
      const timeSaleItems = Products.filter((item) => item.tab === '타임세일')
      cardTrack.innerHTML = ''
      timeSaleItems.forEach((item) => {
         const card = document.createElement('div')
         card.className = 'card'
         card.innerHTML = `
        <a href="./productdetail.html?id=${item.id}">
          <img src="${item.img}" alt="${item.name}" />
          <div>
            <p style="font-weight:bold">${item.brand}</p>
            <p>${item.name}</p>
            <div class="price" style="display:flex; gap: 5px;">
              <p style="color:red;">${item.discount}</p>
              <p>${item.price}</p>
            </div>
          </div>
        </a>
        <button class="heart-btn" data-id="${item.id}" style="margin-top: 5px;">
          <img src="./images/${item.liked ? 'r_heart_icon.png' : 'tabler_heart.png'}" alt="하트" />
        </button>
      `
         cardTrack.appendChild(card)
      })
      // 하트 토글
      cardTrack.querySelectorAll('.heart-btn').forEach((btn) => {
         btn.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()
            const id = parseInt(btn.dataset.id)
            toggleLike(id)
            renderCards()
            updateSlide()
         })
      })
   }
   // 3. 도트 렌더링
   function renderDots() {
      const Products = getProducts()
      const timeSaleItems = Products.filter((item) => item.tab === '타임세일')
      const maxSlide = Math.max(0, timeSaleItems.length - cardsPerView)
      dotContainer.innerHTML = ''
      for (let i = 0; i <= maxSlide; i++) {
         const dot = document.createElement('span')
         dot.className = 'dot'
         if (i === currentSlide) dot.classList.add('active')
         dot.addEventListener('click', () => {
            currentSlide = i
            updateSlide()
            resetAutoSlide()
         })
         dotContainer.appendChild(dot)
      }
   }
   // 4. 슬라이드 이동
   function updateSlide() {
      const card = document.querySelector('.card')
      if (!card) return
      const style = window.getComputedStyle(card)
      const cardWidth = card.offsetWidth
      const gap = parseFloat(style.marginRight || 0)
      const offset = currentSlide * (cardWidth + gap)
      cardTrack.style.transform = `translateX(-${offset}px)`
      document.querySelectorAll('.dot').forEach((dot, i) => {
         dot.classList.toggle('active', i === currentSlide)
      })
   }
   // 5. 버튼 이벤트
   nextBtn.addEventListener('click', () => {
      const Products = getProducts()
      const timeSaleItems = Products.filter((item) => item.tab === '타임세일')
      const maxSlide = Math.max(0, timeSaleItems.length - cardsPerView)
      if (currentSlide < maxSlide) {
         currentSlide++
         updateSlide()
         resetAutoSlide()
      }
   })
   prevBtn.addEventListener('click', () => {
      if (currentSlide > 0) {
         currentSlide--
         updateSlide()
         resetAutoSlide()
      }
   })
   // 6. 자동 슬라이드
   function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
         const Products = getProducts()
         const timeSaleItems = Products.filter((item) => item.tab === '타임세일')
         const maxSlide = Math.max(0, timeSaleItems.length - cardsPerView)
         currentSlide = currentSlide < maxSlide ? currentSlide + 1 : 0
         updateSlide()
      }, 3000)
   }
   function resetAutoSlide() {
      clearInterval(autoSlideInterval)
      startAutoSlide()
   }
   // 7. 초기 실행
   renderCards()
   renderDots()
   updateSlide()
   startAutoSlide()
})
