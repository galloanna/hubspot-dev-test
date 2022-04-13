<template>
  <div class="filters">
    <!-- {{ filteredResults }} -->
    <h2 class="sr-only">Filters</h2>
    <div class="filters--upper">
      <div class="filters__categories">
        <div class="filters__category">
          <button
            aria-controls="genres"
            aria-haspopup="true"
            class="filters__category-header"
            @click="showGenresDropdown()"
            :aria-expanded="[showGenres ? true : false]"
          >
            <span v-if="genresLength > 1">{{ genresLength }} Genres</span>
            <span v-else-if="genresLength == 1">{{ genresLength }} Genre</span>
            <span v-else>Genre</span>
          </button>
          <div
            id="genres"
            role="dialog"
            aria-label="Genre Options"
            v-if="showGenres"
            v-click-outside="closeGenresDropdown"
            class="filters__category-options"
            :class="[showGenres ? 'filters__category-options--active' : '']"
          >
            <legend class="sr-only">Choose a genre</legend>
            <label class="filters__category-option" :for="index" v-for="(genre, index) in genres" :key="genre">
              <input :id="index" :value="genre" name="genre" type="checkbox" v-model="selectedGenres" />
              {{ genre }}</label
            >
          </div>
        </div>
        <div class="filters__category">
          <button
            aria-controls="years"
            aria-haspopup="true"
            class="filters__category-header"
            @click="showYearsDropdown()"
            :aria-expanded="[showYears ? true : false]"
          >
            <span v-if="yearsLength > 1">{{ yearsLength }} Years</span>
            <span v-else-if="yearsLength == 1">{{ yearsLength }} Year</span>
            <span v-else>Year</span>
          </button>
          <div
            id="years"
            role="dialog"
            aria-label="Year Options"
            v-if="showYears"
            v-click-outside="closeYearsDropdown"
            class="filters__category-options"
            :class="[showYears ? 'filters__category-options--active' : '']"
          >
            <legend class="sr-only">Choose a year</legend>
            <label class="filters__category-option" :for="index" v-for="(year, index) in years" :key="year">
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
    <div class="filters--lower">
      <div class="filters__types">
        <legend class="sr-only">Choose a media type</legend>
        <!-- Whyyyy won't you receive tab focus? >=( -->
        <label tabindex="0" class="filters__type-label" :for="filter" v-for="filter in typeFilters" :key="filter">
          <input
            tabindex="0"
            class="filters__type-input"
            type="radio"
            :id="filter"
            name="mediaType"
            @change="() => filterItemsByType(filter.toLowerCase().slice(0, -1))"
          />{{ filter }}</label
        >
      </div>
      <button class="filters__clear-button" @click="resetItems">Clear Filters</button>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'click-outside-vue3';
const typeFilters = ['Movies', 'Books'];

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
  computed: {
    filteredResults() {
      const selectedGenres = this.selectedGenres;
      const selectedYears = this.selectedYears;
      return selectedGenres.length + selectedYears.length > 0
        ? this.items.filter(
            (item) => selectedGenres.some((i) => item.genre.includes(i)) || selectedYears.includes(item.year)
          )
        : this.items;
    },
    genresLength() {
      return this.selectedGenres.length;
    },
    yearsLength() {
      return this.selectedYears.length;
    },
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
  @include xsmall {
    margin: 0px;
  }
  @include large {
    margin: 15px;
  }
  &--upper,
  &--lower {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  &--lower {
    margin-top: 10px;
  }
  &__categories {
    display: flex;
    font-weight: 700;
    color: $medium-gray;
    width: calc(100% - 20px);
    margin-bottom: 20px;
    @include medium {
      width: 150px;
      margin-bottom: 0;
    }
  }
  &__category {
    display: flex;
    flex-direction: column;
    width: 100%;
    @include xsmall {
      min-width: 50%;
    }
    @include medium {
      min-width: 150px;
    }
    &:not(:last-child) {
      margin-right: 20px;
    }
    &-header {
      background-color: $soft-white;
      width: 100%;
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
    &-options {
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
      opacity: 0;
      transition: all 0.2s linear;
      &--active {
        opacity: 1;
      }
    }
    &-option {
      cursor: pointer;
      padding: 10px;
      &:not(:last-child) {
        border-bottom: 1px solid $light-gray;
      }
      &:hover, &:focus {
        background-color: $soft-white;
      }
    }
  }
  &__types {
    margin-top: 20px;
  }
  &__type {
    display: flex;
    cursor: pointer;
    &-label {
      font-weight: 700;
      &:not(:last-child) {
        margin-right: 10px;
      }
    }
    &-input {
      margin: 0 5px 0 0;
      padding: 0;
    }
  }
  &__clear-button {
    align-self: flex-end;
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
  @include xsmall {
    width: calc(100vw - 70px);
  }
  @include small {
    width: calc(100vw - 70px);
  }
  @include medium {
    width: auto;
  }
}
</style>