import { Products } from '../json-data.js'
document.addEventListener('DOMContentLoaded', () => {
   const timerEl = document.getElementById('timer')
   const cardTrack = document.querySelector('.card-track')
   const dotContainer = document.getElementById('dotContainer')
   const prevBtn = document.querySelector('.slide-btn.prev')
   const nextBtn = document.querySelector('.slide-btn.next')
   const cardsPerView = 3 //  한 화면에 보일 카드 수
   let currentSlide = 0
   const timeSaleItems = Products.filter((item) => item.tab === '타임세일')
   //  타이머
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
   //  카드 렌더링
   function renderCards(list) {
      cardTrack.innerHTML = ''
      list.forEach((item) => {
         const card = document.createElement('a')
         card.className = 'card'
         card.href = `./productdetail.html?id=${item.id}`
         card.innerHTML = `
            <img src="${item.img}" alt="${item.name}" />
            <div>
               <p style="font-weight:bold">${item.brand}</p>
               <p>${item.name}</p>
               <div class="price" style="display:flex">
                  <p style="color:red;">${item.discount}</p>
                  <p>${item.price}</p>
               </div>
            </div>
         `
         cardTrack.appendChild(card)
      })
   }
   //  도트 렌더링
   const maxSlide = timeSaleItems.length - cardsPerView // 총 슬라이드 횟수
   function renderDots(list) {
      dotContainer.innerHTML = ''
      for (let i = 0; i <= maxSlide; i++) {
         const dot = document.createElement('span')
         dot.className = 'dot'
         if (i === currentSlide) dot.classList.add('active')
         dot.addEventListener('click', () => {
            currentSlide = i
            updateSlide()
         })
         dotContainer.appendChild(dot)
      }
   }
   function updateSlide() {
      const card = document.querySelector('.card')
      if (!card) return
      const cardStyle = window.getComputedStyle(card)
      const cardWidth = card.offsetWidth
      const gap = parseFloat(cardStyle.marginRight || 0)
      const offset = currentSlide * (cardWidth + gap)
      cardTrack.style.transform = `translateX(-${offset}px)`
      const dots = document.querySelectorAll('.dot')
      dots.forEach((dot, i) => {
         dot.classList.toggle('active', i === currentSlide)
      })
   }
   nextBtn.addEventListener('click', () => {
      if (currentSlide < maxSlide) {
         currentSlide++
         updateSlide()
      }
   })
   prevBtn.addEventListener('click', () => {
      if (currentSlide > 0) {
         currentSlide--
         updateSlide()
      }
   })
   // 최초 실행
   renderCards(timeSaleItems)
   renderDots(timeSaleItems)
   updateSlide()
})
