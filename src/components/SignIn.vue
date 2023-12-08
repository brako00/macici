<template>
  <div class="outerContainer">
    <div class="innerContainer">
      <img src="@/../public/setting.png" alt="image of admin" />

      <div class="signInContainer">
        <div class="signs">
          <h2>Sign in</h2>

          <div class="inputContainer">
            <h3>Username:</h3>
            <input v-model="username" type="text" placeholder="Admin" />
          </div>

          <div class="inputContainer">
            <h3>Password:</h3>
            <input
              v-model="password"
              type="password"
              placeholder="Pass1234"
              @focusout="checkFormPassword"
            />
          </div>

          <b>{{ errorTextUsername }}</b>
          <b>{{ errorTextPassword }}</b>
        </div>

        <div class="inputContainer">
          <input
            type="submit"
            value="Sign in"
            class="signinbutton"
            @click="checkFormUsername"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useUserStore } from "@/stores/user"

const userStore = useUserStore()

const constUsername = "Admin"
const constPassword = "Pass1234"

const username = ref<string>("")
const password = ref<string>("")

const numbers = /\d/

const errorTextUsername = ref<string>("")
const errorTextPassword = ref<string>("")

const checkFormUsername = () => {
  if (username.value !== constUsername || password.value !== constPassword) {
    errorTextUsername.value = "Username or password incorrect"
  } else errorTextUsername.value = ""

  if (errorTextUsername.value === "") {
    userStore.adminLoggedIn = true
  }
}

const checkFormPassword = () => {
  if (password.value.length < 8) {
    errorTextPassword.value = "Password should have at least 8 characters"
  } else if (!numbers.test(password.value)) {
    errorTextPassword.value = "Password should have at least one number"
  } else errorTextPassword.value = ""
}
</script>

<style lang="scss" scoped>
@import "@/assets/globalComponents.scss";

.outerContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
}
.innerContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;

  font-family: $primaryFontFamily;

  background-color: $bgColor;

  border-radius: 2%;

  height: 800px;
  width: 500px;
}

.signInContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

h2 {
  font-size: xx-large;
  display: flex;
  justify-content: center;
  margin-bottom: 0;
}
.inputContainer {
  margin-top: 30px;
  width: 100%;
}

input {
  line-height: 80%;
  font-size: x-large;
}

.signinbutton {
  width: 100%;
  margin-bottom: 20px;
}

img {
  height: 200px;
  width: 200px;
  border-radius: 100%;
  object-fit: contain;
}
</style>
