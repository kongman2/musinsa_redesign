import { Products } from './json-data.js'
const cartData = JSON.parse(localStorage.getItem('cart')) || []
const mainOptionBox = document.getElementById('mainOption')
const mainInfoBox = document.getElementById('main-product-information')
const benefitsBox = document.querySelector('#main-product-information3 > .benefits-info')
const buyBtnBox = document.querySelector('#main-product-information3 .button')
const deliveryFee = 3000
// 포맷 유틸
const formatNumber = (num) => num.toLocaleString('ko-KR')
const parsePrice = (str) => parseInt(str.replace(/,/g, ''))
//  카드 렌더링
function renderCartItems() {
   mainOptionBox.innerHTML = ''
   cartData.forEach((item, index) => {
      const product = Products.find((p) => p.id === item.id)
      if (!product) return
      const optionList = product.options
         .map((opt) => {
            const isSelected = opt.color === item.color && opt.size === item.size
            return `<option value="${opt.color}|${opt.size}" ${isSelected ? 'selected' : ''}>
        ${opt.color} / ${opt.size} ${opt.stock === 0 ? '(품절)' : ''}
      </option>`
         })
         .join('')
      const original = parsePrice(item.price)
      const discountRate = item.discount ? parseInt(item.discount) : 0
      const discountAmount = Math.floor((original * discountRate) / 100)
      const discounted = original - discountAmount
      const totalPrice = discounted * item.quantity
      const totalPoint = Math.floor(totalPrice * 0.01)

      const card = document.createElement('div')
      card.className = 'option-card'
      card.innerHTML = `
      <p class="brand-name">${item.brand}</p>
      <div class="product-info">
        <img src="${item.img}" alt="${item.name}" />
        <div class="option-box">
          <div class="top-option">
            <div class="product-name">
              <p>${item.name}</p>
              <button class="deleteBtn" data-index="${index}">×</button>
            </div>
            <div class="benefits-name">
              <div>한정판매</div>
              <div>장바구니 쿠폰</div>
            </div>
              <select class="optionSelect" data-index="${index}">
                ${optionList}
              </select>
          </div>
          <div class="bottom-option">
            <div class="quantity-box">
              <button class="minusBtn" data-index="${index}">-</button>
              <span class="quantity" id="quantity-${index}">${item.quantity}</span>
              <button class="plusBtn" data-index="${index}">+</button>
            </div>
            <div class="product-price">
              ${discountRate > 0 ? `<div class="original-price">${formatNumber(original)}원</div>` : ''}
              <div class="discounted-price">${formatNumber(totalPrice)}원</div>
            </div>
          </div>
        </div>
      </div>
    `
      mainOptionBox.appendChild(card)
   })
   updatePriceSummary()
   bindCartEvents()
}

mainOptionBox.addEventListener('change', (e) => {
   if (e.target.classList.contains('optionSelect')) {
      const idx = parseInt(e.target.dataset.index)
      const [newColor, newSize] = e.target.value.split('|')
      const product = Products.find((p) => p.id === cartData[idx].id)
      const matched = product.options.find((o) => o.color === newColor && o.size === newSize)
      if (matched) {
         cartData[idx].color = newColor
         cartData[idx].size = newSize
         cartData[idx].stock = matched.stock
         cartData[idx].quantity = Math.min(cartData[idx].quantity, matched.stock)
         localStorage.setItem('cart', JSON.stringify(cartData))
         // :흰색_확인_표시: 위에 옵션 텍스트 변경
         const optionTextEl = e.target.closest('.select-box').querySelector('p')
         if (optionTextEl) {
            optionTextEl.textContent = ` ${newColor} / ${newSize}`
         }
         renderCartItems() // 전체 리렌더링 대신 이 줄 주석처리해도 됨
      }
   }
})

