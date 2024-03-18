<template>
    <div class="home-container">
      <div class="left-half">
        <!-- Icon or logo goes here; replace `src` with your actual icon path -->
        <img src="../assets/cover.jpg" alt="Cover Img" class="cover">
      </div>
      <div class="right-half">
        <h1>Welcome to SmileBook!</h1>
        <img src="../assets/l2.jpg" alt="SmileBook Icon" class="icon">
        <button @click="navigateTo('/login')">Log In</button>
        <button @click="navigateTo('/sign-up')">Sign Up</button>
        <button @click="navigateTo('/mainbook')">Continue as Visitor</button>
      </div>
    </div>
</template>
  
<script>
import axios from 'axios'
export default {
    name: 'Home',
    methods:{
        navigateTo(path){
            this.$router.push(path);
        }
    }
}
</script>

<style scoped>
.home-container {
  display: flex;
  height: 100vh;
  overflow: hidden; /* This prevents any overflow causing scroll bars */
}

h1 {
  font-size: 100px;
  color: rgb(218, 139, 20);
  font-family: 'Cute', sans-serif; /* Apply Poppins font */
}

.left-half, .right-half {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0; /* Reset any default margin */
  padding: 0;
}

.left-half {
    overflow: hidden;
    position: relative;
}
.right-half {
  flex-direction: column;
  gap: 20px; /* Adjust the gap between buttons as needed */
}

.right-half button{
    margin-bottom: 15px; /* Adjust for spacing */
    height: 45px; /* Adjust based on your needs */
    padding: 0 10px; /* Adjust for padding inside inputs and button */
    border-radius: 5px; /* Optional: for rounded corners */
    border: 1px solid #ccc; /* Optional: for input and button border */
    background-color: #007bff; /* Adjust based on your theme */
    color: white; /* Adjust based on your theme */
    border: none; /* Optional: removes border for buttons */
    cursor: pointer; /* Changes cursor to pointer on hover */
    width: 100%; /* Adjust based on your layout */
    max-width: 350px; /* Adjust to control the max width */
    font-size: 20px
}
.icon {
  /* Adjust the size of your icon as needed */
  width: 150px;
  margin-bottom: 30px;
}

.cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>