<template>
  <div>
    <h2 class="sr-only">Filters</h2>
    <div class="upper-filters">
      <div class="dropdowns">
        <div class="genre-dropdown">
        <label for="genres" class="sr-only"></label>
        <select id="genres">
          <option value="Genre">Genre</option>
        </select>
        <li v-for="(genre, index) in genres" :key="genre">
          <input :id="index" :value="genre" name="genre" type="checkbox" v-model="selectedGenres" />
          <label :for="genre"
            ><span>{{ genre }}</span></label
          >
        </li>
        </div>
        <div class="year-dropdown">

        <select id="years">
          <option value="Year">Year</option>
        </select>
        <li v-for="(year, index) in years" :key="year">
          <input :id="index" :value="year" name="genre" type="checkbox" v-model="selectedYears" />
          <label :for="year"
            ><span>{{ year }}</span></label
          >
        </li>
        </div>
      </div>
      <label for="search">
        Search
        <input id="search" v-model="term" @keypress.enter="search(term)" />
      </label>
    </div>
    <div class="lower-filters">
      <radiogroup>
        <legend class="sr-only">Choose a media type</legend>
        <label :for="filter" v-for="filter in typeFilters" :key="filter">
          <input type="radio" :id="filter" name="mediaType" @change="() => filterItemsByType(filter)" />
          {{ filter }}</label
        >
      </radiogroup>
      <button @click="resetItems">Clear Filters</button>
    </div>
  </div>
</template>

<script>
const typeFilters = ['book', 'movie'];

export default {
  props: ['filterItemsByType', 'search', 'filteredItems', 'resetItems', 'items'],
  data() {
    return {
      typeFilters,
      term: '',
      genres: [],
      years: [],
      selectedGenres: [],
      selectedYears: [],
    };
  },
  created() {
    // gets all unique genres and puts in array
    const all = this.items.map((m) => m.genre);
    const merged = [].concat(...all);
    let uniqueMerged = [...new Set(merged)];
    console.log('genres', uniqueMerged);
    this.genres = uniqueMerged.sort((a, b) => a < b ? -1 : 1);

    // gets the unique years
    const allYears = this.items.map((m) => m.year);
    const mergedYears = [].concat(...allYears);
    let uniqueMergedYears = [...new Set(mergedYears)];
    console.log('years', uniqueMergedYears);
    this.years = uniqueMergedYears.sort((a, b) => a < b ? -1 : 1);
  },
};
</script>

<style lang="scss">
@import '../../styles/index.scss';
.upper-filters,
.lower-filters {
  display: flex;
  justify-content: space-between;
}

.dropdowns {
  display: flex;
}
</style>