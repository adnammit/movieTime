<template>
    <div class="container-fluid mt-4 nav-bar">
        <v-app-bar app>
            <v-toolbar-title class="headline text-uppercase">
                <v-btn text href="/">
                    <span>WTFSWW</span>
                </v-btn>
            </v-toolbar-title>
            <v-btn text href="/collection">
                <span class="font-weight-light">My Collection</span>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text href="#" @click.prevent="login" v-if="!activeUser">
                <span class="mr-2">Log In</span>
            </v-btn>
            <v-btn text href="#" @click.prevent="logout" v-else>
                <span class="mr-2">Log Out</span>
            </v-btn>
        </v-app-bar>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import MovieApi from '@/services/api/MovieApi';
import { FilterModule } from '@/store/modules/filter';

@Component({})
export default class NavBar extends Vue {
    private activeUser: string | null = null;

    private login() {
        this.$auth.loginRedirect();
    }
    private async logout() {
        await this.$auth.logout();
        await this.refreshActiveUser();
        this.$router.push('/');
    }
    private async refreshActiveUser() {
        this.activeUser = await this.$auth.getUser();
    }
    @Watch('$route')
    onRouteChanged() {
        this.refreshActiveUser();
    }
    async mounted() {
        await this.refreshActiveUser();
    }
}
</script>

<style scoped lang="scss">
@import '@/style/colors';

.nav-bar {
    .v-toolbar {
        background-color: $mine-shaft !important;
        padding-bottom: -50px;
        color: $alto;
    }
}
</style>
