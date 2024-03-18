<template>
    <Header :myPage="true"/>
    <div v-if="recipe && recipe.author" class="recipe-detail">
      <h1>{{ recipe.name }}</h1>
      <img :src="recipe.cover_url" alt="Cover Image" class="recipe-cover">
      <div class="author-info">
        <img :src="recipe.author.avatar_url" @click='goToUserPage(recipe.author.username)' alt="Author" class="author-avatar"/>
        <span>{{ recipe.author.username }}</span>
      </div>
      <div class="status">
        <button @click="togglePublishStatus()"><strong>Status:</strong> {{ recipe.is_publish ? 'Published' : 'Not Published' }}</button>
      </div>
      <p><strong>Description:</strong> {{ recipe.description }}</p>
      <p><strong>Servings:</strong> {{ recipe.num_of_servings }}</p>
      <p><strong>Cook Time:</strong> {{ recipe.cook_time }} minutes</p>
      <p><strong>Directions:</strong> {{ recipe.directions }}</p>
      <!-- Add more details as needed -->
    </div>
</template>
  
<script>
  import axios from 'axios'
  import Header from './Header.vue'
  
  export default {
    name: 'DetailPage',
    components: {
        Header,

    },
    data() {
        return {
            recipe: {
                author: {}
            }, // Initialize recipe data
        };
  },
  mounted() {
    this.fetchRecipeDetail();
  },
  methods: {
        async fetchRecipeDetail() {
            const recipeId = this.$route.params.id;
            const accessToken = localStorage.getItem('access_token');
            try {
                let result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/recipes/${recipeId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                this.recipe = result.data
                console.log(result)
            } catch (error) {
                console.error(error);
                if (error.response && error.response.status === 404) {
                    console.log("Recipe not found");
                } else {
                    await this.refreshAccessToken();
                    await this.fetchRecipeDetail();
                    console.log("some error occurs");

                }
            }
        },

        async togglePublishStatus() {
            const recipeId = this.$route.params.id;
            const accessToken = localStorage.getItem('access_token');
                try {
                    await axios.put(`${import.meta.env.VITE_API_BASE_URL}/recipes/${recipeId}/publish`, {}, {
                        headers: { 'Authorization': `Bearer ${accessToken}` },
                    });
                    // Toggle is_publish locally or fetch updated recipe data to reflect the change
                    this.recipe.is_publish = !this.recipe.is_publish;

                } catch (error) {
                    console.error('Failed to toggle publish status:', error);
                    // Handle error (e.g., show message to user)
                }
        },

        goToUserPage(username) {
            // Navigate to UserPage, passing the username as a parameter
            this.$router.push({ name: 'UserPage', params: { username: username }});
        },
        async refreshAccessToken() {
            const recipeId = this.$route.params.id;
            try {
                const refreshToken = localStorage.getItem('refresh_token');
                let result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/recipes/${recipeId}`, {
                    headers: {
                        'Authorization': `Bearer ${refreshToken}`
                    }
                });
                console.log(response)
                // Update access token in localStorage
                /* console.log('old token', localStorage.getItem('access_token')); */

                localStorage.setItem('access_token', response.data.token);
                /* console.log('new token', localStorage.getItem('access_token')); */
            } catch (refreshError) {
                console.error('Failed to refresh access token:', refreshError);
                // If refreshing fails, clear tokens and redirect to login
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                this.$router.push('/login');
                throw refreshError; // Stop further execution in case of error
            }
        },
    }
};
</script>
  
<style scoped>

.recipe-detail{
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
.recipe-cover {
  width: 100%; /* Adjust as needed */
  max-width: 600px; /* Adjust as needed */
  height: auto; /* Maintain aspect ratio */
  margin: 20px 0; /* Adjust as needed */
  border-radius: 25px;
}

.author-info {
  position: absolute;
  top: 30px;
  left: 30px;
  display: flex;
  align-items: center;
}

.author-avatar {
  width: 50px; /* Adjust as needed */
  height: 50px; /* Adjust as needed */
  object-fit: cover; /* Ensures the avatar fits well within the circle */
  border-radius: 50%; /* Creates a circular shape */
  margin-right: 10px; /* Optional: adds some spacing next to the username */
  cursor: pointer;
}

.author-avatar:hover {
  transform: translateY(-2px);
}

.status {
  position: absolute;
  top: 30px;
  right: 30px;
  padding: 10px;

}
button{
  cursor: pointer;
  border-radius: 5px;
  background-color: rgb(177, 235, 235);

}
/* Add more styles as needed */
</style>