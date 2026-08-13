/** Тексты и ссылки общих элементов страницы. Разметка их не хранит. */

export type NavLink = {
  label: string
  href: string
}

/** Приложение, куда ведут все кнопки «Начать сейчас». */
export const appUrl = 'https://builder.snapbuild.ru/'

/** «Тарифы» — пункт новой секции, у оригинала в шапке его нет. */
export const navLinks: NavLink[] = [
  { label: 'Продукт', href: '#process' },
  { label: 'Возможности', href: '#use-cases' },
  { label: 'Безопасность', href: '#features' },
  { label: 'Тарифы', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

/** В мобильном меню оригинала «Возможности» стоят первыми. */
export const mobileNavLinks: NavLink[] = [
  navLinks[1],
  navLinks[0],
  navLinks[2],
  navLinks[3],
  navLinks[4],
]

export const ctaLabel = 'Начать сейчас'

export const hero = {
  title: 'Платформа, где все создается в рамках вашего бренда и дизайн-системы',
  subtitle:
    'Подключите дизайн-систему к Снэпбилду, чтобы каждый участник команды мог создавать профессиональные материалы в фирменном стиле за минуты, а не дни.',
}

export const footer = {
  tagline: 'Платформа, где все создается в рамках вашего бренда и дизайн-системы',
  email: 'hey@snapbuild.ru',
  copyright: '© Сгенерировано в Снэпбилде. Все права защищены.',
  columns: [
    {
      title: 'Навигация',
      links: [
        { label: 'Продукт', href: '#process' },
        { label: 'Возможности', href: '#use-cases' },
        { label: 'Преимущества', href: '#compare' },
        { label: 'Безопасность', href: '#features' },
        { label: 'Роадмап', href: '#roadmap' },
        { label: 'Тарифы', href: '#pricing' },
        { label: 'Отзывы', href: '#testimonials' },
        { label: 'Частые вопросы', href: '#faq' },
      ],
    },
    {
      title: 'Документация',
      links: [
        { label: 'Политика конфиденциальности', href: 'https://snapbuild.ru/privacy' },
        { label: 'FAQ', href: '#faq' },
      ],
    },
    {
      title: 'Контакты',
      links: [
        { label: 'Оставить заявку', href: '#request' },
        { label: 'Запросить демо', href: 'https://t.me/ochen_darya' },
        { label: 'Telegram', href: 'https://t.me/snapbuild' },
      ],
    },
  ],
} satisfies {
  tagline: string
  email: string
  copyright: string
  columns: { title: string; links: NavLink[] }[]
}
