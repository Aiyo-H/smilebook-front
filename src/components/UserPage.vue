<template>
    <Header :myPage="true"/>
    <div class="profile">
      <div class="basic-info">
        <img :src="userInfo.avatar_url" alt="User Avatar" class="avatar"/>
        <div class="info">
          <h2>{{ userInfo.username }}</h2>
          <p>Joined: {{ formatDate(userInfo.created_at) }}</p>
        </div>
      </div>
      <RecipeEntry
          v-for="recipe in recipes.data"
          :key="recipe.id"
          :recipe="recipe"
      />
      <div class="pagination">
        <button @click="fetchRecipes('first')">First</button>
        <button @click="fetchRecipes('prev')" :disabled="!recipes.links.prev">Prev</button>
        <button @click="fetchRecipes('next')" :disabled="!recipes.links.next">Next</button>
        <button @click="fetchRecipes('last')">Last</button>
      </div>
      <!-- Placeholder for the second part (user's recipes) -->
    </div>
</template>
  
<script>
import axios from 'axios'
import Header from './Header.vue'
import RecipeEntry from './RecipeEntry.vue'
export default {
    name: 'UserPage',

    components:{
      Header,
      RecipeEntry
    },

    data() {
        return {
            userInfo: {},
            recipes: { data: [], links: {} }
        };
    },

    mounted() {
        this.makeUserInfoRequest();
    },

    methods: {
        async makeUserInfoRequest() {
            const accessToken = localStorage.getItem('access_token');
            const usname = this.$route.params.username;
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/${usname}`);
            this.userInfo = response.data;
            const params = {
                visibility: 'all'
            };
            const response2 = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/${usname}/recipes`, {
                params,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }); 
            console.log(response2);   
            this.recipes = response2.data;
            /* console.log(this.userInfo.avatar_url); // Make sure to access userInfo correctly */
        },

        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        },

        async fetchRecipes(page) {
            if (this.recipes.links[page]) {
                try {
                    const url = new URL(this.recipes.links[page]);
                    const response = await axios.get(url.toString());
                    this.recipes = response.data;
                } catch (error) {
                    console.error(`Error fetching ${page} page of recipes:`, error);
                }
            }
        },
    },
};

</script>

<style scoped>
.profile .basic-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.basic-info {
  margin-bottom: 30px;
}
.profile{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f9fa;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 40px;
  margin: 50px auto;
  width: 45%;
  position: relative;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}


.info h2 {
  margin: 0;
}

.info p {
  margin: 5px 0;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
}

</style>