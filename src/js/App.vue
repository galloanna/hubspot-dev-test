<template>
  <div class="exercise-2">
    <Filters
      v-if="this.items.length"
      :filterItemsByType="filterItemsByType"
      :search="search"
      :filteredItems="filteredItems"
      :resetItems="resetItems"
      :items="this.items"
    />
    <Items :items="items" />
  </div>
</template>

<script>
import Filters from './components/Filters.vue';
import Items from './components/Items.vue';

import dataSet from './data/data.json';
const mediaData = dataSet.media;
const alphaMediaData = mediaData.sort((a, b) => (a.title < b.title ? -1 : 1));

export default {
  name: 'App',
  components: {
    Filters,
    Items,
  },
  data() {
    return {
      items: alphaMediaData,
      str: '',
      type: '',
    };
  },

  created() {
    console.log('what are the items', this.items);
  },

  methods: {
    filterItemsByType(mediaType) {
      this.resetItems();
      this.items = this.items.filter((item) => {
        return item.type === mediaType;
      });
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
@import '../styles/index.scss';
.exercise-2 {
  border: 1px solid $light-gray;
  display: flex;
  flex-direction: column;
  margin: 30px;
  padding: 15px;
}
</style>