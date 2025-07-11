// banner 슬라이드
const bannerData = [
   { id: 1, img: 'https://image.msscdn.net/thumbnails/campaign_service/images/cpcms/2025/80ec3f27940d48758e3532a3cdf352fb.jpg?w=750', link: '#' },
   { id: 2, img: 'https://image.msscdn.net/thumbnails/campaign_service/images/cpcms/2025/2495c6ccc1484430bd8c86473e492585.jpg?w=750', link: '#' },
   { id: 3, img: 'https://image.msscdn.net/thumbnails/campaign_service/images/cpcms/2025/21dbbbb9c0704a768cbb7c7290903b94.jpg?w=750', link: '#' },
]
const slidesContainer = document.getElementById('slides')
const paginationContainer = document.getElementById('pagination')
const bannerprevBtn = document.getElementById('prevBtn')
const bannernextBtn = document.getElementById('nextBtn')
let currentIndex = 1 // 복제된 슬라이드 포함해서 index 시작은 1
let autoSlide
function createSlide(item) {
   const slide = document.createElement('a')
   slide.href = item.link
   slide.className = 'slide'
   slide.style.backgroundImage = `url(${item.img})`
   return slide
}
function renderSlides() {
   slidesContainer.innerHTML = ''
   // 1. 마지막 슬라이드 복제해서 앞에 붙임
   slidesContainer.appendChild(createSlide(bannerData[bannerData.length - 1]))
   // 2. 실제 슬라이드들
   bannerData.forEach((item) => {
      slidesContainer.appendChild(createSlide(item))
   })
   // 3. 첫 번째 슬라이드 복제해서 뒤에 붙임
   slidesContainer.appendChild(createSlide(bannerData[0]))
   // 4. 슬라이드 트랙 초기 위치 설정
   updateSlidePosition()
}
function renderPagination() {
   paginationContainer.innerHTML = ''
   bannerData.forEach((_, i) => {
      const dot = document.createElement('span')
      dot.className = 'dot'
      if (i === 0) dot.classList.add('active')
      dot.addEventListener('click', () => moveToSlide(i + 1)) // 복제 때문에 +1
      paginationContainer.appendChild(dot)
   })
}
function updateSlidePosition() {
   const slideWidth = slidesContainer.clientWidth
   slidesContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`
}
function moveToSlide(index) {
   currentIndex = index
   updateSlidePosition()
   updateDots()
}
function updateDots() {
   const dots = document.querySelectorAll('.dot')
   dots.forEach((dot) => dot.classList.remove('active'))
   const realIndex = (currentIndex - 1 + bannerData.length) % bannerData.length
   dots[realIndex].classList.add('active')
}
function nextSlide() {
   if (currentIndex >= bannerData.length + 1) return
   currentIndex++
   updateSlidePosition()
   updateDots()
   handleLooping()
}
function prevSlide() {
   if (currentIndex <= 0) return
   currentIndex--
   updateSlidePosition()
   updateDots()
   handleLooping()
}
function handleLooping() {
   slidesContainer.style.transition = 'transform 0.5s ease-in-out'
   // 트랜지션 끝난 후 순간 이동
   slidesContainer.addEventListener(
      'transitionend',
      () => {
         slidesContainer.style.transition = 'none'
         if (currentIndex === bannerData.length + 1) {
            currentIndex = 1
            updateSlidePosition()
         }
         if (currentIndex === 0) {
            currentIndex = bannerData.length
            updateSlidePosition()
         }
         setTimeout(() => {
            slidesContainer.style.transition = 'transform 0.5s ease-in-out'
         }, 20)
      },
      { once: true }
   )
}
// 버튼 이벤트
bannerprevBtn.addEventListener('click', prevSlide)
bannernextBtn.addEventListener('click', nextSlide)
// 자동 슬라이드
function startAutoSlide() {
   autoSlide = setInterval(() => {
      nextSlide()
   }, 5000)
}
function stopAutoSlide() {
   clearInterval(autoSlide)
}
// 마우스 진입 시 멈춤
slidesContainer.addEventListener('mouseenter', stopAutoSlide)
slidesContainer.addEventListener('mouseleave', startAutoSlide)
renderSlides()
renderPagination()
startAutoSlide()

document.addEventListener('DOMContentLoaded', () => {
   const track = document.getElementById('scrollTrack')
   track.innerHTML += track.innerHTML // 복제
})
