<template>
    <button class="filters__clear-button" @click="resetFilters">Clear Filters</button>
</template>

<script>
export default {
    props: {
        resetFilters: {
            type: Function,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../../styles/index.scss';
.filters__clear-button {
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
</style>
