import { Products as RawProducts } from './json-data.js'
// 전역 상품 목록
export let Products = JSON.parse(localStorage.getItem('products')) || RawProducts
// 로컬스토리지 저장
export function saveProductsToStorage() {
   localStorage.setItem('products', JSON.stringify(Products))
}
// 좋아요 상태 토글
export function toggleLike(productId) {
   const product = Products.find((p) => p.id === productId)
   if (product) {
      product.liked = !product.liked
      saveProductsToStorage()
   }
}
