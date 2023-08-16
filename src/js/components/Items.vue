<template>
    <div class="media-container">
        <h3 class="sr-only">Available Media</h3>
        <div class="media-items">
            <div class="media-item" v-for="item in items" :key="item.id" data-testid="media-item">
                <img class="media-item__poster" :src="item.poster" :alt="`${item.title} poster`" />
                <h4 class="media-item__title">{{ item.title }} ({{ item.year }})</h4>
                <h5 class="media-item__genres">Genres: {{ item.genre.map(capitalize).join(', ') }}</h5>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['items'],
    methods: {
        capitalize(text) {
            return text.charAt(0).toUpperCase() + text.slice(1);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../../styles/index.scss';
.media-container {
    border-top: 1px solid $light-gray;
    margin-top: 20px;
    font-family: 'Montserrat';
}
.media-items {
    color: $dark-gray;
    margin-top: 15px;
    @include xsmall {
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;
    }
    @include medium {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
    }
    @include large {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 25px;
    }
}
.media-item__poster {
    width: 100%;
}
.media-item__genres {
    margin-top: -10px;
}
</style>