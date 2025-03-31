<script setup>
    import { RouterLink, RouterView, useRouter } from 'vue-router'
    import {ref, onMounted} from 'vue';

    const router = useRouter();
    const isLoggedIn = ref(false);

    onMounted(() => {
        isLoggedIn.value = localStorage.getItem('token') ? true : false;
    });

    const handleLogout = () =>{
        localStorage.removeItem('token');
        isLoggedIn.value = false;
        router.push('/login');
    }
    
</script>

<template>
    <header class="header">
        <nav class="nav">
            <div class="nav-links"> 
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/events">Events</RouterLink>

                <template v-if="!isLoggedIn">
                    <RouterLink to="/login">Login</RouterLink>
                    <RouterLink to="/register">Register</RouterLink>
                </template>

                <template v-if="isLoggedIn">
                    <RouterLink to="/profile">Profile</RouterLink>
                    <RouterLink to="/logout">Logout</RouterLink>
                </template>
            </div>
        </nav>
    </header>
</template>

<style scoped>
.header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem;
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: #333;
}

.nav-links a:hover {
  color: #666;
}
</style>
