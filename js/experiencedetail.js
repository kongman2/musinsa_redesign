import { Products } from './json-data.js'
const params = new URLSearchParams(location.search)
const id = params.get('id')
const product = Products.find((p) => String(p.id) === id)
if (!product) {
   document.querySelector('main').innerHTML = `<h2>:x: 해당 체험단을 찾을 수 없습니다.</h2>`
} else {
   const weekdays = ['일', '월', '화', '수', '목', '금', '토']
   const formatDate = (date) => {
      const d = new Date(date)
      return `${d.getFullYear()}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getDate().toString().padStart(2, '0')} (${weekdays[d.getDay()]})`
   }

   document.querySelector('#sectionTitle').innerHTML = `<p>${product.tab}</p>`

   // 날짜 계산
   const today = new Date()
   const 모집시작일 = today
   const 모집마감일 = new Date(today.getTime() + product.date * 24 * 60 * 60 * 1000)
   const 당첨자발표 = new Date(모집마감일.getTime() + 2 * 24 * 60 * 60 * 1000)
   const 제품발송일 = new Date(모집마감일.getTime() + 5 * 24 * 60 * 60 * 1000)
   const 후기작성시작 = new Date(제품발송일.getTime() + 3 * 24 * 60 * 60 * 1000)
   const 후기작성마감 = new Date(후기작성시작.getTime() + 7 * 24 * 60 * 60 * 1000)
   // 왼쪽 이미지 영역
   document.querySelector('.left-image-column').innerHTML = `
    <div class="product-image-box">
      <img src="${product.img}" alt="${product.name}" />

    </div>

  `
   // 오른쪽 일정 정보
   document.querySelector('.top-info').innerHTML = `
   <div>
         <div class="product-badge">
        <div class="brand">${product.brand}</div>
        <div class="d-day">D-${product.date}</div>
        <div class="like">
           <img src="${product.liked ? './images/r_heart_icon.png' : './images/l_heart_icon.png'}" alt="like" />
         </div>
      </div>
          <h3 class="product-name">${product.name}</h3>
      <article>
        <p>모집 현황</p>
        <p><span>${product.total_number}명 신청</span> | ${product.count}명</p>
      </article>
      <article>
       <p>모집 기간</p>
       <p>${formatDate(모집시작일)} ~ ${formatDate(모집마감일)}</p>
      </article>
      <article>
        <p>당첨자 발표</p>
        <p>${formatDate(당첨자발표)}</p>
      </article>
      <article>
        <p>제품 발송일</p>
        <p>${formatDate(제품발송일)}</p>
      </article>
      <article>
        <p>후기 작성 기간</p>
        <p>${formatDate(후기작성시작)} ~ ${formatDate(후기작성마감)}</p>
     </article>

      </div>

  `
}
