<template>
  <Header />
  <div class="container">
    <h1>Find your favorate recipes!</h1>
  </div>
  <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Search for recipes...">
      <select v-model="sort">
          <option value="created_at">Date Created</option>
          <option value="cook_time">Cook Time</option>
          <option value="num_of_servings">Number of Servings</option>
      </select>
      <select v-model="order">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
      </select>
      <button @click="searchRecipes">Search</button>
  </div>
  <div class="recipe-list">
      <RecipeEntry
          v-for="recipe in recipes.data"
          :key="recipe.id"
          :recipe="recipe"
      />
  </div>
  <!-- Pagination -->
  <div class="pagination">
      <button @click="fetchRecipes('first')">First</button>
      <button @click="fetchRecipes('prev')" :disabled="!recipes.links.prev">Prev</button>
      <button @click="fetchRecipes('next')" :disabled="!recipes.links.next">Next</button>
      <button @click="fetchRecipes('last')">Last</button>
  </div>
</template>

<script>
import axios from 'axios'
import Header from './Header.vue'
import RecipeEntry from './RecipeEntry.vue'

export default {
  name: 'Mainbook',
  components: {
      Header,
      RecipeEntry
  },
  data() {
      return {
          searchQuery: '',
          sort: 'created_at',
          order: 'asc',
          recipes: { data: [], links: {} },
      };
  },
  methods: {
      async searchRecipes() {
          const params = {
              q: this.searchQuery,
              sort: this.sort,
              order: this.order,
          };
          try {
              const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/recipes`, { params });
              this.recipes = response.data;
          } catch (error) {
              console.error('Error fetching recipes:', error);
          }
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

.container {
  font-family: 'Spring', sans-serif; /* Apply Poppins font */
  font-size: 40px;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  padding: 35px; /* Adds some space around the content */
  color: rgba(94, 101, 204, 0.63);
}

.search-bar {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.search-bar input[type="text"] {
  width: 20%;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 20px;
  margin-right: 10px;
  outline: none;
  transition: border 0.3s ease;
}

.search-bar input[type="text"]:focus {
  border-color: #007bff;
}

.search-bar select {
  padding: 10px;
  border-radius: 5px;
  margin-right: 5px;
  background-color: white;
  border: 1px solid #ccc;
}

.search-bar button {
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
}

.recipe-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f9fa;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin: 20px auto;
  width: 45%;
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