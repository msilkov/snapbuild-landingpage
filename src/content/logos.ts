/**
 * Логобар. Логотипы разной плотности, поэтому оригинал выравнивает их не по
 * общей высоте, а по двум коэффициентам от базовой строки в 37 пикселей макета:
 * ratio — доля высоты, width — ширина картинки при этой высоте.
 * widthMobile нужен там, где на узком экране размер задан отдельно.
 */
export type Logo = {
  file: string
  name: string
  ratio: number
  width: number
  widthMobile?: number
}

export const logosEyebrow = 'С платформой работают команды, для которых бренд — закон'

export const logos: Logo[] = [
  // Два логотипа в оригинале без названия и без alt — опознать бренд нельзя,
  // поэтому они остаются декоративными.
  { file: 'logo-partner-1.svg', name: '', ratio: 0.5946, width: 100.85 },
  { file: 'logo-partner-2.svg', name: '', ratio: 0.8649, width: 43.44 },
  { file: 'logo-avito.svg', name: 'Авито', ratio: 0.7005, width: 102.19 },
  { file: 'logo-cian.svg', name: 'Циан', ratio: 1.1116, width: 113.58 },
  { file: 'logo-lenta.svg', name: 'Лента', ratio: 0.6511, width: 106.09, widthMobile: 100 },
]
