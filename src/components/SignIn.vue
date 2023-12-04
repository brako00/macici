<template>
  <div class="outerContainer">
    <div class="innerContainer">
      <img src="../../public/setting.png" alt="image of admin" />

      <div class="signInContainer">
        <div class="signs">
          <h2>Sign in</h2>

          <div class="inputContainer">
            <h3>Username:</h3>
            <input v-model="username" type="text" placeholder="Admin" />
          </div>

          <div class="inputContainer">
            <h3>Password:</h3>
            <input v-model="password" type="password" placeholder="Pass1234" />
          </div>

          <div v-if="isThereError">
            <h3 v-if="usernameOrPasswordError">
              Username or password incorrect
            </h3>
            <h3 v-if="passwordLengthError">
              Password should have at least 8 characters
            </h3>
            <h3 v-if="passwordNumberError">
              Password should have at least one number
            </h3>
          </div>
        </div>

        <div class="inputContainer">
          <input
            type="submit"
            value="Sign in"
            class="signinbutton"
            @click="checkingInputs"
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

const isThereError = ref<boolean>(false)
const usernameOrPasswordError = ref<boolean>(false)
const passwordLengthError = ref<boolean>(false)
const passwordNumberError = ref<boolean>(false)

const checkingInputs = () => {
  isThereError.value = false
  usernameOrPasswordError.value = false
  passwordLengthError.value = false
  passwordNumberError.value = false

  const numbers = /\d/

  if (username.value !== constUsername) {
    isThereError.value = true
    usernameOrPasswordError.value = true
  }
  if (password.value !== constPassword) {
    isThereError.value = true
    usernameOrPasswordError.value = true
  }
  if (password.value.length < 8) {
    isThereError.value = true
    passwordLengthError.value = true
  }
  if (!numbers.test(password.value)) {
    isThereError.value = true
    passwordNumberError.value = true
  }

  if (isThereError.value === false) {
    userStore.adminLoggedIn = true
  }
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
