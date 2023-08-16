<template>
    <div class="filters">
        <h2 class="sr-only">Filters</h2>
        <div class="filters--upper">
            <div class="filters__categories">
                <FilterCategory title="Genres" :options="genres" :selectedOptions="selectedGenres" />
                <FilterCategory title="Years" :options="years" :selectedOptions="selectedYears" />
            </div>
            <SearchInput :term="term" :search="search" @update:term="updateSearchTerm" />
        </div>
        <div class="filters--lower">
            <TypesFilter :types="types" :selectedTypes="selectedTypes" @update:selectedTypes="updateSelectedTypes" />
            <ClearButton :resetFilters="resetFilters" />
        </div>
    </div>
</template>

<script>
import vClickOutside from 'click-outside-vue3';
import ClearButton from './ClearButton.vue';
import FilterCategory from './FilterCategory.vue';
import SearchInput from '../SearchInput.vue';
import TypesFilter from './TypesFilter.vue';

export default {
    props: ['search', 'filteredItems', 'resetItems', 'items'],
    components: { ClearButton, FilterCategory, SearchInput, TypesFilter },
    directives: {
        clickOutside: vClickOutside.directive
    },
    data() {
        return {
            term: '',
            genres: [],
            years: [],
            types: ['movie', 'book'],
            selectedGenres: [],
            selectedYears: [],
            selectedTypes: [],
            showGenres: false,
            showYears: false
        };
    },
    computed: {
        filteredGenres() {
            return this.selectedGenres.length > 0 ? this.items.filter((item) => this.selectedGenres.some((i) => item.genre.includes(i))) : this.items;
        },
        filteredYears() {
            return this.selectedYears.length > 0 ? this.items.filter((item) => this.selectedYears.includes(item.year)) : this.items;
        },
        filteredTypes() {
            return this.selectedTypes.length > 0 ? this.items.filter((item) => this.selectedTypes.includes(item.type)) : this.items;
        },
        filteredResults() {
            let filteredItems = this.filteredGenres.filter((item) => this.filteredYears.includes(item));

            if (this.selectedTypes.length > 0) {
                filteredItems = filteredItems.filter((item) => this.filteredTypes.includes(item));
            }

            if (this.term) {
                filteredItems = filteredItems.filter((item) => item.title.toLowerCase().includes(this.term.toLowerCase()));
            }

            return filteredItems;
        },
        genresLength() {
            return this.selectedGenres.length;
        },
        yearsLength() {
            return this.selectedYears.length;
        }
    },
    watch: {
        filteredResults() {
            this.$emit('updateFilter', this.filteredResults);
        }
    },
    methods: {
        toggleDropdown(dropdown) {
            if (dropdown === 'genres') this.showGenres = !this.showGenres;
            if (dropdown === 'years') this.showYears = !this.showYears;
        },
        closeDropdown(dropdown) {
            if (dropdown === 'genres') this.showGenres = false;
            if (dropdown === 'years') this.showYears = false;
        },
        resetFilters() {
            this.selectedGenres = [];
            this.selectedYears = [];
            this.selectedTypes = [];
            this.term = '';
            this.$emit('resetItems');
        },
        updateSelectedTypes(value) {
            this.selectedTypes = value;
        },
        updateSearchTerm(term) {
            this.term = term;
            this.$emit('updateFilter', this.filteredResults);
        },
        updateSelectedOptions(option, selectedOptions) {
            const index = selectedOptions.indexOf(option);
            if (index !== -1) {
                selectedOptions.splice(index, 1);
            } else {
                selectedOptions.push(option);
            }
            this.$emit('update:selectedOptions', selectedOptions);
        }
    },
    created() {
        // gets all unique genres and puts in array
        const all = this.items.map((m) => m.genre);
        const merged = [].concat(...all);
        let uniqueMerged = [...new Set(merged.sort((a, b) => (a < b ? -1 : 1)))];
        // console.log('genres', uniqueMerged);
        this.genres = uniqueMerged;

        // gets the unique years
        const allYears = this.items.map((m) => m.year);
        const mergedYears = [].concat(...allYears);
        let uniqueMergedYears = [...new Set(mergedYears.sort((a, b) => (a < b ? -1 : 1)))];
        // console.log('years', uniqueMergedYears);
        this.years = uniqueMergedYears;
    }
};
</script>

<style lang="scss" scoped>
@import '../../../styles/index.scss';
.filters {
    @include xsmall {
        margin: 0px;
    }
    @include large {
        margin: 15px;
    }
}
.filters--upper,
.filters--lower {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.filters--lower {
    margin-top: 10px;
}
.filters__categories {
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
</style>