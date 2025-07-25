import { data } from './json-data.js'
document.addEventListener('DOMContentLoaded', () => {
   const toggleBtn = document.getElementById('searchToggleBtn')
   const slide = document.getElementById('searchSlide')
   const closeBtn = document.getElementById('closeSearchBtn')
   const hamburgerBtn = document.getElementById('hamburgerBtn')
   const mobileCategoryBtn = document.getElementById('mobileCategoryBtn')
   const menuModal = document.getElementById('menuModal')
   const overlay = document.querySelector('.overlay')
   const closeModalBtn = document.querySelector('.modal-close')
   const tabs = document.querySelectorAll('.tab')
   const headerList = document.getElementById('headerList')
   const cardContainer = document.getElementById('hoverCards')
   const categoryIcon = document.getElementById('categoryIcon')
   const categoryBarLinks = document.querySelectorAll('#category-bar a')
   const body = document.body
   const modalWrapper = document.querySelector('.modal-wrapper')
   const modal = document.querySelector('.modal.centered')
   let currentTab = 'category'
   const categoryIconDefault = './images/e_category_icon.png'
   const categoryIconActive = './images/e_category_icon_active.png'
   // 검색창 열고 닫기
   toggleBtn?.addEventListener('click', () => {
      slide.classList.add('show')
      toggleBtn.classList.add('hide')
   })
   closeBtn?.addEventListener('click', () => {
      slide.classList.remove('show')
      toggleBtn.classList.remove('hide')
   })
   // 모바일 하단 카테고리 버튼 클릭
   mobileCategoryBtn?.addEventListener('click', () => {
      const isVisible = menuModal.classList.contains('show')
      if (isVisible) {
         closeMenuModal()
         mobileCategoryBtn.classList.remove('active')
         categoryIcon.setAttribute('src', categoryIconDefault)
      } else {
         openMenuModal()
         mobileCategoryBtn.classList.add('active')
         categoryIcon.setAttribute('src', categoryIconActive)
      }
   })
   // 햄버거 버튼 클릭
   hamburgerBtn?.addEventListener('click', () => {
      openMenuModal()
   })
   closeModalBtn?.addEventListener('click', closeMenuModal)
   overlay?.addEventListener('click', closeMenuModal)
   // 탭 전환
   tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
         const target = tab.getAttribute('data-target')
         setActiveTab(target)
         renderHeaderList(target)
         if (data[target]?.[0]) {
            renderCards(target, data[target][0].name)
         }
      })
   })
   // 탭 활성화
   function setActiveTab(target) {
      tabs.forEach((t) => t.classList.remove('active'))
      document.querySelector(`.tab[data-target="${target}"]`).classList.add('active')
      currentTab = target
   }
   // 상단 카테고리 이름 리스트 렌더링
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
   // 하단 카드 리스트 렌더링
   function renderCards(tabType, name) {
      const selected = data[tabType].find((item) => item.name === name)
      cardContainer.innerHTML = ''
      const cardList = document.createElement('div')
      cardList.className = 'hover-card-list'
      if (tabType === 'service') cardList.classList.add('service')
      selected.children.forEach((child) => {
         const card = document.createElement('div')
         card.className = 'hover-card'
         card.style.background = 'var(--gray)'
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
            card.style.padding = '20px'
            card.style.background = 'var(--gray)'
            card.innerHTML = `<p>${child.name}</p>`
         }
         cardList.appendChild(card)
      })
      cardContainer.appendChild(cardList)
   }
   // 하단바 호버 이미지 변경
   categoryBarLinks.forEach((link) => {
      const img = link.querySelector('img')
      const src = img.getAttribute('src')
      const activeSrc = src.replace('.png', '_active.png')
      link.addEventListener('mouseenter', () => img.setAttribute('src', activeSrc))
      link.addEventListener('mouseleave', () => {
         if (!link.classList.contains('active')) {
            img.setAttribute('src', src)
         }
      })
   })
   if (mobileCategoryBtn) {
      const img = mobileCategoryBtn.querySelector('img')
      const src = img.getAttribute('src')
      const activeSrc = src.replace('.png', '_active.png')
      mobileCategoryBtn.addEventListener('mouseenter', () => img.setAttribute('src', activeSrc))
      mobileCategoryBtn.addEventListener('mouseleave', () => {
         if (!mobileCategoryBtn.classList.contains('active')) {
            img.setAttribute('src', src)
         }
      })
   }
   // 페이지 이동 시 현재 아이콘 유지
   const path = location.pathname
   const iconMap = {
      '/home.html': 'e_home_icon_active.png',
      '/likepage.html': 'e_heart_icon_active.png',
      '/mypage.html': 'e_person_icon_active.png',
      '/snap.html': 'e_snap_icon_active.png',
   }
   categoryBarLinks.forEach((a) => {
      const img = a.querySelector('img')
      const href = a.getAttribute('href')
      const page = href.split('/').pop()
      if (path.includes(page)) {
         a.classList.add('active')
         img.src = `./images/${iconMap[`/${page}`]}`
      }
   })
   // ===== 모달 열고 닫기 애니메이션 (모바일 전용) =====
   function openMenuModal() {
      const isMobile = window.innerWidth <= 768
      modalWrapper.classList.remove('hide')
      modalWrapper.classList.add('show')
      if (isMobile) {
         modal.style.animationName = 'slideUpModal'
      } else {
         modal.style.animationName = 'none'
         body.classList.add('no-scroll')
      }
      setActiveTab('category')
      renderHeaderList('category')
      renderCards('category', '상의')
   }
   function closeMenuModal() {
      const isMobile = window.innerWidth <= 768
      if (isMobile) {
         modal.style.animationName = 'slideDownModal'
         modal.addEventListener('animationend', function handler(e) {
            if (e.animationName === 'slideDownModal') {
               modalWrapper.classList.remove('show')
               modalWrapper.classList.add('hide')
               modal.removeEventListener('animationend', handler)
            }
         })
      } else {
         modalWrapper.classList.remove('show')
         modalWrapper.classList.add('hide')
         modal.style.animationName = 'none'
      }
      body.classList.remove('no-scroll')
      mobileCategoryBtn?.classList.remove('active')
      categoryIcon?.setAttribute('src', categoryIconDefault)
   }
   // 윈도우 리사이즈 시 스크롤 제어
   window.addEventListener('resize', () => {
      const isNowMobile = window.innerWidth <= 768
      if (menuModal.classList.contains('show')) {
         if (isNowMobile) {
            body.classList.remove('no-scroll')
         } else {
            body.classList.add('no-scroll')
         }
      } else {
         body.classList.remove('no-scroll')
      }
   })
})
