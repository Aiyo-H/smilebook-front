<template>
    <div class="recipe-entry" @click="goToRecipeDetail">
        <img :src="recipe.cover_url" alt="Cover" class="cover-img"/>
        <div class="recipe-info">
            <div class="info-column">
                <h3>{{ recipe.name }}</h3>
                <div class="author-info">
                    <img :src="recipe.author.avatar_url" alt="Author" class="author-avatar"/>
                    <span>{{ recipe.author.username }}</span>
                </div>
            </div>
            <div class="info-column">
                <p><strong>Description:</strong> {{ recipe.description }}</p>
            </div>
            <div class="info-column">
                <p><strong>Servings:</strong> {{ recipe.num_of_servings }}</p>
                <p><strong>Cook time:</strong> {{ recipe.cook_time }} minutes</p>
            </div>
        </div>
        <div class="creation-date"><strong>Posted:</strong> {{ formatDate(recipe.created_at) }}</div>
    </div>
</template>

<script>
export default {
    props: {
        recipe: {
            type: Object,
            required: true,
        },
    },
    methods: {
        goToRecipeDetail() {
            this.$router.push({ name: 'DetailPage', params: { id: this.recipe.id }});
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        },
    }
}
</script>

<style scoped>
.recipe-entry {
  display: flex;
  background-color: #e9ecef;
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s ease;
  align-items: center;
  position: relative;
}

.recipe-info {
  display: flex;
  flex-direction: row; /* Updated to row */
  flex-grow: 1;
  justify-content: space-between; /* Space between the two columns */
  width: 100%; /* Ensure it fills the space */
}

.info-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30%; /* Each column takes up half the width */
}

.recipe-entry:hover {
  transform: translateY(-2px);
}



.cover-img, .author-avatar {
  border-radius: 50%;
}

.recipe-info p, .author-info span {
  color: #333;
  font-family: 'Arial', sans-serif;
}

.author-info {
  display: flex;
  align-items: center;
}

.cover-img {
  width: 100px; /* Adjust as needed */
  height: 100px; /* Adjust as needed */
  object-fit: cover; /* This ensures the image covers the area without distortion */
  border-radius: 10px; /* Adjust for rounded corners if desired */
  margin-right: 15px; /* Adds some spacing between the image and the text */
}

.author-avatar {
  width: 30px; /* Adjust as needed */
  height: 30px; /* Adjust as needed */
  object-fit: cover; /* Ensures the avatar fits well within the circle */
  border-radius: 50%; /* Creates a circular shape */
  margin-right: 10px; /* Optional: adds some spacing next to the username */
}

/* Ensure the recipe-entry containers don't grow beyond their parent's width */
.recipe-entry {
  max-width: 100%; /* This ensures the entry does not exceed the container's width */
  box-sizing: border-box; /* Ensures padding and border are included in the width */
}

.creation-date {
  position: absolute;
  top: 10px;
  right: 10px;
  font-style: italic;
}
</style>