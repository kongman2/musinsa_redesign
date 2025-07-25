import { Products } from './json-data.js'
const container = document.querySelector('.like-products')
const categoryTabs = document.querySelectorAll('.like-subcategory li')
let currentCategory = '전체'
// 상품 렌더링
function renderProducts() {
   container.innerHTML = ''
   // 현재 탭에 따라 liked=true인 것만 필터링
   const filtered = currentCategory === '전체' ? Products.filter((item) => item.liked) : Products.filter((item) => item.category === currentCategory && item.liked)
   // 카드 렌더링
   filtered.forEach((item) => {
      const card = document.createElement('div')
      card.className = 'product-card'
      card.innerHTML = `
      <a href="productdetail.html?id=${item.id}" class="card-img">
      <img src="${item.img}" alt="${item.name}" />
      
      <div class="info">
        <p class="brand">${item.brand}</p>
        <p class="name">${item.name}</p>
        <p class="price">
         ${item.discount ? `<span class="discount">${item.discount}</span>` : ''} ${item.price}원
        </p>
      </a>
      <button class="heart-btn" data-id="${item.id}">
        <img src="./images/${item.liked ? 'r_heart_icon.png' : 'tabler_heart.png'}" alt="하트" />
      </button>
    `
      container.appendChild(card)
   })
   // 하트 버튼 클릭 시 상태 토글
   document.querySelectorAll('.heart-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
         const id = parseInt(btn.dataset.id)
         const product = Products.find((p) => p.id === id)
         product.liked = !product.liked
         renderProducts() // liked = false면 자동 제거됨
      })
   })
}
// 탭 클릭 이벤트
categoryTabs.forEach((tab) => {
   tab.addEventListener('click', () => {
      categoryTabs.forEach((t) => t.classList.remove('active'))
      tab.classList.add('active')
      currentCategory = tab.dataset.category
      renderProducts()
   })
})
// 초기 렌더링
renderProducts()
