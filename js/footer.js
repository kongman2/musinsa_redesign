document.addEventListener('DOMContentLoaded', () => {
   const footerItems = document.querySelectorAll('.mid_footer ul > li > p')
   footerItems.forEach((header) => {
      header.addEventListener('click', () => {
         const parentLi = header.parentElement
         // 열려있는 다른 li들 닫기 (하나만 열리게 하고 싶을 경우)
         document.querySelectorAll('.mid_footer ul > li.active').forEach((li) => {
            if (li !== parentLi) {
               li.classList.remove('active')
            }
         })
         // 현재 li 토글
         parentLi.classList.toggle('active')
      })
   })
})
