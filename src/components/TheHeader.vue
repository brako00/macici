<template>
  <header>
    <div class="container">
      <router-link :to="{ name: 'home' }" class="nameContainer">
        <img src="../../kitty.png" alt="Logo image" class="icon" />
        Meow Matchmakers
      </router-link>

      <div class="imageContainer">
        <router-link v-if="!userStore.adminLoggedIn" :to="{ name: 'admin' }">
          <img src="../../user.png" alt="User"
        /></router-link>

        <div v-else class="elseDiv">
          <div v-if="type === 'sm'" class="dropdown">
            <button @click="showDropdown()">
              <img src="../../setting.png" alt="Admin" />
            </button>
            <div class="dropdownContent hide-class">
              <div
                class="dropdownLink"
                @click="userStore.adminLoggedIn = false"
              >
                Sign Out
              </div>
              <router-link :to="{ name: 'admin' }" class="dropdownLink">
                Create cat
              </router-link>
            </div>
          </div>

          <div v-else class="adminSignIn">
            <div class="signOut" @click="userStore.adminLoggedIn = false">
              Sign Out
            </div>

            <router-link :to="{ name: 'admin' }">
              <img src="../../setting.png" alt="Admin" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import myuseBreakpoints from "@/composables/myuseBreakpoints"
import { useUserStore } from "@/stores/user"

const userStore = useUserStore()

const showDropdown = () => {
  const element = document.querySelector(".dropdownContent")

  element?.classList.toggle("hide-class")
}

const type = myuseBreakpoints(700)
</script>

<style lang="scss" scoped>
@import "@/assets/globalComponents.scss";

.hide-class {
  display: none;
}

header {
  width: 100%;
  height: 65px;

  .container {
    position: fixed;
    top: 0px;
    left: 0px;

    width: 100%;
    height: max-content;

    background-color: $primaryColor;

    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;

    z-index: 1;
    .nameContainer {
      display: flex;
      align-items: center;

      padding: 10px;
      margin-left: 15px;

      font-size: 200%;
      font-family: $secondaryFontFamily;
      text-decoration: none;
      color: #000;
    }
    .imageContainer {
      padding: auto;

      display: flex;
      align-items: center;

      .elseDiv {
        height: 100%;
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: center;

        .dropdown {
          position: relative;
          display: inline-block;

          .dropdownContent {
            position: absolute;
            right: 0;
            min-width: 160px;
            background-color: $primaryColor;

            border-radius: 10%;

            z-index: 1;

            .dropdownLink {
              font-family: $primaryFontFamily;
              font-size: x-large;
              text-decoration: none;
              color: #000;

              padding: 10px;
              margin: 0;

              display: flex;
              flex-wrap: wrap;

              border-bottom: solid #000 2px;
              border-radius: 10%;

              &:hover {
                background-color: $secondaryColor;
                font-weight: 500;
              }
            }
          }
        }

        .adminSignIn {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          height: 100%;
          width: 100%;

          .signOut {
            color: #000;
            font-size: x-large;
            font-family: $primaryFontFamily;

            padding: 0 20px;
            height: 100%;
            width: 100%;

            display: flex;
            align-items: center;

            cursor: pointer;

            &:hover {
              background-color: $secondaryColor;
              font-weight: 600;
            }
          }
        }
      }
    }
  }
}

button {
  background-color: $primaryColor;
  border: 0;
}

img {
  height: 50px;
  width: 50px;
  object-fit: contain;
  border-radius: 20%;
}

.icon {
  padding-right: 5px;
}

a {
  margin-right: 20px;
}

@media only screen and (max-width: 481px) {
  header {
    height: 115px;
  }
}
</style>
