<template>
    <div class="container">
      <router-link to="/">
        <img class='logo' src='../assets/l2.jpg' alt="Logo" />
      </router-link>
      <h1>Sign Up</h1>
      <div class="register">
          <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
          <input type="text" v-model="username" placeholder="Enter Your Username" />
          <input type="text" v-model="email" placeholder="Enter Your Email" />
          <input type="password" v-model="password" placeholder="Enter your Password" />
          <button @click="signUp">Sign Up</button>
          <p>
            <router-link class="l" to="/login">Already have an account? Log In here!</router-link>
          </p>
      </div>
    </div>
</template>
  
<script>
import axios from 'axios'
export default {
    name: 'SignUp',

    data(){
        return {
            username:'',
            email:'',
            password:'',
            errorMessage:''
        }
    },

    methods:{
        async signUp() {
            if (!this.email || !this.password || !this.username) {
                this.errorMessage = 'Fields cannot be empty';
                return;
            }
            try {
                let result = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users`, {
                    username: this.username,
                    email: this.email,
                    password: this.password
                });

                // Successful sign up
                console.warn(result);
                if (result.status === 201) {
                    alert("Sign up done");
                    localStorage.setItem('user-info', JSON.stringify(result.data));
                    this.$router.push({name:'Wait'})
                }
            } catch (error) {
                // Error handling
                console.error(error);
                if (error.response && error.response.status === 400) {
                    // Specific handling for 400 Bad Request
                    this.errorMessage = "Username or email already used";
                } else {
                    // General error handling
                    alert("An error occurred. Please try again.");
                }
            }
        }
    }
}
</script>

<style scoped>

h1 {
  font-size: 50px;
  color: rgb(94, 36, 230);
}
.container {
    font-family: 'Cute', sans-serif; /* Apply Poppins font */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh; /* Adjust based on your needs */
}

.logo {
    width: 150px;
    margin-bottom: 20px; /* Adjust for spacing */
}

.register {
    display: flex;
    flex-direction: column;
    width: 100%; /* Adjust based on your layout */
    max-width: 400px; /* Adjust to control the max width */
}

.register input,
.register button {
    margin-bottom: 10px; /* Adjust for spacing */
    height: 40px; /* Adjust based on your needs */
    padding: 0 10px; /* Adjust for padding inside inputs and button */
    border-radius: 5px; /* Optional: for rounded corners */
    border: 1px solid #ccc; /* Optional: for input and button border */
}

.register button {
    background-color: #007bff; /* Adjust based on your theme */
    color: white; /* Adjust based on your theme */
    border: none; /* Optional: removes border for buttons */
    cursor: pointer; /* Changes cursor to pointer on hover */
}

input::placeholder {
color: #2641b8;
font-style: italic;
}

.l{
    display: block;
    text-align: center;
    font-size: 25px;
}

.error {
    font-family: "Audiowide", sans-serif;
    color: red;
    margin-bottom: 10px;
}


/* Add responsive adjustments if needed */
</style>