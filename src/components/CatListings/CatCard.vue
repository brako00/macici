<template>
  <div class="catOutline">
    <div class="catCard">
      <img :src="cat.image" alt="Image of the cat" />

      <div class="catInfo">
        <h2 class="catName">{{ props.cat.name }}</h2>
        <div class="textContainer">
          <span>
            <h4>Fur color:</h4>
            <h3>{{ props.cat.color }}</h3>
          </span>
          <span>
            <h4>Months old:</h4>
            <h3>{{ props.cat.age }}</h3>
          </span>
        </div>
      </div>

      <action-button
        v-if="!userStore.adminLoggedIn"
        text="Adopt"
        type="primary"
        class="adoptButton"
        @click="openModal"
      />

      <div v-if="userStore.adminLoggedIn" class="editDelete">
        <router-link
          v-if="userStore.adminLoggedIn"
          :to="{ path: `edit/${props.cat.id}` }"
          class="edit"
        >
          <button class="editButton">
            <font-awesome-icon :icon="['fas', 'edit']" class="icon" />
            Edit
          </button>
        </router-link>

        <button class="delete" @click="openDeleteModal">
          <font-awesome-icon :icon="['fas', 'trash']" class="icon" />
          Delete
        </button>
      </div>
    </div>
  </div>

  <adopt-modal
    v-if="showAdoptModal"
    v-on-click-outside="closeModal"
    :cat="cat"
    action="adopt"
    @close="closeModal"
  />

  <adopt-modal
    v-if="showDeleteModal"
    v-on-click-outside="closeDeleteModal"
    :cat="cat"
    action="delete"
    @close="closeDeleteModal"
  />
</template>

<script lang="ts" setup>
import ActionButton from "@/components/Shared/ActionButton.vue"
import { ref, type PropType } from "vue"
import type { Cat } from "@/api/types"
import AdoptModal from "@/components/Shared/AdoptModal.vue"

import { useUserStore } from "@/stores/user"
import { useCatsStore } from "@/stores/cats"

import { vOnClickOutside } from "@vueuse/components"

const userStore = useUserStore()
const catsStore = useCatsStore()

const showAdoptModal = ref<boolean>(false)
const showDeleteModal = ref<boolean>(false)

const props = defineProps({
  cat: {
    type: Object as PropType<Cat>,
    required: true
  }
})

const openModal = () => {
  showAdoptModal.value = true
}

const closeModal = () => {
  showAdoptModal.value = false
}

const openDeleteModal = () => {
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
}
</script>

<style lang="scss" scoped>
@import "@/assets/globalComponents.scss";
.catOutline {
  font-family: $primaryFontFamily;
  display: flex;
  height: 550px;
  width: 400px;
}
.catCard {
  background-color: $bgColor;
  border: 2px;
  border: solid;
  border-radius: 2%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .adoptButton {
    margin-bottom: 15px;
  }

  .icon {
    color: black;
  }

  img {
    height: 300px;
    width: 100%;
    object-fit: fill;
    border-radius: 2% 2% 0 0;
  }

  .catInfo {
    margin: 5px;
    padding: 5px;
    font-weight: 600;
    width: 100%;
  }

  .catName {
    font-size: 200%;
    margin: 5px 0;
    font-family: $secondaryFontFamily;
    text-align: center;
  }
  .textContainer {
    display: flex;
    justify-content: space-between;
    margin: 0 10px 10px 10px;
  }

  h3 {
    font-size: 150%;
    margin: 0;
    padding: 2.5px 0;
  }
}
.editDelete {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  margin-bottom: 15px;
}

.delete,
.edit {
  height: 40px;
  width: 30%;
}

.delete,
.editButton {
  font-family: $primaryFontFamily;
  font-size: large;
  border-radius: 8px;
}

.delete {
  background-color: red;

  &:hover {
    background-color: rgb(213, 4, 4);
  }
}

.editButton {
  background-color: #e9cc2d;
  width: 100%;
  height: 100%;

  &:hover {
    background-color: #c6af2a;
  }
}
</style>
