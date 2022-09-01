import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'login',
        component: () => import('./components/Login.vue')
    },
    {
        path: '/chat',
        name: 'chatbox',
        component: () => import('./components/ChatBox.vue')
    },
    // {
    //     path: "*",
    //     redirect: "/"
    // }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: () => {
        history.pushState(null, "", document.URL)
    }
});

router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        next();
    } else {
        let token = localStorage.getItem('Authorization');
        if (token === null || token === '') {
            next('/');
        } else {
            next();
        }
    }
});

export { router }

