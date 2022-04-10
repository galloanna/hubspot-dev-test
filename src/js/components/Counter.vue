<template>
  <div class="counter">
    <h1>{{ count }}</h1>
    <button @click="increase">+</button>
    <button @click="decrease">1</button>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  data: () => ({
    count: 0,
  }),
  methods: {
    increase() {
      this.count++;
    },
    decrease() {
      this.count--;
    },
  },
};
</script>

<style scoped>
.counter {
  background-color: red;
  border-radius: 10px;
  color: white;
  display: inline-block;
  padding: 10px 15px 20px 10px;
  text-align: center;
  width: 100px;
}
</style>
