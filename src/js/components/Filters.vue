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
    
    <div>
    <li v-for="(genre, index) in genres" :key="genre">
      <input :id="index" :value="genre" name="genre" type="checkbox" v-model="selectedGenres" />
      <label :for="genre"><span>{{genre}}</span></label>
    </li>

    <li v-for="(year, index) in years" :key="year">
      <input :id="index" :value="year" name="genre" type="checkbox" v-model="selectedYears" />
      <label :for="year"><span>{{year}}</span></label>
    </li>
</div>

  </div>
</template>

<script>
const filters = ['All', 'book', 'movie'];

export default {
  props: ['filterItems', 'search', 'filteredItems', 'items'],
  data() {
    return {
      filters,
      term: '',
      genres: [],
      years: [],
      selectedGenres: [],
      selectedYears: [],
      
    };
  },
    created() {

// gets all unique genres and puts in array 
    const all = this.items.map(m => m.genre);
    const merged = [].concat(...all)
  let uniqueMerged = [...new Set(merged)];
  console.log('genres', uniqueMerged);
  this.genres = uniqueMerged; 

// gets the unique years .
  const allYears = this.items.map(m => m.year);
  const mergedYears = [].concat(...allYears)
  let uniqueMergedYears = [...new Set(mergedYears)];
  console.log('years', uniqueMergedYears)
  this.years = uniqueMergedYears;


  },
};
</script>