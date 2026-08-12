import { Button } from './components/ui/Button'
import { Section } from './components/ui/Section'

/**
 * Временная заглушка ветки chore/scaffold: проверяет, что токены, шрифт
 * и сборка на GitHub Pages работают. Заменяется секциями лендинга.
 */
export default function App() {
  return (
    <main>
      <Section>
        <p className="text-ink-muted text-sm">Каркас проекта</p>
        <h1 className="text-h1 mt-4 max-w-3xl">
          Платформа, где все создается в рамках вашего бренда и дизайн-системы
        </h1>
        <p className="text-lead text-ink-muted mt-6 max-w-xl">
          Шрифт, палитра, радиусы и вертикальный ритм подключены из токенов,
          снятых с исходного лендинга.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="#">Начать сейчас</Button>
          <Button variant="secondary" href="#">
            Запросить демо
          </Button>
        </div>
      </Section>
    </main>
  )
}
