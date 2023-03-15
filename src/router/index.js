import { createRouter,createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'categories.index',
        component: () => import("../views/categories/index.vue")
    },
    {
        path: '/create',
        name: 'categories.create',
        component: () => import("../views/categories/create.vue")
    },
    {
        path: '/edit/:id',
        name: 'categories.edit',
        component: () => import("../views/categories/edit.vue")
    },
];

const router = createRouter ({
    history: createWebHistory(),
    routes
});

export default router;