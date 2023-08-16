<template>
    <div class="filters__types">
        <form>
            <fieldset>
                <legend class="sr-only">Choose a media type</legend>
                <label tabindex="0" class="filters__type-label" :for="type" v-for="(type, index) in types" :key="type">
                    <input tabindex="0" class="filters__type-input" type="radio" :id="type" :value="type" :checked="selectedTypes.includes(type)" @change="updateSelectedType(type)" />
                    {{ type.charAt(0).toUpperCase() + type.substr(1) + 's' }}
                </label>
            </fieldset>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        types: Array,
        selectedTypes: [Array, String]
    },
    methods: {
        updateSelectedType(value) {
            this.$emit('update:selectedTypes', value);
        }
    }
};
</script>

<style lang="scss" scoped>
.filters__types {
    margin-top: 20px;
    font-family: 'Montserrat';
    font-size: 14px;
}
fieldset {
    border: none;
    margin: 0;
    padding: 0;
    display: flex;
}
.filters__type-label {
    font-weight: 700;
    display: flex;
    cursor: pointer;
}
.filters__type-label:not(:last-child) {
    margin-right: 10px;
}
.filters__type-input {
    margin: 0 5px 0 0;
    padding: 0;
    cursor: pointer;
}
</style>
