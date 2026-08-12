/**
 * Путь к файлу из public/assets/images с учётом base-path GitHub Pages.
 * Изображения взяты с оригинального лендинга.
 */
export const asset = (file: string) => `${import.meta.env.BASE_URL}assets/images/${file}`
