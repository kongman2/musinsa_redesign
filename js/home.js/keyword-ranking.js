import { Products } from '../json-data.js'
const keywordList = document.getElementById('keywordList')
const rankingTrack = document.getElementById('rankingCardTrack')
const keywordprevBtn = document.getElementById('rankingPrevBtn')
const keywordnextBtn = document.getElementById('rankingNextBtn')
let keywordCurrentSlide = 0
let activeChildren = []
// 필터링할 탭 목록
const allowedTabs = ['여쿨룩 특가', '스포츠위크', '무배당발', '체험단', '990 딜', '월간 입점회', '바캉스 잡화위크']
function renderKeywords() {
   const filteredTabs = Products.filter((p) => allowedTabs.includes(p.tab))
   // 탭 버튼 생성
   const uniqueTabs = [...new Set(filteredTabs.map((item) => item.tab))]
   uniqueTabs.forEach((tabName, idx) => {
      const btn = document.createElement('div')
      btn.className = 'keyword-btn'
      btn.textContent = tabName
      btn.addEventListener('click', () => {
         document.querySelectorAll('.keyword-btn').forEach((el) => el.classList.remove('active'))
         btn.classList.add('active')
         keywordCurrentSlide = 0
         activeChildren = filteredTabs.filter((p) => p.tab === tabName)
         renderCards()
      })
      if (idx === 0) btn.classList.add('active')
      keywordList.appendChild(btn)
   })
   // 초기 렌더링
   activeChildren = filteredTabs.filter((p) => p.tab === uniqueTabs[0])
   renderCards()
}
function renderCards() {
   const isMobile = window.innerWidth <= 768
   const groupSize = isMobile ? 6 : 8 // 모바일: 2행 2열, PC: 2행 4열
   const groups = Math.ceil(activeChildren.length / groupSize)
   rankingTrack.innerHTML = ''
   for (let i = 0; i < groups; i++) {
      const group = document.createElement('div')
      group.className = 'rankingcard-group'
      const slice = activeChildren.slice(i * groupSize, (i + 1) * groupSize)
      slice.forEach((card) => {
         const el = document.createElement('a')
         el.className = 'rankingcard'
         if (card.tab === '체험단') {
            el.href = `./experiencedetail.html?tab=${card.tab}&id=${card.id}`
         } else {
            el.href = `./productdetail.html?id=${card.id}`
         }

         if (card.tab === '체험단') {
            el.innerHTML = `
          <img src="${card.img}" alt="${card.name}" />
            <p class="brand">${card.brand}</p>
            <p class="name">${card.name}</p>
            <div class="price">
              <span class="sale">${card.count}명 모집</span>
              <span class="amount">D-${card.date}</span>
            </div>
   `
         } else if (card.discount === '') {
            el.innerHTML = `
            <img src="${card.img}" alt="${card.name}"  />
            <p class="brand">${card.brand}</p>
            <p class="name">${card.name}</p>
            <p class="amount">${card.price}원</p>
         `
         } else {
            el.innerHTML = `
            <img src="${card.img}" alt="${card.name}"  />
            <p class="brand">${card.brand}</p>
            <p class="name">${card.name}</p>
            <div class="price">
              <span class="sale">${card.discount}</span>
              <span class="amount" >${card.price}원</span>
            </div>
         `
         }
         group.appendChild(el)
      })
      rankingTrack.appendChild(group)
   }
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
