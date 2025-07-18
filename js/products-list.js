import { Products as RawProducts } from './json-data.js'
const params = new URLSearchParams(location.search)
const categoryParam = params.get('category')
const nameParam = params.get('name')
const title = document.getElementById('sectionTitle')
const list = document.getElementById('productList')
if (!title || !list) {
   console.error('sectionTitle 또는 productList 요소가 존재하지 않습니다.')
} else {
   title.textContent = `${categoryParam} > ${nameParam}`
   try {
      // 필터링: category와 subCategory가 모두 일치하는 항목만

      const filteredProducts = RawProducts.filter((item) => item.category === categoryParam && item.subCategory === nameParam)
      console.log(filteredProducts)
      if (filteredProducts.length > 0) {
         filteredProducts.forEach((item) => {
            const card = document.createElement('div')
            card.className = 'content-card'
            card.innerHTML = `
               <a href="productdetail.html?id=${item.id}">
                  <img src="${item.img}" alt="${item.name}">
                  <p>${item.name}</p>
                  <div class="price">
                     ${item.discount ? `<span style="color: red" class="sale">${item.discount}%</span>` : ''}
                     <span class="amount">${item.price}원</span>
                  </div>
               </a>`
            list.appendChild(card)
         })
      } else {
         list.innerHTML = `<p>해당 상품이 없습니다.</p>`
      }
   } catch (e) {
      list.innerHTML = `<p>오류 발생: ${e.message}</p>`
   }
}
