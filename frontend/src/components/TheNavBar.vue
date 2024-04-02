<script setup lang="ts">
import { computed, watchEffect } from "vue";
import router from "@/router";
import { useUserStore } from "@/stores";

const userStore = useUserStore();

const isOnline = computed(() => userStore.loggedIn);

const navigation = computed(() => [
    { name: 'Groups', to: 'Groups', current: router.currentRoute.value.name === 'Groups' },
    { name: 'Users', to: 'Users', current: router.currentRoute.value.name === 'Users' },
    ...(!isOnline.value ? [{ name: 'Login', to: 'Login', current: router.currentRoute.value.name === 'Login' }] : []),
]);

const logout = () => {
    userStore.setLoggedOut();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isOnline');
    router.push({ name: 'Login' });
};

// Reactively update the route's current status
watchEffect(() => {
    navigation.value.forEach(navItem => {
        navItem.current = router.currentRoute.value.name === navItem.to;
    });
});
</script>

<template>
    <nav class="navbar h-30">
        <div class="container d-flex">
            <a class="navbar-brand" href="#">
                <img src="@/assets/img/logo.svg" alt="Bootstrap" width="120" height="35">
            </a>
            <div class="menu-items ms-auto">
                <ul class="d-flex justify-content-end align-items-center m-0">
                    <li v-for="item in navigation" :key="item.name" :class="{ active: item.current }" class="ms-5">
                        <router-link :to="{ name: item.to }">{{ item.name }}</router-link>
                    </li>
                    <li class="ms-5" v-if="isOnline">
                        <button @click="logout" class="btn btn-danger">Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>



<style>
.h-30 {
    height: 4.5rem;
}

ul>li {
    list-style: none !important;
}

ul>li>a {
    text-decoration: none !important;
    color: white;
    font-weight: 600;
}
</style>