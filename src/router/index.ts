import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginView from '../views/LoginView.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
  },
  {
    path: '/dashboard/:id',
    name: 'dashboard',
    props: true,
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/DashboardView.vue')
  },
  {
    path: '/modules',
    name: 'modules',
    component: () => import(/* webpackChunkName: "modules" */ '../views/ModulesView.vue'),
  },
  {
    path: '/modules/:id',
    name: 'module',
    component: () => import(/* webpackChunkName: "module" */ '../views/ModulView.vue'),
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "settings" */ '../views/SettingsView.vue')
  },
  {
    path: '/permissions/:id',
    name: 'permissions',
    props: true,
    component: () => import(/* webpackChunkName: "permissions" */ '../views/ManagePermisions.vue')
  },
  {
    path: '/teams',
    name: 'teams',
    component: () => import(/* webpackChunkName: "teams" */ '../views/TeamsView.vue')
  },
  {
    path: '/teams/:id',
    name: 'team',
    props: true,
    component: () => import(/* webpackChunkName: "team" */ '../views/TeamView.vue')
  },
  {
    path: '/avatar',
    name: 'avatar',
    component: () => import(/* webpackChunkName: "avatar" */ '../views/GenerateAvatar.vue')
  },
  {
    path: '/types',
    name: 'types',
    component: () => import(/* webpackChunkName: 'types' */ '../views/DeviceTypeView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  
  if(sessionStorage.getItem('user') == undefined && localStorage.getItem('user') != undefined){
    sessionStorage.setItem('user', localStorage.getItem('user') || '{}')
    sessionStorage.setItem('jwt', Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5));
  }

  if (to.name !== 'login' && to.name !== 'register' && sessionStorage.getItem('jwt') == null) next({ name: 'login' })
  else if (to.name == 'login' && sessionStorage.getItem('jwt') != null ) next({ name: 'home' })
  else next()
})

export default router
