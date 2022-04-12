<template>
  <div>
    <h2 class="sr-only">Filters</h2>
    <label for="search">
      Search
      <input id="search" v-model="term" @keypress.enter="search(term)" />
    </label>

    <p v-for="filter in filters" :key="filter" @click="() => filterItems(filter)">
      {{ filter }}
    </p>
  </div>
</template>

<script>
const filters = ['All', 'book', 'movie'];

export default {
  props: ['filterItems', 'search', 'filteredItems'],
  data() {
    return {
      filters,
      term: '',
    };
  },
};
</script>