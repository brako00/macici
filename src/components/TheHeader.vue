<template>
  <header>
    <div class="container">
      <router-link :to="{ name: 'home' }" class="nameContainer">
        <!-- <img src="../../public/paw.png" alt="Logo image" /> -->
        Meow Matchmakers
      </router-link>

      <div class="imageContainer">
        <div
          v-if="userStore.adminLoggedIn"
          class="signOut"
          @click="userStore.adminLoggedIn = false"
        >
          Sign Out
        </div>

        <router-link :to="{ name: 'admin' }">
          <img
            v-if="!userStore.adminLoggedIn"
            src="../../user.png"
            alt="User"
          />
          <img v-else src="../../setting.png" alt="Admin" />
        </router-link>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/user"

const userStore = useUserStore()
</script>

<style lang="scss" scoped>
@import "@/assets/globalComponents.scss";

header {
  width: 100%;

  height: 65px;

  .container {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: max-content;

    background-color: $bgColor;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    z-index: 1;
    .nameContainer {
      padding: 10px;
      margin-left: 15px;
      font-size: 200%;
      font-family: $secondaryFontFamily;
      display: flex;
      align-items: center;
      text-decoration: none;
      color: #000;
    }
    .imageContainer {
      padding: auto;

      display: flex;
      align-items: center;
      img,
      .icon {
        height: 50px;
        width: 50px;
        object-fit: contain;
        border-radius: 20%;
      }
    }
  }
}

.signOut {
  color: #000;
  font-size: x-large;

  font-family: $primaryFontFamily;
  margin-right: 20px;
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;

  cursor: pointer;
}

.signOut:hover {
  background-color: $buttonBgColor;
}

a {
  margin-right: 20px;
}

// @media only screen and (max-width: 406px) {
//   .container {
//     height: max-content;
//   }
// }
</style>
