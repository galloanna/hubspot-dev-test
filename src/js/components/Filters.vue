<template>
  <div>
    <h2 class="sr-only">Filters</h2>
    <div class="upper-filters">
      <select>
        Genre
      </select>
      <select>
        Genre
      </select>
      <label for="search">
        Search
        <input id="search" v-model="term" @keypress.enter="search(term)" />
      </label>
    </div>
    <div class="lower-filters">
      <form>
        <fieldset>
          <legend class="sr-only">Choose a media type</legend>
          <label :for="filter" v-for="filter in typeFilters" :key="filter">
            <input type="radio" :id="filter" name="mediaType" @click="() => filterItemsByType(filter)" />
            {{ filter }}</label
          >
        </fieldset>
      </form>
      <button>Clear Filters</button>
    </div>
  </div>
</template>

<script>
const typeFilters = ['book', 'movie'];

import dataSet from '../data/data.json';
const mediaData = dataSet.media;

export default {
  props: ['filterItemsByType', 'search', 'filteredItems'],
  data() {
    return {
      mediaData,
      typeFilters,
      term: '',
    };
  },
};
</script>

<style lang="scss">
@import '../../styles/index.scss';
.upper-filters,
.lower-filters {
  display: flex;
  align-items: space-between;
}
</style>