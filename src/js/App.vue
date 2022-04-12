<template>
  <div class="exercise-2">
    <Filters :filterItemsByType="filterItemsByType" :search="search" :filteredItems="filteredItems" />
    <Items :items="items" />
  </div>
</template>

<script>
import Filters from './components/Filters.vue';
import Items from './components/Items.vue';

import dataSet from './data/data.json';
const mediaData = dataSet.media;

export default {
  name: 'App',
  components: {
    Filters,
    Items,
  },
  data() {
    return {
      items: mediaData,
      str: '',
      type: '',
    };
  },
  methods: {
    filterItemsByType(mediaType) {
      this.resetItems();
      if (mediaType !== 'All') {
        this.items = this.items.filter((item) => {
          return item.type === mediaType;
        });
      }
    },
    search(term) {
      this.resetItems();
      this.items = this.items.filter((item) => {
        return item.title.toLowerCase().includes(term.toLowerCase());
      });
    },
    resetItems() {
      this.items = mediaData;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/index.scss";
.exercise-2 {
  border: 1px solid $light-gray;
  display: flex;
  flex-direction: column;
  }
</style>