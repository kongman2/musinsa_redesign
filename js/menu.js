import { data } from './json-data.js'

document.addEventListener('DOMContentLoaded', () => {
   const isMobile = window.innerWidth <= 768
   const toggleBtn = document.getElementById('searchToggleBtn')
   const slide = document.getElementById('searchSlide')
   const closeBtn = document.getElementById('closeSearchBtn')
   toggleBtn?.addEventListener('click', () => {
      slide.classList.add('show')
      toggleBtn.classList.add('hide')
   })
   closeBtn?.addEventListener('click', () => {
      slide.classList.remove('show')
      toggleBtn.classList.remove('hide')
   })
   const hamburgerBtn = document.getElementById('hamburgerBtn')
   const menuModal = document.getElementById('menuModal')
   const overlay = document.querySelector('.overlay')
   const closeModalBtn = document.querySelector('.modal-close')
   const tabs = document.querySelectorAll('.tab')
   const headerList = document.getElementById('headerList')
   const cardContainer = document.getElementById('hoverCards')
   const body = document.body
   let currentTab = 'category'
   // 메뉴 열기
   hamburgerBtn?.addEventListener('click', () => {
      menuModal.classList.remove('hide')
      menuModal.classList.add('show')
      if (!isMobile) {
         body.classList.add('no-scroll')
      }
      setActiveTab('category')
      renderHeaderList('category')
      renderCards('category', '상의')
   })
   // 메뉴 닫기
   const closeMenu = () => {
      const isNowMobile = window.innerWidth <= 768

      menuModal.classList.remove('show')
      menuModal.classList.add('hide')
      if (!isNowMobile) {
         body.classList.remove('no-scroll')
      }
   }
   closeModalBtn?.addEventListener('click', closeMenu)
   overlay?.addEventListener('click', closeMenu)
   // 탭 클릭
   tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
         const target = tab.getAttribute('data-target')
         setActiveTab(target)
         renderHeaderList(target)
         if (data[target] && data[target][0]) {
            renderCards(target, data[target][0].name)
         }
      })
   })
   function setActiveTab(target) {
      tabs.forEach((t) => t.classList.remove('active'))
      document.querySelector(`.tab[data-target="${target}"]`).classList.add('active')
      currentTab = target
   }
   function renderHeaderList(target) {
      headerList.innerHTML = ''
      data[target].forEach((item) => {
         const li = document.createElement('li')
         li.textContent = item.name
         if ((target === 'category' && item.name === '상의') || (target === 'service' && item.name === data[target][0].name)) {
            li.classList.add('active-name')
         }
         li.addEventListener('click', () => {
            headerList.querySelectorAll('li').forEach((el) => el.classList.remove('active-name'))
            li.classList.add('active-name')
            renderCards(target, item.name)
         })
         headerList.appendChild(li)
      })
   }
   function renderCards(tabType, name) {
      const selected = data[tabType].find((item) => item.name === name)
      cardContainer.innerHTML = ''
      const cardList = document.createElement('div')
      cardList.className = 'hover-card-list'
      selected.children.forEach((child) => {
         const card = document.createElement('div')
         card.className = 'hover-card'
         if (tabType === 'category') {
            card.innerHTML = `
          <div>
            <a href="../products-list.html?category=${encodeURIComponent(name)}&name=${encodeURIComponent(child.name)}">
              <img src="${child.img}" alt="${child.name}" />
              <p>${child.name}</p>
            </a>
          </div>
        `
         } else {
            card.innerHTML = `<p style="width: 130px; ">${child.name}</p>`
            card.style.padding = '20px'
            card.style.background = '#F3F3F3'
         }
         cardList.appendChild(card)
      })
      cardContainer.appendChild(cardList)
   }

   // 리사이즈 대응: 화면 크기 변경 시 모달 상태 다시 맞춰줌
   window.addEventListener('resize', () => {
      const isNowMobile = window.innerWidth <= 768
      // 메뉴가 열려 있는 상태일 때만 처리
      if (menuModal.classList.contains('show')) {
         if (isNowMobile) {
            // 모바일일 경우: body 스크롤 허용
            body.classList.remove('no-scroll')
         } else {
            // PC일 경우: 모달처럼 보여야 하므로 스크롤 막음
            body.classList.add('no-scroll')
         }
      } else {
         // 메뉴가 닫혀 있을 경우 항상 no-scroll 제거
         body.classList.remove('no-scroll')
      }
   })
})
