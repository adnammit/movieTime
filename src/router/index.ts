import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello.vue'
import Collection from '@/components/Collection.vue'
import Auth from '@okta/okta-vue'

const config = require("@/config.json");
const authClient: string = config.authClient;
const clientId: string = config.clientId;
const redirectUrl: string = config.redirectUrl;

Vue.use(Auth, {
    issuer: authClient,
    client_id: clientId,
    redirect_uri: redirectUrl,
    scope: 'openid profile email'
})

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/implicit/callback',
            component: Auth.handleCallback()
        },
        {
            path: '/collection',
            name: 'Collection',
            component: Collection,
            // meta: {
            //     requiresAuth: true
            // }
        }
    ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
