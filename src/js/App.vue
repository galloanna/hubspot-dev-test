<template>
  <div>
    <Filters v-if="this.items.length" :filterItems="filterItems" :search="search" :filteredItems="filteredItems" :items="this.items"/>
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

  created() {
    console.log('what are the items', this.items)
  },

  methods: {
    filterItems(mediaType) {
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