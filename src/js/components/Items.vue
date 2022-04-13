<template>
  <div class="media-container">
    <h1 class="sr-only">Available Media</h1>
    <div class="media-items">
      <div class="media-item" v-for="item in items" :key="item.id">
        <img class="media-item__poster" :src="item.poster" :alt="item.title + ' poster'" />
        <h3 class="media-item__title">{{ item.title }} ({{ item.year }})</h3>
        <h4 class="media-item__genres">
          Genres:
          <span v-for="(genre, index) in item.genre" :key="genre">
            {{ genre.charAt(0).toUpperCase() + genre.substr(1) }}<span v-if="index + 1 < item.genre.length">, </span>
          </span>
        </h4>
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
@import '../../styles/index.scss';
.media-container {
  border-top: 1px solid $light-gray;
  margin-top: 20px;
  font-family: 'Montserrat';
}
.media-items {
  color: $dark-gray;
  margin-top: 15px;
  @include xsmall {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }
  @include medium {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
  @include large {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 25px;
  }
}
.media-item {
  &__poster {
    width: 100%;
  }
  &__genres {
    margin-top: -10px;
  }
}
</style>