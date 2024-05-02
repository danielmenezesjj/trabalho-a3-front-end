// All components mapping with path for internal routes

import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Welcome = lazy(() => import('../pages/protected/Welcome'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Produtos = lazy(() => import('../pages/protected/Produtos'))
const ModuloSuperMercado = lazy(() => import('../pages/protected/ModuloSuperMercado'))
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))
const Funcionarios = lazy(() => import('../pages/protected/Funcionarios'))
const Register = lazy(() => import('../pages/Register'))


const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/welcome', // the url
    component: Welcome, // view rendered
  },
  {
    path: '/vendas',
    component: ModuloSuperMercado,
  },
  {
    path: '/produtos',
    component: Produtos,
  },
  {
    path: '/funcionarios',
    component: Funcionarios,
  },
  {
    path: '/settings-profile',
    component: ProfileSettings,
  },
  {
    path: '/register',
    component: Register,
  },

  {
    path: '/404',
    component: Page404,
  },

]

export default routes
