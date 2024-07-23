import { createLazyFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createLazyFileRoute('/about/')({
  component: About,
})

function About() {
  const { t } = useTranslation()

  return <h1>{t('Learn React')}</h1>
}
