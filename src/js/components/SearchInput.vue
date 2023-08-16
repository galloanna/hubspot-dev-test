<template>
    <form role="search" @submit.prevent="submitSearch">
        <input class="search" aria-label="Search" type="search" id="search" :value="term" @input="updateTerm" placeholder="Search" />
    </form>
</template>

<script>
export default {
    props: {
        term: String,
        search: Function
    },
    methods: {
        updateTerm(event) {
            this.$emit('update:term', event.target.value);
        },
        submitSearch() {
            this.search(this.term);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../../styles/index.scss';
.search {
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 1px solid $light-gray;
    height: 100%;
    border-radius: 2px;
    position: relative;
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
.search::placeholder {
    font-family: 'Montserrat';
    font-size: 14px;
    color: $dark-gray;
    font-weight: 700;
}
</style>