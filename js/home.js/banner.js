import { bannerData } from '../json-data.js'
document.addEventListener('DOMContentLoaded', () => {
   const slidesContainer = document.getElementById('slides')
   const prevBtn = document.getElementById('prevBtn')
   const nextBtn = document.getElementById('nextBtn')
   const pagination = document.getElementById('pagination')
   let currentIndex = 1
   let slideWidth = 0
   let autoInterval
   function createSlide(item) {
      const slide = document.createElement('div')
      slide.className = 'slide'
      slide.style.backgroundImage = `url(${item.img})`
      return slide
   }
   function renderSlides() {
      slidesContainer.innerHTML = ''
      slidesContainer.appendChild(createSlide(bannerData[bannerData.length - 1])) // 맨 뒤 복제
      bannerData.forEach((item) => slidesContainer.appendChild(createSlide(item)))
      slidesContainer.appendChild(createSlide(bannerData[0])) // 맨 앞 복제
      slideWidth = slidesContainer.querySelector('.slide').offsetWidth
      updateSlidePosition()
   }
   function updateSlidePosition() {
      slidesContainer.style.transform = `translateX(-${slideWidth * currentIndex}px)`
      highlightActiveSlide()
      updateDots()
   }
   function renderDots() {
      pagination.innerHTML = ''
      bannerData.forEach((_, i) => {
         const dot = document.createElement('span')
         dot.className = 'dot'
         if (i === 0) dot.classList.add('active')
         dot.addEventListener('click', () => {
            currentIndex = i + 1
            moveSlide()
         })
         pagination.appendChild(dot)
      })
   }
   function updateDots() {
      const dots = pagination.querySelectorAll('.dot')
      dots.forEach((dot) => dot.classList.remove('active'))
      const realIndex = (currentIndex - 1 + bannerData.length) % bannerData.length
      if (dots[realIndex]) dots[realIndex].classList.add('active')
   }
   function highlightActiveSlide() {
      const slides = slidesContainer.querySelectorAll('.slide')
      slides.forEach((slide, idx) => {
         slide.classList.toggle('active', idx === currentIndex)
      })
   }
   function moveSlide() {
      slidesContainer.style.transition = 'transform 0.5s ease-in-out'
      slidesContainer.style.transform = `translateX(-${slideWidth * currentIndex}px)`
      updateDots()
      highlightActiveSlide()
   }
   function handleLoop() {
      slidesContainer.style.transition = 'none'
      if (currentIndex === 0) {
         currentIndex = bannerData.length
         updateSlidePosition()
      }
      if (currentIndex === bannerData.length + 1) {
         currentIndex = 1
         updateSlidePosition()
      }
      setTimeout(() => {
         slidesContainer.style.transition = 'transform 0.5s ease-in-out'
      }, 20)
   }
   prevBtn.addEventListener('click', () => {
      currentIndex--
      moveSlide()
      resetAutoSlide()
   })
   nextBtn.addEventListener('click', () => {
      currentIndex++
      moveSlide()
      resetAutoSlide()
   })
   slidesContainer.addEventListener('transitionend', handleLoop)
   window.addEventListener('resize', () => {
      slideWidth = slidesContainer.querySelector('.slide').offsetWidth
      updateSlidePosition()
   })
   function startAutoSlide() {
      autoInterval = setInterval(() => {
         currentIndex++
         moveSlide()
      }, 4000)
   }
   function resetAutoSlide() {
      clearInterval(autoInterval)
      startAutoSlide()
   }
   // 초기화
   renderSlides()
   renderDots()
   highlightActiveSlide()
   startAutoSlide()
})
