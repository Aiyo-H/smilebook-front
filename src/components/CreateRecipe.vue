<template>
    <Header />
    <div class="container">
      <div class="head">
        <h1>Create your new recipe here!</h1>
      </div>
      <div v-if="completeMessage" class="message">{{ completeMessage }}</div>
      <div class="create-recipe">
        <form @submit.prevent="createRecipe" class="form-list">
          <label>Name:</label>
          <input type="text" v-model="recipe.name" placeholder="Enter the name" required class="input-name">
          
          <label>Description:</label>
          <textarea v-model="recipe.description" placeholder="Enter a description" required class="input-description"></textarea>
          
          <div class="flex-inputs">
            <div>
              <label>Number of Servings:</label>
              <input type="number" v-model.number="recipe.num_of_servings" placeholder="0" required class="input-small">
            </div>
            
            <div>
              <label>Cook Time (minutes):</label>
              <input type="number" v-model.number="recipe.cook_time" placeholder="0" required class="input-small">
            </div>
          </div>
          
          <label>Ingredients:</label>
          <textarea v-model="recipe.ingredients" placeholder="List ingredients" required class="input-ingredients"></textarea>
          
          <label>Directions:</label>
          <textarea v-model="recipe.directions" placeholder="Cooking steps" required class="input-directions"></textarea>
          
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
</template>
<script>
  import axios from 'axios';
  import Header from './Header.vue';
  
  export default {
    name: 'CreateRecipe',
    components: {
      Header,
    },
    data() {
      return {
        recipe: {
          name: '',
          description: '',
          ingredients: '',
          num_of_servings: 0,
          cook_time: 0,
          directions: '',
        },
        completeMessage: ''
      };
    },
    methods: {
        async createRecipe() {
            const accessToken = localStorage.getItem('access_token');
            try {
                await axios.post(`${import.meta.env.VITE_API_BASE_URL}/recipes`, this.recipe, {
                    headers: { 'Authorization': `Bearer ${accessToken}` },
                });
                this.completeMessage = 'You have created a new recipe!';
                // Reset form fields
                this.recipe = {
                    name: '',
                    description: '',
                    ingredients: '',
                    num_of_servings: 0,
                    cook_time: 0,
                    directions: '',
                };
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // Token might have expired, try to refresh it
                    await this.refreshAccessToken();
                    // Retry creating the recipe after refreshing the token
                    await this.createRecipe();
                } else {
                    console.error('Failed to create recipe:', error);
                    this.completeMessage = 'Failed to create recipe. Please try again.';
                }
            }

        },
        async refreshAccessToken() {
            try {
                const refreshToken = localStorage.getItem('refresh_token');
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/refresh`, {}, {
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
        // Other methods including refreshAccessToken
    }
  }

</script>
  
<style scoped>

.message{
   text-align: center;
}

.container {
    font-family: 'Cute', sans-serif; 
    color: rgb(247, 160, 133);
    font-size: 35px;
    display: flex;
    flex-direction: column; 
}

.head {
  font-family: 'Spring', sans-serif; /* Apply Poppins font */
  font-size: 40px;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  padding: 35px; /* Adds some space around the content */
  color: rgba(94, 101, 204, 0.63);
}

.form-list{
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
  gap: 10px;
}

.input-name, .input-description, .input-ingredients, .input-directions {
  width: 100%; /* Adjust width as necessary */
  border-radius: 5px;
}

.input-small {
  width: calc(50% - 10px); /* Adjust width for small inputs */
  border-radius: 5px;
}

.flex-inputs {
  display: flex;
  justify-content: space-between;
}

textarea{
    resize: vertical;
}
</style>