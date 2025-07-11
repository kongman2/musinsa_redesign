document.addEventListener('DOMContentLoaded', () => {
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
   const headerHeight = 109
   const sections = Array.from(document.querySelectorAll('main section')).filter((section) => !section.classList.contains('coupon'))
   const footer = document.querySelector('footer')
   if (footer) sections.push(footer)
   let currentIndex = 0
   let isScrolling = false
   let enterTimer = null
   // 마우스 섹션 진입 시 지연된 스크롤
   sections.forEach((section, index) => {
      section.addEventListener('mouseenter', () => {
         if (isScrolling) return
         clearTimeout(enterTimer) // 이전 타이머 제거
         enterTimer = setTimeout(() => {
            const scrollTop = section.offsetTop - headerHeight
            window.scrollTo({ top: scrollTop, behavior: 'smooth' })
            currentIndex = index
         }, 300) // 300ms 이상 머물러야 스크롤
      })
      section.addEventListener('mouseleave', () => {
         clearTimeout(enterTimer)
      })
   })
   //  휠 스크롤
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
})

document.addEventListener('DOMContentLoaded', () => {
   const scrollToTopBtn = document.getElementById('scrollToTopBtn')
   // 스크롤 감지해서 버튼 보여주기
   window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
         scrollToTopBtn.classList.add('show')
      } else {
         scrollToTopBtn.classList.remove('show')
      }
   })
   // 버튼 클릭 시 맨 위로 이동
   scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth',
      })
   })
})
