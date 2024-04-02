import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/layouts',
      name: 'layouts',
      component: () => import('@/views/LayoutView.vue'),
      children: [
        {
          path: '/',
          name: 'Login',
          component: () => import('../views/LoginView.vue')
        },
        {
          path: '/users',
          name: 'Users',
          component: () => import('../views/UsersView.vue')
        },
        {
          path: '/groups',
          name: 'Groups',
          component: () => import('../views/GroupsView.vue')
        },
        {
          path: '/groups/:id',
          name: 'DetailsGroup',
          component: () => import('../views/DetailsGroup.vue'),
          props: true,
        },
      ]
    },

  ]
})

export default router
