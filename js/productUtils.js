import { Products as RawProducts } from './json-data.js'
// 1. 로컬스토리지에서 불러오거나 원본 사용
export let Products = JSON.parse(localStorage.getItem('products')) || RawProducts
// 2. 로컬스토리지에 저장
export function saveProductsToStorage() {
   localStorage.setItem('products', JSON.stringify(Products))
}
// 3. 좋아요 상태 토글
export function toggleLike(id) {
   Products = Products.map((item) => (item.id === id ? { ...item, liked: !item.liked } : item))
   localStorage.setItem('products', JSON.stringify(Products))
}
// 4. 좋아요된 상품 목록 가져오기
export function getLikedProducts() {
   return Products.filter((p) => p.liked)
}
// 5. 카테고리 + 서브카테고리로 필터
export function getFilteredProducts(category, subCategory) {
   return Products.filter((p) => p.category === category && p.subCategory === subCategory)
}
// 6. 특정 카테고리의 하위 subCategory 목록
export function getSubCategories(category) {
   return [...new Set(Products.filter((p) => p.category === category).map((p) => p.subCategory))]
}
// 7. ID로 상품 가져오기 (상세 페이지용)
export function getProductById(id) {
   return Products.find((p) => String(p.id) === String(id))
}

export function getProducts() {
   return Products
}
