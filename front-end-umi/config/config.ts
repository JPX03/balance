import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  // layout: {},
  mfsu: {},
  fastRefresh: {},
  devServer: {
    port: 8000,
  },
  title: 'balance',
});
