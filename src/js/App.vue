<template>
  <div class="media">
    <Filters
      v-if="this.items.length"
      :search="search"
      :filteredItems="filteredItems"
      @resetItems="resetItems"
      :items="this.items"
      @updateFilter="updateFilter"
    />
    <Items :items="filteredItems.length ? filteredItems : items" />
  </div>
</template>

<script>
import Filters from './components/Filters.vue';
import Items from './components/Items.vue';

export default {
  name: 'App',
  components: {
    Filters,
    Items,
  },
  data() {
    return {
      items: [],
      filteredItems: [],
      str: '',
    };
  },
  created() {
    this.getData();
    console.log('what are the items', this.items);
  },
  methods: {
    updateFilter(filteredResults) {
      console.log('FILTERED RESULTS IN PARENT', filteredResults);
      this.filteredItems = filteredResults;
    },
    search(term) {
      this.resetItems();
      this.filteredItems = this.items.filter((item) => {
        return item.title.toLowerCase().includes(term.toLowerCase());
      });
    },
    resetItems() {
      this.filteredItems = [];
    },
    async getData() {
      try {
        let response = await fetch(
          'https://raw.githubusercontent.com/HubSpotWebTeam/CodeExercise/main/src/js/data/data.json'
        );
        this.items = await response.json();
        this.items = this.items.media;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
.media {
  @include xsmall {
    margin: 10px;
  }
  @include large {
    margin: 30px;
  }
  border: 1px solid $light-gray;
  display: flex;
  flex-direction: column;
  padding: 15px;
}
</style> 