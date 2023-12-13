<template>
  <header>
    <div class="container">
      <router-link :to="{ name: 'home' }" class="nameContainer">
        <!-- <img src="../../public/paw.png" alt="Logo image" /> -->
        Meow Matchmakers
      </router-link>

      <div class="imageContainer">
        <router-link :to="{ name: 'admin' }">
          <img v-if="!userStore.adminLoggedIn" src="../../user.png" alt="User"
        /></router-link>

        <div v-if="userStore.adminLoggedIn">
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
import { useUserStore } from "@/stores/user"
import { ref, onMounted, onUnmounted, computed } from "vue"

const userStore = useUserStore()

const useBreakpoints = () => {
  let windowWidth = ref(window.innerWidth)

  const onWidthChange = () => (windowWidth.value = window.innerWidth)
  onMounted(() => window.addEventListener("resize", onWidthChange))
  onUnmounted(() => window.removeEventListener("resize", onWidthChange))

  const type = computed(() => {
    if (windowWidth.value < 700) {
      return "sm"
    } else {
      return "lg"
    }
  })

  return { type }
}

const { type } = useBreakpoints()

const showDropdown = () => {
  const element = document.querySelector(".dropdownContent")

  element?.classList.toggle("hide-class")
}
</script>

<style lang="scss" scoped>
@import "@/assets/globalComponents.scss";

.adminSignIn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

button {
  background-color: $bgColor;
  border: 0;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.hide-class {
  display: none;
}

.dropdownContent {
  position: absolute;
  right: 0;
  background-color: $bgColor;
  min-width: 160px;
  z-index: 1;

  border-radius: 10%;
}

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
}

// .dropdown:hover .dropdownContent {
//   display: block;
// }

header {
  width: 100%;

  height: 65px;
  //115

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

@media only screen and (max-width: 426px) {
  header {
    height: 115px;
  }
}
</style>
