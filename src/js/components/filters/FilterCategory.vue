<template>
    <div class="filters__category">
        <button :aria-controls="id" aria-haspopup="true" class="filters__category-header" @click="toggleDropdown" :aria-expanded="showDropdown" :data-testid="`${title}-button`">
            <span v-if="selectedOptions.length === 0">{{ makeSingular(title) }}</span>
            <span v-else-if="selectedOptions.length === 1">{{ selectedOptions.length }} {{ makeSingular(title) }}</span>
            <span v-else>{{ selectedOptions.length }} {{ title }}</span>
        </button>
        <div
            :id="id"
            role="dialog"
            :aria-label="`${title} Options`"
            v-if="showDropdown"
            v-click-outside="closeDropdown"
            class="filters__category-options"
            :class="[showDropdown ? 'filters__category-options--active' : '']"
        >
            <legend class="sr-only">Choose {{ title.toLowerCase() }}</legend>
            <label class="filters__category-option" :for="option" v-for="(option, index) in options" :key="option" @keydown.esc="closeDropdown">
                <input
                    :id="option"
                    :value="option"
                    :name="id"
                    type="checkbox"
                    :checked="selectedOptions.includes(option)"
                    @change="updateSelectedOptions(option)"
                    :data-testid="`${option}-checkbox`"
                />
                {{ option }}
            </label>
        </div>
    </div>
</template>

<script>
import { clickOutside } from 'click-outside-vue3';

export default {
    props: {
        title: String,
        options: Array,
        selectedOptions: Array
    },
    directives: {
        clickOutside
    },
    data() {
        return {
            showDropdown: false
        };
    },
    computed: {
        id() {
            return this.title.toLowerCase();
        }
    },
    methods: {
        makeSingular(text) {
            return text.substring(0, text.length - 1);
        },

        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
        },
        closeDropdown() {
            this.showDropdown = false;
        },
        updateSelectedOptions(option) {
            const index = this.selectedOptions.indexOf(option);
            if (index !== -1) {
                this.selectedOptions.splice(index, 1);
            } else {
                this.selectedOptions.push(option);
            }
            this.$emit('update:selectedOptions', this.selectedOptions);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../../../styles/index.scss';
.filters__category {
    display: flex;
    flex-direction: column;
    width: 100%;
    @include xsmall {
        min-width: 50%;
    }
    @include medium {
        min-width: 150px;
    }
}
.filters__category:not(:last-child) {
    margin-right: 20px;
}
.filters__category-header {
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
}
.filters__category-header::after {
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
.filters__category-options {
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
    visibility: hidden;
}
.filters__category-options--active {
    visibility: visible;
}
.filters__category-option {
    cursor: pointer;
    font-family: 'Montserrat';
    padding: 10px;
}
.filters__category-option:not(:last-child) {
    border-bottom: 1px solid $light-gray;
}
.filters__category-option:hover,
.filters__category-option:focus {
    background-color: $soft-white;
}
</style>
