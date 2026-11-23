import { routes } from './routes'

export type Crumb = {
  name: string
  to?: string
}

export function trail(...crumbs: Crumb[]): Crumb[] {
  return [{ name: 'Home', to: routes.home }, ...crumbs]
}
