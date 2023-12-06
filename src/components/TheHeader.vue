<template>
  <header>
    <div class="container">
      <router-link :to="{ name: 'home' }" class="nameContainer">
        Meow Matchmakers
      </router-link>

      <div class="imageContainer">
        <router-link :to="{ name: 'home' }" class="homeLink">
          <!-- <font-awesome-icon
            v-if="userStore.adminLoggedIn"
            :icon="['fas', 'home']"
            class="icon"
          /> -->
          Home
        </router-link>

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
  height: 55px;
  .container {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 70px;
    background-color: $bgColor;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    z-index: 1;
    .nameContainer {
      padding: auto;
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
      margin-right: 10px;
      display: flex;
      align-items: center;
      img,
      .icon {
        height: 50px;
        width: 50px;
        object-fit: contain;
        border-radius: 20%;
      }

      // .icon {
      //   color: #000;
      // }
    }
  }
}

.homeLink {
  color: #000;
  text-decoration: none;
  font-size: x-large;

  font-family: $primaryFontFamily;
}

a {
  margin-right: 20px;
}
</style>
