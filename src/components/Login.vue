<template>
    <div class="container">
      <router-link to="/">
        <img class='logo' src='../assets/l2.jpg' alt="Logo" />
      </router-link>
      <h1>Log In</h1>
      <div class="register">
          <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
          <input type="text" v-model="email" placeholder="Enter Your Email" />
          <input type="password" v-model="password" placeholder="Enter your Password" />
          <button @click="login">Log In</button>
          <p>
            <router-link class="l" to="/sign-up">New User? Sign up here!</router-link>
          </p>
      </div>
    </div>
</template>
  
<script>
import axios from 'axios'
export default {
    name: 'Login',

    data(){
        return {
            email:'',
            password:'',
            errorMessage: ''
        }
    },
    mounted() {
        let user = localStorage.getItem('access_token');
        if (user) {
            this.$router.push({name: 'MainBook'});
        }
    },
    methods: {
        async login() {
            // Clear any existing tokens before the login request
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            if (!this.email || !this.password) {
                this.errorMessage = 'Email and password cannot be empty';
                return;
            }

            try {
                let result = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/token`, {
                    email: this.email,
                    password: this.password
                });

                // Successful sign in
                console.warn(result);
                if (result.status === 200) {
                    // Here, save the tokens
                    localStorage.setItem('access_token', result.data.access_token);
                    localStorage.setItem('refresh_token', result.data.refresh_token);
                    
                    this.$router.push({name: 'MainBook'});
                }
            } catch (error) {
                console.error(error);
                if (error.response && error.response.status === 401) {
                    this.errorMessage = "Username or email is incorrect.";
                } else {
                    this.errorMessage = "Account not activated yet, please check your email.";
                }
            }
        }
    }
}
</script>

<style scoped>

h1 {
  font-size: 50px;
  color: rgb(36, 49, 230);
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