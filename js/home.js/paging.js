document.addEventListener('DOMContentLoaded', () => {
   initScrollDownButton()
   initSectionWheelScroll()
   initScrollToTopButton()
})
// :별: 배너에서 타임세일로 이동 버튼
function initScrollDownButton() {
   const scrollBtn = document.querySelector('.scroll-down-btn')
   const targetSection = document.querySelector('.time-sale')
   if (scrollBtn && targetSection) {
      scrollBtn.addEventListener('click', () => {
         const sectionTop = targetSection.offsetTop
         const scrollTarget = sectionTop - (window.innerHeight - targetSection.clientHeight) / 2
         window.scrollTo({
            top: scrollTarget,
            behavior: 'smooth',
         })
      })
   }
}
// :별: 섹션 간 휠 스크롤 이동
function initSectionWheelScroll() {
   const headerHeight = 109
   const sections = Array.from(document.querySelectorAll('main section')).filter((section) => !section.classList.contains('coupon'))
   const footer = document.querySelector('footer')
   if (footer) sections.push(footer)
   let currentIndex = 0
   let isScrolling = false
   let enterTimer = null
   // 마우스 hover 시 해당 섹션으로 부드럽게 이동
   sections.forEach((section, index) => {
      section.addEventListener('mouseenter', () => {
         if (isScrolling) return
         clearTimeout(enterTimer)
         enterTimer = setTimeout(() => {
            const scrollTop = section.offsetTop - headerHeight
            window.scrollTo({ top: scrollTop, behavior: 'smooth' })
            currentIndex = index
         }, 300)
      })
      section.addEventListener('mouseleave', () => {
         clearTimeout(enterTimer)
      })
   })
   // 휠로 섹션 간 이동
   window.addEventListener(
      'wheel',
      (e) => {
         if (isScrolling) return
         if (e.deltaY > 30 && currentIndex < sections.length - 1) currentIndex++
         else if (e.deltaY < -30 && currentIndex > 0) currentIndex--
         else return
         isScrolling = true
         const targetTop = sections[currentIndex].offsetTop - headerHeight
         window.scrollTo({ top: targetTop, behavior: 'smooth' })
         setTimeout(() => {
            isScrolling = false
         }, 700)
      },
      { passive: true }
   )
}
// :별: 맨 위로 이동 버튼
function initScrollToTopButton() {
   const scrollToTopBtn = document.getElementById('scrollToTopBtn')
   window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
         scrollToTopBtn.classList.add('show')
      } else {
         scrollToTopBtn.classList.remove('show')
      }
   })
   scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth',
      })
   })
}
