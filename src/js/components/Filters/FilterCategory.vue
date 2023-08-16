<template>
    <div class="filters__category">
        <button :aria-controls="id" aria-haspopup="true" class="filters__category-header" @click="toggleDropdown" :aria-expanded="showDropdown">
            <span>{{ title }} ({{ selectedOptions.length }})</span>
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
                <input :id="option" :value="option" :name="id" type="checkbox" :checked="selectedOptions.includes(option)" @change="updateSelectedOptions(option)" />
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
