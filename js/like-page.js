import { getProducts, toggleLike } from './productUtils.js'
const container = document.querySelector('.like-products')
const categoryTabs = document.querySelectorAll('.like-subcategory li')
let currentCategory = '전체'
// 상품 렌더링
function renderProducts() {
   const Products = getProducts() // 매번 최신 상태 반영
   container.innerHTML = ''
   const filtered = currentCategory === '전체' ? Products.filter((item) => item.liked) : Products.filter((item) => item.category === currentCategory && item.liked)
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
        </div>
      </a>
      <button class="heart-btn" data-id="${item.id}">
        <img src="./images/${item.liked ? 'r_heart_icon.png' : 'tabler_heart.png'}" alt="하트" />
      </button>
      `
      container.appendChild(card)
   })
   // 하트 버튼 클릭 시 상태 토글
   container.querySelectorAll('.heart-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
         e.preventDefault()
         e.stopPropagation()
         const id = parseInt(btn.dataset.id)
         toggleLike(id) // 로컬스토리지에 반영
         renderProducts() // UI 갱신
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
