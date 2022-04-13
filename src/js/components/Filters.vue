<template>
  <div class="filters">
    <h2 class="sr-only">Filters</h2>
    <div class="upper-filters">
      <div class="categories">
        <div class="category">
          <button
            aria-controls="genres"
            aria-haspopup="true"
            class="category-header"
            @click="showGenresDropdown()"
            :aria-expanded="[showGenres ? true : false]"
          >
            Genre
          </button>
          <div
            id="genres"
            role="dialog"
            aria-label="Genre Options"
            v-if="showGenres"
            v-click-outside="closeGenresDropdown"
            class="options"
          >
            <legend class="sr-only">Choose a genre</legend>
            <label class="option" :for="index" v-for="(genre, index) in genres" :key="genre">
              <input :id="index" :value="genre" name="genre" type="checkbox" v-model="selectedGenres" />
              {{ genre }}</label
            >
          </div>
        </div>
        <div class="category">
          <button
            aria-controls="years"
            aria-haspopup="true"
            class="category-header"
            @click="showYearsDropdown()"
            :aria-expanded="[showYears ? true : false]"
          >
            Year
          </button>
          <div
            id="years"
            role="dialog"
            aria-label="Year Options"
            v-if="showYears"
            v-click-outside="closeYearsDropdown"
            class="options"
          >
            <legend class="sr-only">Choose a year</legend>
            <label class="option" :for="index" v-for="(year, index) in years" :key="year">
              <input :id="index" :value="year" name="genre" type="checkbox" v-model="selectedYears" />
              {{ year }}</label
            >
          </div>
        </div>
      </div>
      <form role="search">
        <input
          class="search"
          aria-label="Search"
          type="search"
          id="search"
          v-model="term"
          @keypress.enter="search(term)"
          placeholder="Search"
        />
      </form>
    </div>
    <div class="lower-filters">
      <div class="type">
        <legend class="sr-only">Choose a media type</legend>
        <!-- Whyyyy won't you receive tab focus? >=( -->
        <label tabindex="0" class="type-label" :for="filter" v-for="filter in typeFilters" :key="filter">
          <input tabindex="0" class="type-input" type="radio" :id="filter" name="mediaType" @change="() => filterItemsByType(filter.toLowerCase().slice(0, -1))" />{{
            filter
          }}</label
        >
      </div>
      <button class="clear-filters" @click="resetItems">Clear Filters</button>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'click-outside-vue3';
const typeFilters = ['Movies','Books'];

export default {
  props: ['filterItemsByType', 'search', 'filteredItems', 'resetItems', 'items'],
  directives: {
    clickOutside: vClickOutside.directive,
  },
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
.filters {
  margin: 15px;
}
.upper-filters,
.lower-filters {
  display: flex;
  justify-content: space-between;
}

.lower-filters {
  margin-top: 10px;
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
    cursor: pointer;
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
  margin-top: 50px;
  border: 1px solid $light-gray;
  max-height: 350px;
  overflow-y: scroll;
  text-transform: uppercase;
  font-size: 14px;
}

.option {
  padding: 10px;
  &:not(:last-child) {
    border-bottom: 1px solid $light-gray;
  }
}

.search {
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 1px solid $light-gray;
  height: 100%;
  border-radius: 2px;
  position: relative;
  font-family: 'Montserrat';
  color: $dark-gray;
padding: 10px;
}

.clear-filters {
    -webkit-appearance: none;
  -moz-appearance: none;
  background-color: transparent;
  text-decoration: underline;
  color: $blue;
  font-family: 'Montserrat';
  text-transform: uppercase;
  font-weight: 700;
  border: 0;
  cursor: pointer;

}
.type {
  display: flex;
  cursor: pointer;
}
.type-label {
  font-weight: 700;
  &:not(:last-child) {
  margin-right: 10px;
  }
  &::first-letter {
    text-transform: uppercase;
  }
}
.type-input {
  margin: 0 5px 0 0;
  padding: 0;
}
</style>