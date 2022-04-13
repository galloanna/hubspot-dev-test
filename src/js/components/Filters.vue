<template>
  <div>
    <h2 class="sr-only">Filters</h2>
    <div class="upper-filters">
      <div class="categories">
        <div class="category">
          <button class="category-header" @click="showGenresDropdown()">Genre</button>
          <div v-if="showGenres" class="options">
            <legend class="sr-only">Choose a genre</legend>
            <label :for="genre" v-for="(genre, index) in genres" :key="genre">
              <input :id="index" :value="genre" name="genre" type="checkbox" v-model="selectedGenres" />
              {{ genre }}</label
            >
          </div>
        </div>
        <div class="category">
          <button class="category-header" @click="showYearsDropdown()">Year</button>
          <div v-if="showYears" class="options">
            <legend class="sr-only">Choose a year</legend>
            <label class="option" :for="year" v-for="(year, index) in years" :key="year">
              <input :id="index" :value="year" name="genre" type="checkbox" v-model="selectedYears" />
              {{ year }}</label
            >
          </div>
        </div>
      </div>
      <label for="search" class="sr-only">Search</label>
      <input id="search" v-model="term" @keypress.enter="search(term)" />
    </div>
    <div class="lower-filters">
      <div class="type">
      <legend class="sr-only">Choose a media type</legend>
      <label class="option" :for="filter" v-for="filter in typeFilters" :key="filter">
        <input type="radio" :id="filter" name="mediaType" @change="() => filterItemsByType(filter)" />{{
          filter
        }}</label
      >
</div>
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
      showGenres: false,
      showYears: false,
    };
  },
  methods: {
    showGenresDropdown() {
      this.showGenres = !this.showGenres;
    },
    showYearsDropdown() {
      this.showYears = !this.showYears;
    },
    closeGenresDropdown() {
      this.showGenres = false;
    },
    closeYearsDropdown() {
      this.showYears = false;
    },
  },
  created() {
    // gets all unique genres and puts in array
    const all = this.items.map((m) => m.genre);
    const merged = [].concat(...all);
    let uniqueMerged = [...new Set(merged.sort((a, b) => (a < b ? -1 : 1)))];
    console.log('genres', uniqueMerged);
    this.genres = uniqueMerged;

    // gets the unique years
    const allYears = this.items.map((m) => m.year);
    const mergedYears = [].concat(...allYears);
    let uniqueMergedYears = [...new Set(mergedYears.sort((a, b) => (a < b ? -1 : 1)))];
    console.log('years', uniqueMergedYears);
    this.years = uniqueMergedYears;
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

.categories {
  display: flex;
  font-weight: 700;
  color: $medium-gray;
}

.category {
  display: flex;
  flex-direction: column;
  &:not(:last-child) {
    margin-right: 20px;
  }
  &-header {
    background-color: $soft-white;
    width: 150px;
    border: 0;
    box-shadow: 0 3px $light-gray;
    padding: 10px;
    position: relative;
    display: flex;
    border: none;
    font-size: 14px;
    font-weight: 700;
    color: $medium-gray;
    font-family: 'Montserrat';
    text-transform: uppercase;
    -webkit-appearance: none;
    -moz-appearance: none;
    &:after {
      content: '';
      height: 8px;
      width: 8px;
      border-bottom: 2px solid $medium-gray;
      border-right: 2px solid $medium-gray;
      position: absolute;
      transform: rotate(45deg);
      right: 10px;
      align-self: center;
    }
  }
}

.type {
  margin-top: 20px;
}

.options {
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: $white;
  width: 150px;
  margin-top: 50px;
}

.option {
  padding: 10px 25px;
}
</style>