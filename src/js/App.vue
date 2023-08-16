<template>
    <div class="media" data-testid="media">
        <Filters v-if="this.items.length" :search="search" :filteredItems="filteredItems" @resetItems="resetItems" :items="this.items" @updateFilter="updateFilter" />
        <Items v-if="!isFiltered && filteredItems.length === 0" :items="items" />
        <Items v-else-if="isFiltered && filteredItems.length > 0" :items="filteredItems" />
        <div v-else class="no-results-message" data-testid="no-results-message">No results found! Try expanding your search.</div>
    </div>
</template>

<script>
import Filters from './components/filters/Filters.vue';
import Items from './components/Items.vue';

export default {
    name: 'App',
    components: {
        Filters,
        Items
    },
    data() {
        return {
            items: [],
            filteredItems: [],
            isFiltered: false
        };
    },
    created() {
        this.getData();
        // console.log('what are the items', this.items);
    },
    methods: {
        updateFilter(filteredResults) {
            this.filteredItems = filteredResults;
            this.isFiltered = true;
        },
        search(term) {
            this.filteredItems = [];
            this.isFiltered = true;
            // console.log('Search for ', term, ' performed');
            this.filteredItems = this.items.filter((item) => {
                return item.title.toLowerCase().includes(term.toLowerCase());
            });
        },
        resetItems() {
            this.$nextTick(() => {
                this.filteredItems = [];
                this.isFiltered = false;
            });
        },
        async getData() {
            try {
                let response = await fetch('https://raw.githubusercontent.com/HubSpotWebTeam/CodeExercise/main/src/js/data/data.json');
                this.items = await response.json();
                this.items = this.items.media.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
.media {
    border: 1px solid $light-gray;
    display: flex;
    flex-direction: column;
    padding: 15px;
    @include xsmall {
        margin: 10px;
    }
    @include large {
        margin: 30px;
    }
}
.no-results-message {
    font-family: 'Montserrat';
    align-self: center;
}
</style> 