<template>
  <div class="outerContainer">
    <div class="innerContainer">
      <img src="@/../setting.png" alt="image of admin" />

      <div class="signInContainer">
        <div class="inputFieldsContainer">
          <h2>Sign in</h2>

          <div class="inputContainer">
            <h3>Username:</h3>
            <input v-model="username" type="text" placeholder="Admin" />
          </div>

          <div class="inputContainer">
            <h3>Password:</h3>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Pass1234"
              @focusout="checkFormPassword"
            />
          </div>
        </div>

        <div class="errorContainer visibilityClass">
          <p>{{ errorTextPassword }}</p>
          <p>{{ errorTextUsername }}</p>
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
    const element = document.querySelector(".errorContainer")
    element?.classList.remove("visibilityClass")
  } else errorTextUsername.value = ""

  if (errorTextUsername.value === "") {
    userStore.adminLoggedIn = true
  }
}

const checkFormPassword = () => {
  if (password.value.length < 8) {
    errorTextPassword.value = "Password should have at least 8 characters"
    const element = document.querySelector(".errorContainer")
    element?.classList.remove("visibilityClass")
  } else if (!numbers.test(password.value)) {
    errorTextPassword.value = "Password should have at least one number"
    const element = document.querySelector(".errorContainer")
    element?.classList.remove("visibilityClass")
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

    img {
      height: 200px;
      width: 200px;

      border-radius: 100%;
      object-fit: contain;
    }

    .signInContainer {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .inputFieldsContainer {
        font-size: large;
        width: 300px;

        h2 {
          display: flex;
          justify-content: center;

          margin-bottom: 0;
          font-size: xx-large;
        }

        h3 {
          margin-bottom: 10px;
        }
      }
      .visibilityClass {
        visibility: hidden;
      }

      .errorContainer {
        display: flex;
        align-items: center;
        flex-direction: column;
        flex-wrap: wrap;

        width: 100%;
        height: 70px;

        font-size: medium;
        font-weight: 600;

        p {
          margin-bottom: 0;
          color: rgb(182, 21, 21);
        }
      }

      .inputContainer {
        margin-top: 30px;
        width: 300px;

        input {
          line-height: 80%;
          font-size: x-large;
          font-family: $primaryFontFamily;

          width: 98%;
        }

        .signinbutton {
          width: 100%;
          height: 100%;

          margin-bottom: 20px;
          font-weight: 600;
          background-color: $buttonBgColor;

          &:hover {
            background-color: $buttonHoverBgColor;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 650px) {
  .outerContainer {
    width: 100%;
    margin: 50px 0px 0px 0px;
    .innerContainer {
      width: 100%;
    }
  }
}
</style>
