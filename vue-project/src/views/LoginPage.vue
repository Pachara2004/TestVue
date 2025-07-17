<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button>Login</button>
    </form>
    <div v-if="user">
      <h3>Welcome: {{ user.username }}</h3>
      <p>Role: {{ user.role }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const username = ref('')
const password = ref('')
const user = ref(null)

const login = async () => {
  try {
    const res = await axios.post('http://localhost:3000/api/login', {
      username: username.value,
      password: password.value
    })

    const token = res.data.token
    localStorage.setItem('token', token)

    const profile = await axios.get('http://localhost:3000/api/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })

    user.value = profile.data.user
  } catch (err) {
    alert('Login failed')
  }
}
</script>