// 가격 계산
function calculateTotal() {
   let totalOriginal = 0
   let totalDiscount = 0
   let totalFinal = 0
   let totalPoint = 0
   cartData.forEach((item) => {
      const original = parsePrice(item.price)
      const discountRate = item.discount ? parseInt(item.discount) : 0
      const discountAmount = Math.floor((original * discountRate) / 100)
      const final = (original - discountAmount) * item.quantity
      totalOriginal += original * item.quantity
      totalDiscount += discountAmount * item.quantity
      totalFinal += final
   })
   totalFinal += deliveryFee
   totalPoint = Math.floor(totalFinal * 0.01)
   return {
      totalOriginal,
      totalDiscount,
      totalFinal,
      totalPoint,
   }
}
// 요약 정보 렌더링
function updatePriceSummary() {
   const { totalOriginal, totalDiscount, totalFinal, totalPoint } = calculateTotal()
   mainInfoBox.innerHTML = `
    <div> 
      <p>총 상품 금액</p>
      <p>${formatNumber(totalOriginal)}원</p>
    </div>
    <div> 
      <p>할인 금액</p>
      <p>${formatNumber(totalDiscount)}원</p>
    </div>
    <div> 
      <p>쿠폰 할인</p>
      <button>쿠폰 선택</button>
    </div>
     <div> 
      <p>배송비</p>
      <p>${formatNumber(deliveryFee)}원</p>
    </div>
  `
   benefitsBox.innerHTML = `
    <p class="point1">${formatNumber(totalPoint)}원 최대적립</p>
    <div class="point2">
      <p>후기 적립</p>
      <p>${formatNumber(totalPoint)}원</p>
    </div>
  `
   buyBtnBox.innerHTML = `
    <button class="buy-button">총 ${formatNumber(totalFinal)}원 결제하기</button>
  `
   document.querySelector('.buy-button').addEventListener('click', () => {
      localStorage.setItem('order', JSON.stringify(cartData))
      window.location.href = 'order.html'
   })
}
// 이벤트 바인딩
function bindCartEvents() {
   mainOptionBox.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index)
      if (e.target.classList.contains('plusBtn')) {
         const max = cartData[index].stock
         if (cartData[index].quantity < max) {
            cartData[index].quantity++
            localStorage.setItem('cart', JSON.stringify(cartData))
            renderCartItems()
         }
      }
      if (e.target.classList.contains('minusBtn')) {
         if (cartData[index].quantity > 1) {
            cartData[index].quantity--
            localStorage.setItem('cart', JSON.stringify(cartData))
            renderCartItems()
         }
      }
      if (e.target.classList.contains('deleteBtn')) {
         cartData.splice(index, 1)
         localStorage.setItem('cart', JSON.stringify(cartData))
         renderCartItems()
      }
   })
}
// 실행
renderCartItems()
function renderRecommendedProducts() {
   const recommendBox = document.getElementById('recommendContainer')
   if (!Products || Products.length === 0 || cartData.length === 0) return
   // 1. 현재 장바구니 상품들의 카테고리/브랜드 추출
   const cartIds = cartData.map((item) => item.id)
   const cartBrands = [...new Set(cartData.map((item) => item.brand))]
   const cartCategories = [
      ...new Set(
         cartData
            .map((item) => {
               const matched = Products.find((p) => p.id === item.id)
               return matched?.category
            })
            .filter(Boolean)
      ),
   ]
   // 2. 추천 후보 필터링
   const candidates = Products.filter((p) => {
      return !cartIds.includes(p.id) && (cartBrands.includes(p.brand) || cartCategories.includes(p.category))
   })
   // 3. 랜덤 4개 추출
   const recommendations = candidates.sort(() => 0.5 - Math.random()).slice(0, 4)
   recommendBox.innerHTML =
      recommendations
         .map(
            (p) => `
    <div class="recommend-card">
      <a href="productdetail.html?id=${p.id}">
        <img src="${p.img}" alt="${p.name}" />
        <p class="name">${p.name}</p>
        <p class="price">${p.price}원</p>
      </a>
    </div>
  `
         )
         .join('') || `<p>추천할 상품이 없습니다 😢</p>`
}
renderRecommendedProducts()
