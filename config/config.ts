import { defineConfig } from 'umi'
import routes from './routes'
import theme from './theme'

export default defineConfig({
  links: [{ rel: 'icon', href: '/logo.ico' }],
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  theme: theme,
  antd: {
    dark: false,
    compact: false,
  },
  dva: { }
});
