<template>
  <section>
    <ul>
      <li v-for="cat in catsStore.cats" :key="cat.id">
        <div class="catCard">
          <img :src="cat.image" alt="Image of the cat" />

          <div class="catInfo">
            <h2>{{ cat.name }}</h2>
            <div class="textContainer">
              <span>
                <h4>Fur color:</h4>
                <h3>{{ cat.color }}</h3>
              </span>
              <span>
                <h4>Months old:</h4>
                <h3>{{ cat.age }}</h3>
              </span>
            </div>
          </div>

          <action-button text="Adopt" type="primary" />
        </div>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import ActionButton from "@/components/Shared/ActionButton.vue"
import { useCatsStore } from "@/stores/cats"
import { onMounted } from "vue"

const catsStore = useCatsStore()
onMounted(catsStore.FETCH_CATS)
</script>

<style lang="scss" scoped>
@import "@/assets/globalComponents.scss";

ol {
}

li {
  font-family: $primaryFontFamily;
  list-style: none;
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
  justify-content: flex-start;

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

  h2 {
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
</style>
