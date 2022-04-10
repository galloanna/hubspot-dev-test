<template>
  <div>
    <div>Hello, Vue!</div>
    <Counter />
  </div>
</template>

<script>
import Counter from './components/Counter.vue';
export default {
  name: 'App',
  components: {
    Counter,
  },
};
</script>