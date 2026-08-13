export type ProcessStep = {
  image: string

  imageTablet?: string
  imageMobile?: string
  name: string
  nameMobile: string
  desc: string
}

export const process = {
  title: 'Одна платформа — весь маркетинг',
  titleMobile: ['Одна платформа —', 'весь маркетинг'],
  subtitle: 'Сайты, изображения, видео, баннеры и презентации — из одной идеи, в вашем стиле',
  steps: [
    {
      image: 'process-design-system.webp',
      name: 'Дизайн-система — ядро платформы',
      nameMobile: 'Дизайн-система Снэпбилд',
      desc: 'Ваши компоненты, цвета и шрифты — единственный источник стиля',
    },
    {
      image: 'process-flexible-configuration.webp',
      imageTablet: 'process-flexible-configuration-tablet.webp',
      imageMobile: 'process-flexible-configuration-mobile.webp',
      name: 'Гибкая конфигурация',
      nameMobile: 'Гибкая конфигурация',
      desc: 'Правила бренда задаются один раз — работают в каждой генерации',
    },
    {
      image: 'process-compliance.webp',
      name: 'Соответствие по умолчанию',
      nameMobile: 'Соответствие по умолчанию',
      desc: 'AI не может нарушить бренд: сайты, изображения, видео, баннеры и презентации — строго по вашим правилам',
    },
  ] satisfies ProcessStep[],
}
