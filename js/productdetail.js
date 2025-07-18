import { Products as RawProducts } from './json-data.js'
const params = new URLSearchParams(location.search)
const id = params.get('id')
const product = RawProducts.find((p) => String(p.id) === id)
const container = document.getElementById('productDetail')
const title = document.getElementById('sectionTitle')
if (!id || !product) {
   container.innerHTML = `<h2 class="error">:x: 해당 상품을 찾을 수 없습니다.</h2>`
} else {
   title.textContent = `${product.category} > ${product.subCategory} > (${product.brand})`
   // 이미지 2개
   document.getElementById('mainImageBox').innerHTML = `
    <img id="main-product-image" src="${product.img}" alt="${product.name}" />
    <img id="main-product-image" src="${product.img}" alt="${product.name}" />
  `
   // 제품 기본 정보
   document.getElementById('main-product-information').innerHTML = `
    <p class="brand-name">${product.brand}</p>
    <p class="product-name">${product.name}</p>
    <div class="information-1">
      <div class="product-grade">
        <img src="../images/star.png" alt="star" />
        <p class="grade"> ${product.grade}</p>
      </div>
      <p class="review">후기 ${product.review} 개</p>
      <img src="../images/tabler_heart.png" alt="heart" />
    </div>
    <p class="information-2">
      <span class="discount"${!product.discount ? ' style="display:none"' : ''}>${product.discount || ''}</span>
      <span class="amount">${product.price}</span>
    </p>
  `
   // 썸네일 이미지
   document.getElementById('snap-card-list').innerHTML = `
    <img id="product-image" src="${product.img}" alt="${product.name}" />
    <img id="product-image" src="${product.img}" alt="${product.name}" />
  `
   // 메인이미지 교체
   const mainImg = document.getElementById('main-product-image')
   const reviewImgEls = document.querySelectorAll('.review-image')
   reviewImgEls.forEach((img) => {
      img.addEventListener('click', () => {
         mainImg.src = img.src
      })
   })
   // 리뷰 슬라이드
   const reviewImages = product.reviewimg || []
   const track = document.getElementById('reviewSliderTrack')
   track.innerHTML = reviewImages.map((src) => `<img src="${src}" class="review-image" alt="리뷰 이미지">`).join('')
   let currentSlide = 0
   const maxSlide = reviewImages.length
   const prevBtn = document.getElementById('reviewPrev')
   const nextBtn = document.getElementById('reviewNext')
   function updateSlide() {
      const imgWidth = track.querySelector('.review-image')?.offsetWidth || 0
      track.style.transform = `translateX(-${imgWidth * currentSlide}px)`
   }
   nextBtn.addEventListener('click', () => {
      if (currentSlide < maxSlide - 3) {
         currentSlide++
         updateSlide()
      }
   })
   prevBtn.addEventListener('click', () => {
      if (currentSlide > 0) {
         currentSlide--
         updateSlide()
      }
   })
   // 하단 정보 탭 전환
   const tabButtons = document.querySelectorAll('.detail-information button')
   const tabContents = document.querySelectorAll('.tab-content')
   tabButtons.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
         tabContents.forEach((el) => (el.style.display = 'none'))
         tabButtons.forEach((b) => b.classList.remove('active'))
         tabContents[idx].style.display = 'block'
         btn.classList.add('active')
      })
   })
   tabContents.forEach((el, i) => (el.style.display = i === 0 ? 'block' : 'none'))
   tabButtons[0].classList.add('active')
   // 아코디언 혜택
   const expandBtn = document.getElementById('expandBtn')
   const collapseBtn = document.getElementById('collapseBtn')
   const moreSection = document.getElementById('moreBenefits')
   expandBtn.addEventListener('click', () => {
      moreSection.classList.add('open')
      expandBtn.style.display = 'none'
   })
   collapseBtn.addEventListener('click', () => {
      moreSection.classList.remove('open')
      expandBtn.style.display = 'block'
   })
   // 할인 텍스트 숨김 처리
   const discountEl = document.querySelector('.discount')
   if (!product.discount) {
      discountEl.style.display = 'none'
   }
   // 옵션 + 수량 선택 렌더링
   const optionBox = document.getElementById('main-option-box')
   const colors = [...new Set(product.options.map((o) => o.color))]
   optionBox.innerHTML = `
    <div class="option-group">
      <label for="colorSelect">색상</label>
      <select id="colorSelect">
        <option value="">선택</option>
        ${colors.map((color) => `<option value="${color}">${color}</option>`).join('')}
      </select>
    </div>
    <div class="option-group">
      <label for="sizeSelect">사이즈</label>
      <select id="sizeSelect" disabled>
        <option value="">먼저 색상을 선택하세요</option>
      </select>
    </div>
    <div class="option-group last-option">
      <p id="selectedOptionText"></p>
      <div class="quantity-box">
        <button id="decreaseQty">-</button>
        <input type="text" id="quantityInput" value="1" readonly />
        <button id="increaseQty">+</button>
      </div>
    </div>
  `
   const colorSelect = document.getElementById('colorSelect')
   const sizeSelect = document.getElementById('sizeSelect')
   const quantityInput = document.getElementById('quantityInput')
   let selectedStock = 0
   colorSelect.addEventListener('change', (e) => {
      const selectedColor = e.target.value
      const sizes = product.options.filter((opt) => opt.color === selectedColor)
      sizeSelect.innerHTML = `
      <option value="">선택</option>
      ${sizes
         .map(
            (opt) => `
        <option value="${opt.size}" ${opt.stock === 0 ? 'disabled' : ''}>
          ${opt.size} ${opt.stock === 0 ? '(품절)' : ''}
        </option>
      `
         )
         .join('')}
    `
      sizeSelect.disabled = false
      selectedStock = 0
      quantityInput.value = 1
   })
   sizeSelect.addEventListener('change', () => {
      const selectedColor = colorSelect.value
      const selectedSize = sizeSelect.value
      const opt = product.options.find((o) => o.color === selectedColor && o.size === selectedSize)
      selectedStock = opt?.stock || 0
      quantityInput.value = 1
      // :흰색_확인_표시: 옵션 텍스트 표시
      const optionTextEl = document.getElementById('selectedOptionText')
      if (optionTextEl && selectedColor && selectedSize) {
         optionTextEl.textContent = `${selectedColor} / ${selectedSize}`
      }
   })
   document.getElementById('increaseQty').addEventListener('click', () => {
      let qty = parseInt(quantityInput.value)
      if (qty < selectedStock) quantityInput.value = qty + 1
   })
   document.getElementById('decreaseQty').addEventListener('click', () => {
      let qty = parseInt(quantityInput.value)
      if (qty > 1) quantityInput.value = qty - 1
   })
   // 장바구니 버튼
   document.querySelector('.cart-button').addEventListener('click', () => {
      const color = colorSelect.value
      const size = sizeSelect.value
      const quantity = parseInt(quantityInput.value)
      if (!color || !size) return alert('옵션을 모두 선택해주세요.')
      const selectedOption = product.options.find((o) => o.color === color && o.size === size)
      if (!selectedOption || selectedOption.stock < quantity) {
         alert('재고가 부족합니다.')
         return
      }
      const cartItem = {
         id: product.id,
         name: product.name,
         brand: product.brand,
         price: product.price,
         discount: product.discount || '',
         color,
         size,
         quantity,
         stock: selectedOption.stock,
         img: product.img,
      }
      const cart = JSON.parse(localStorage.getItem('cart')) || []
      cart.push(cartItem)
      localStorage.setItem('cart', JSON.stringify(cart))
      alert('장바구니에 담겼습니다!')
   })
   // 구매하기 버튼
   document.querySelector('.buy-button').addEventListener('click', () => {
      const color = colorSelect.value
      const size = sizeSelect.value
      const quantity = parseInt(quantityInput.value)
      if (!color || !size) return alert('옵션을 모두 선택해주세요.')
      const selectedOption = product.options.find((o) => o.color === color && o.size === size)
      if (!selectedOption || selectedOption.stock < quantity) {
         alert('재고가 부족합니다.')
         return
      }
      const orderItem = {
         id: product.id,
         name: product.name,
         brand: product.brand,
         price: product.price,
         discount: product.discount || '',
         color,
         size,
         quantity,
         stock: selectedOption.stock,
         img: product.img,
      }
      localStorage.setItem('order', JSON.stringify([orderItem]))
      window.location.href = 'order.html'
   })
}
