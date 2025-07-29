import { getProducts, toggleLike } from '../productUtils.js'

let Products = getProducts()
const keywordList = document.getElementById('keywordList')
const rankingTrack = document.getElementById('rankingCardTrack')
const keywordprevBtn = document.getElementById('rankingPrevBtn')
const keywordnextBtn = document.getElementById('rankingNextBtn')
let keywordCurrentSlide = 0
let activeChildren = []
const allowedTabs = ['여쿨룩 특가', '스포츠위크', '무배당발', '체험단', '990 딜', '월간 입점회', '바캉스 잡화위크']
let currentTabName = '' // 전역으로 선언
function renderKeywords() {
   const filteredTabs = Products.filter((p) => allowedTabs.includes(p.tab))
   const uniqueTabs = [...new Set(filteredTabs.map((item) => item.tab))]
   keywordList.innerHTML = ''
   uniqueTabs.forEach((tabName, idx) => {
      const btn = document.createElement('div')
      btn.className = 'keyword-btn'
      btn.textContent = tabName
      btn.addEventListener('click', () => {
         // :흰색_확인_표시: 클릭 시 현재 탭 갱신
         currentTabName = tabName
         document.querySelectorAll('.keyword-btn').forEach((el) => el.classList.remove('active'))
         btn.classList.add('active')
         keywordCurrentSlide = 0
         activeChildren = Products.filter((p) => p.tab === currentTabName)
         renderCards()
      })
      if (idx === 0) {
         btn.classList.add('active')
         currentTabName = tabName // :흰색_확인_표시: 초기 탭도 저장
      }
      keywordList.appendChild(btn)
   })
   // :흰색_확인_표시: 초기 렌더링
   activeChildren = Products.filter((p) => p.tab === currentTabName)
   renderCards()
}

function renderCards() {
   Products = getProducts()
   // :흰색_확인_표시: currentTabName이 유실되지 않았는지 검사
   if (!currentTabName) {
      const activeBtn = document.querySelector('.keyword-btn.active')
      currentTabName = activeBtn ? activeBtn.textContent : allowedTabs[0]
   }
   activeChildren = Products.filter((p) => p.tab === currentTabName)
   const isMobile = window.innerWidth <= 768
   const groupSize = isMobile ? 6 : 8
   const groups = Math.ceil(activeChildren.length / groupSize)
   rankingTrack.innerHTML = ''
   for (let i = 0; i < groups; i++) {
      const group = document.createElement('div')
      group.className = 'rankingcard-group'
      const slice = activeChildren.slice(i * groupSize, (i + 1) * groupSize)
      slice.forEach((card) => {
         const el = document.createElement('a')
         el.className = 'rankingcard'
         el.href = card.tab === '체험단' ? `./experiencedetail.html?tab=${card.tab}&id=${card.id}` : `./productdetail.html?id=${card.id}`
         el.innerHTML =
            card.tab === '체험단'
               ? `
               <img src="${card.img}" alt="${card.name}" />
               <p class="brand">${card.brand}</p>
               <p class="name">${card.name}</p>
               <div class="price">
                  <span class="sale">${card.count}명 모집</span>
                  <span class="amount">D-${card.date}</span>
               </div>
            `
               : card.discount === ''
               ? `
               <img src="${card.img}" alt="${card.name}" />
               <p class="brand">${card.brand}</p>
               <p class="name">${card.name}</p>
               <p class="amount">${card.price}원</p>
               <button class="heart-btn" data-id="${card.id}">
                  <img src="./images/${card.liked ? 'r_heart_icon.png' : 'tabler_heart.png'}" alt="하트" />
               </button>
            `
               : `
               <img src="${card.img}" alt="${card.name}" />
               <p class="brand">${card.brand}</p>
               <p class="name">${card.name}</p>
               <div class="price">
                  <span class="sale">${card.discount}</span>
                  <span class="amount">${card.price}원</span>
               </div>
               <button class="heart-btn" data-id="${card.id}">
                  <img src="./images/${card.liked ? 'r_heart_icon.png' : 'tabler_heart.png'}" alt="하트" />
               </button>
            `
         group.appendChild(el)
      })
      rankingTrack.appendChild(group)
   }
   // :흰색_확인_표시: 하트 이벤트
   document.querySelectorAll('.heart-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
         e.preventDefault()
         e.stopPropagation()
         const id = parseInt(btn.dataset.id)
         toggleLike(id)
         renderCards() // 다시 그리기
      })
   })
   updateSlider()
}

function updateSlider() {
   const group = document.querySelector('.rankingcard-group')
   if (!group) return
   const groupWidth = group.offsetWidth
   rankingTrack.style.transform = `translateX(-${keywordCurrentSlide * groupWidth}px)`
   keywordprevBtn.disabled = keywordCurrentSlide === 0
   keywordnextBtn.disabled = keywordCurrentSlide >= rankingTrack.children.length - 1
}
keywordprevBtn.addEventListener('click', () => {
   if (keywordCurrentSlide > 0) keywordCurrentSlide--
   updateSlider()
})
keywordnextBtn.addEventListener('click', () => {
   const maxSlide = rankingTrack.children.length - 1
   if (keywordCurrentSlide < maxSlide) keywordCurrentSlide++
   updateSlider()
})
window.addEventListener('resize', () => {
   renderCards()
   updateSlider()
})
renderKeywords()
