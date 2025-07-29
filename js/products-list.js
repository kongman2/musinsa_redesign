import { toggleLike, getFilteredProducts, getSubCategories } from './productUtils.js'
// 1. URL 파라미터 추출
const params = new URLSearchParams(location.search)
let categoryParam = params.get('category')
let nameParam = params.get('name')
// 2. DOM
const title = document.getElementById('sectionTitle')
const mobtitle = document.getElementById('mobSectionTitle')
const list = document.getElementById('productList')
const emptyLike = document.getElementById('emptyLike')
const bottomHeader = document.querySelector('.bottom_header')
// 3. 타이틀 표시
if (title && categoryParam && nameParam) title.textContent = `${categoryParam} > ${nameParam}`
if (mobtitle && categoryParam) mobtitle.textContent = categoryParam
// 4. 하위 탭 렌더링
function renderSubCategoryTabs() {
   const subCategoryList = getSubCategories(categoryParam)
   bottomHeader.innerHTML = ''
   subCategoryList.forEach((sub) => {
      const btn = document.createElement('button')
      btn.textContent = sub
      btn.className = 'sub-btn'
      if (sub === nameParam) btn.classList.add('active')
      btn.addEventListener('click', () => {
         const newParams = new URLSearchParams(location.search)
         newParams.set('name', sub)
         history.replaceState(null, '', `${location.pathname}?${newParams}`)
         nameParam = sub
         renderProducts()
         setActiveTab(sub)
      })
      bottomHeader.appendChild(btn)
   })
}
// 5. active 탭 변경
function setActiveTab(name) {
   document.querySelectorAll('.bottom_header .sub-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.textContent === name)
   })
}
// 6. 상품 렌더링
function renderProducts() {
   const filtered = getFilteredProducts(categoryParam, nameParam)
   list.innerHTML = ''
   if (filtered.length > 0) {
      list.style.display = 'grid'
      if (emptyLike) emptyLike.style.display = 'none'
      filtered.forEach((item) => {
         const card = document.createElement('div')
         card.className = 'content-card'
         card.innerHTML = `
        <a href="productdetail.html?id=${item.id}">
          <img src="${item.img}" alt="${item.name}">
          <p>${item.name}</p>
          <div class="price">
            ${item.discount ? `<span class="sale" style="color:red;">${item.discount}</span>` : ''}
            <span class="amount">${item.price}원</span>
          </div>
        </a>
        <button class="heart-btn" data-id="${item.id}">
          <img src="./images/${item.liked ? 'r_heart_icon.png' : 'tabler_heart.png'}" alt="하트" />
        </button>
      `
         list.appendChild(card)
      })
      document.querySelectorAll('.heart-btn').forEach((btn) => {
         btn.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()
            const id = parseInt(btn.dataset.id)
            toggleLike(id)
            renderProducts()
         })
      })
   } else {
      list.style.display = 'none'
      if (emptyLike) emptyLike.style.display = 'flex'
   }
}

// 7. 초기 실행
renderSubCategoryTabs()
renderProducts()
