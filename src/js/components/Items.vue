<template>
  <div>
    <h1 class="sr-only">Available Media</h1>
    <div class="media-items">
      <div class="media-item" v-for="item in items" :key="item.id">
        <img class="media-item__poster" :src="item.poster" />
        <h3 class="media-item__title">{{ item.title }} ({{ item.year }})</h3>
        <h4 class="media-item__genres">Genres: {{ item.genre }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['items'],
};
</script>

<style lang="scss" scoped>
.media-items {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  }
.media-item {
  width: 30%;
}

.media-item__poster {
  width: 100%;
}
</style>