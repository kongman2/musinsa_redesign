const contentsData = [
   {
      img: 'https://image.msscdn.net/thumbnails/campaign_service/images/cpcms/2025/80ec3f27940d48758e3532a3cdf352fb.jpg?w=750',
      title: '신제품 출시',
      desc: '2025년 여름 컬렉션 소개',
      info: '2025.07.10',
      views: '1,234',
   },
   {
      img: 'https://image.msscdn.net/thumbnails/campaign_service/images/cpcms/2025/80ec3f27940d48758e3532a3cdf352fb.jpg?w=750',
      title: '한정 세일',
      desc: '주말 단 3일간 세일 이벤트',
      info: '2025.07.09',
      views: '982',
   },
   {
      img: 'https://image.msscdn.net/thumbnails/campaign_service/images/cpcms/2025/80ec3f27940d48758e3532a3cdf352fb.jpg?w=750',
      title: '무신사 X 브랜드',
      desc: '콜라보 제품 출시',
      info: '2025.07.08',
      views: '2,476',
   },
   {
      img: 'https://image.msscdn.net/thumbnails/campaign_service/images/cpcms/2025/80ec3f27940d48758e3532a3cdf352fb.jpg?w=750',
      title: '신제품 출시',
      desc: '2025년 여름 컬렉션 소개',
      info: '2025.07.10',
      views: '1,234',
   },
   {
      img: 'https://image.msscdn.net/thumbnails/campaign_service/images/cpcms/2025/80ec3f27940d48758e3532a3cdf352fb.jpg?w=750',
      title: '한정 세일',
      desc: '주말 단 3일간 세일 이벤트',
      info: '2025.07.09',
      views: '982',
   },
   {
      img: 'https://image.msscdn.net/thumbnails/campaign_service/images/cpcms/2025/80ec3f27940d48758e3532a3cdf352fb.jpg?w=750',
      title: '무신사 X 브랜드',
      desc: '콜라보 제품 출시',
      info: '2025.07.08',
      views: '2,476',
   },
   {
      img: 'https://image.msscdn.net/thumbnails/campaign_service/images/cpcms/2025/80ec3f27940d48758e3532a3cdf352fb.jpg?w=750',
      title: '신제품 출시',
      desc: '2025년 여름 컬렉션 소개',
      info: '2025.07.10',
      views: '1,234',
   },
   {
      img: 'https://image.msscdn.net/thumbnails/campaign_service/images/cpcms/2025/80ec3f27940d48758e3532a3cdf352fb.jpg?w=750',
      title: '한정 세일',
      desc: '주말 단 3일간 세일 이벤트',
      info: '2025.07.09',
      views: '982',
   },
   {
      img: 'https://image.msscdn.net/thumbnails/campaign_service/images/cpcms/2025/80ec3f27940d48758e3532a3cdf352fb.jpg?w=750',
      title: '무신사 X 브랜드',
      desc: '콜라보 제품 출시',
      info: '2025.07.08',
      views: '2,476',
   },
]

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
      <img src="${item.img}" alt="${item.title}" />
      <p class="title">${item.title}</p>
      <p class="desc">${item.desc}</p>
      <div class="meta">
        <span class="info">${item.info}</span>
        <span class="views">조회수 ${item.views}</span>
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
