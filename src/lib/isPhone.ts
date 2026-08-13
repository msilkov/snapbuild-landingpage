/** Тот же брейкпоинт, что у мобильного макета: ниже него кадр открывается на весь экран. */
export const isPhone = () => window.matchMedia('(max-width: 767px)').matches
