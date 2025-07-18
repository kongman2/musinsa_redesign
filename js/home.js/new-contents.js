import { contentsData } from '../json-data.js'

const contentsTrack = document.getElementById('contentsTrack')
const contentsDots = document.getElementById('contentsDots')
const prevBtn = document.querySelector('.content-nav.prev')
const nextBtn = document.querySelector('.content-nav.next')
let currentContentSlide = 0
function renderContentsSlides() {
   contentsTrack.innerHTML = ''
   contentsDots.innerHTML = ''
   contentsData.forEach((item, i) => {
      const card = document.createElement('div')
      card.className = 'content-card'
      card.innerHTML = `
      <div>
      <a href="./contents-list.html?id=${item.id}" >
      <img src="${item.img}" alt="${item.title}" />
      <p class="title">${item.title}</p>
      <p class="desc">${item.desc}</p>
      <div class="meta">
        <span class="info">${item.info}</span>
        <span class="views">조회수 ${item.views}</span>
      </div>
       </a>
      </div>

    `
      contentsTrack.appendChild(card)
      const dot = document.createElement('span')
      dot.className = 'dot'
      if (i === 0) dot.classList.add('active')
      dot.addEventListener('click', () => {
         currentContentSlide = i
         updateContentsSlide()
      })
      contentsDots.appendChild(dot)
   })
   updateContentsSlide()
}
function updateContentsSlide() {
   const cardWidth = document.querySelector('.content-card')?.offsetWidth || 0
   contentsTrack.style.transform = `translateX(-${cardWidth * currentContentSlide}px)`
   document.querySelectorAll('#contentsDots .dot').forEach((dot, i) => dot.classList.toggle('active', i === currentContentSlide))
}
// :오른쪽을_가리키는_손_모양: 버튼 이벤트
prevBtn.addEventListener('click', () => {
   if (currentContentSlide > 0) {
      currentContentSlide--
      updateContentsSlide()
   }
})
nextBtn.addEventListener('click', () => {
   const maxSlide = contentsData.length - 1
   if (currentContentSlide < maxSlide) {
      currentContentSlide++
      updateContentsSlide()
   }
})
window.addEventListener('resize', updateContentsSlide)
renderContentsSlides()
