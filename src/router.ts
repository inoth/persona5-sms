import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        component: () => import('./components/Login.vue')
    },
    {
        path: '/chat',
        name: 'chatbox',
        component: () => import('./components/ChatBox.vue')
    },
    {
        path: '/msg',
        name: 'msgbox',
        component: () => import('./components/MessageBox.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        let token = localStorage.getItem('Authorization');
        if (token === null || token === '') {
            next('/login');
        } else {
            next();
        }
    }
});

export { router }

