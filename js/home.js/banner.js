import { bannerData } from '../json-data.js'

document.addEventListener('DOMContentLoaded', () => {
   const slidesContainer = document.getElementById('slides')
   const prevBtn = document.getElementById('prevBtn')
   const nextBtn = document.getElementById('nextBtn')
   const pagination = document.getElementById('pagination')
   let currentIndex = 1
   let slideWidth
   function createSlide(item) {
      const slide = document.createElement('div')
      slide.className = 'slide'
      slide.style.backgroundImage = `url(${item.img})`
      return slide
   }
   function renderSlides() {
      slidesContainer.innerHTML = ''
      slidesContainer.appendChild(createSlide(bannerData[bannerData.length - 1]))
      bannerData.forEach((item) => slidesContainer.appendChild(createSlide(item)))
      slidesContainer.appendChild(createSlide(bannerData[0]))
      slideWidth = slidesContainer.querySelector('.slide').offsetWidth
      slidesContainer.style.transform = `translateX(-${slideWidth * currentIndex}px)`
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
      const dots = document.querySelectorAll('.dot')
      dots.forEach((dot) => dot.classList.remove('active'))
      const realIndex = (currentIndex - 1 + bannerData.length) % bannerData.length
      dots[realIndex].classList.add('active')
   }
   function moveSlide() {
      slidesContainer.style.transition = 'transform 0.5s ease-in-out'
      slidesContainer.style.transform = `translateX(-${slideWidth * currentIndex}px)`
      updateDots()
   }
   nextBtn.addEventListener('click', () => {
      currentIndex++
      moveSlide()
   })
   prevBtn.addEventListener('click', () => {
      currentIndex--
      moveSlide()
   })
   slidesContainer.addEventListener('transitionend', () => {
      slidesContainer.style.transition = 'none'
      if (currentIndex === 0) {
         currentIndex = bannerData.length
         slidesContainer.style.transform = `translateX(-${slideWidth * currentIndex}px)`
      }
      if (currentIndex === bannerData.length + 1) {
         currentIndex = 1
         slidesContainer.style.transform = `translateX(-${slideWidth * currentIndex}px)`
      }
      setTimeout(() => {
         slidesContainer.style.transition = 'transform 0.5s ease-in-out'
      }, 20)
   })
   window.addEventListener('resize', () => {
      slideWidth = slidesContainer.querySelector('.slide').offsetWidth
      slidesContainer.style.transform = `translateX(-${slideWidth * currentIndex}px)`
   })
   renderSlides()
   renderDots()
   // :아래쪽_화살표: 무한스크롤 트랙 복제 (아이콘 반복)
   const scrollTrack = document.getElementById('scrollTrack')
   if (scrollTrack) {
      scrollTrack.innerHTML += scrollTrack.innerHTML
   }
})
