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
            const filteredChecks = this.filteredGenres.filter((item) => this.filteredYears.includes(item));
            return this.selectedTypes.length > 0 ? filteredChecks.filter((item) => this.filteredTypes.includes(item)) : filteredChecks;
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
            this.$emit('resetItems');
        },
        updateSelectedTypes(value) {
            this.selectedTypes = value;
        },
        updateSearchTerm(term) {
            this.term = term;
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
        console.log('genres', uniqueMerged);
        this.genres = uniqueMerged;

        // gets the unique years
        const allYears = this.items.map((m) => m.year);
        const mergedYears = [].concat(...allYears);
        let uniqueMergedYears = [...new Set(mergedYears.sort((a, b) => (a < b ? -1 : 1)))];
        console.log('years', uniqueMergedYears);
        this.years = uniqueMergedYears;
    }
};
</script>

<style lang="scss">
@import '../../../styles/index.scss';
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
            font-family: 'Montserrat';
            padding: 10px;
            &:not(:last-child) {
                border-bottom: 1px solid $light-gray;
            }
            &:hover,
            &:focus {
                background-color: $soft-white;
            }
        }
    }
}
</style>