import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(VueRouter)

const routes = [
  {
    name: 'login',
    path: '/login',
    meta: {layout: 'empty'},
    component: () => import('../views/Login.vue')
  },
  {
    name: 'register',
    path: '/register',
    meta: {layout: 'empty'},
    component: () => import('../views/Register.vue')
  },
  { 
    name: 'home',
    path: '/',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Home.vue')
  },
  {
    name: 'categories',
    path: '/categories',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Categories.vue')
  },
  {
    name: 'history',
    path: '/history',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/History.vue')
  },
  {
    name: 'planning',
    path: '/planning',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Planning.vue')
  },
  {
    name: 'record',
    path: '/record',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Record.vue')
  },
  {
    name: 'detail',
    path: '/detail/:id',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Detail.vue')
  },
  {
    name: 'profile',
    path: '/profile',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Profile.vue')
  },
  {
    name: 'page404',
    path: '*',
    meta: {layout: 'page404'},
    component: () => import('../views/NotFound.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => { //вызывается перед каждой сменой роута
  firebase.auth().onAuthStateChanged((user) => {

    const requireAuth = to.matched.some(record => record.meta.auth)

    if(requireAuth && !user) {
      next('/login');
    } else {
      next();
    }
  });
})

export default router
