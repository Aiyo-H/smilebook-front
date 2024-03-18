<template>
  <div class="header">
    <router-link to="/" v-if="!myPage" class="header-logo">
      <img src="../assets/l2.jpg" alt="Logo" class="logo" /> SmileBook
    </router-link>
    <router-link to="/mainbook"  v-if="myPage" class="header-logo">
      <img src="../assets/l2.jpg" alt="Logo" class="logo" /> Return to Main
    </router-link>
    <div class="header-links">
      <template v-if="isLoggedIn">
        <router-link to="/create-recipe">Create!~</router-link>
        <router-link to="/my-page" v-if="!myPage">MyPage</router-link>
        <button @click="logout">Logout</button>
      </template>
      <template v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/sign-up">Sign Up</router-link>
      </template>
    </div>
  </div>
</template>

  
<script>
import axios from 'axios'
export default {
    name: 'Header',

    props: {
        myPage: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
        isLoggedIn: false
        };
    },
    created() {
        this.checkLoginStatus();
    },
    methods: {
        checkLoginStatus() {
            /* !! coerce the value retrieved from localstorage to boolean */
            this.isLoggedIn = !!localStorage.getItem('access_token');
            /*  console.log(this.isLoggedIn) */
        },
    
        async logout() {
            console.log(`Bearer ${localStorage.getItem('access_token')}`)
            let result = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/revoke`, {}, { // Empty object for POST body
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            this.$router.push('/logouted');
        }

    },

}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFD3B4;
  padding: 10px 50px;
  /* Add a box-shadow below */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Horizontal offset, Vertical offset, Blur radius, Color */
}

.header-logo {
  display: flex;
  align-items: center;
  color: #FF5733;
  text-decoration: none;
  font-size: 44px;
  font-weight: bold;
  font-family: 'Cute', sans-serif; /* Apply Poppins font */
}

.logo {
  width: 50px;
  margin-right: 10px;
}

.header-links a, .header-links button {
  font-family: 'Cute', sans-serif;
  font-weight: bold;
  margin-left: 40px;
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 35px;

  font-weight: bold;
  text-decoration: none;
}

.header-links a:hover, .header-links button:hover {
  text-decoration: underline;
  background: #ddd;
  color: white;
}
</style>