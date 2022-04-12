<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div v-for="cat in categoryList">
          <input type="checkbox" :id="cat" :value="cat" v-model="categories" />
          <label :for="cat">{{ cat }}</label>
        </div>
        <br />
        <span>You have chosen: {{ categories }}</span>
      </div>
      <div class="col">
        <strong>Items in chosen category(s)</strong>

        <ul>
          <li v-for="item in selectedItems">category: {{ item.category }} | name: {{ item.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ref',
  data() {
    return {
      categoryList: ['animal', 'fruit', 'clothes'],
      categories: [],
      items: [
        { id: '1', name: 'apple', description: 'description about product', category: 'fruit' },
        { id: '2', name: 'mango', description: 'description about product', category: 'fruit' },
        { id: '3', name: 'shoes', description: 'description about product', category: 'footwear' },
        { id: '4', name: 'shirt', description: 'description about product', category: 'clothes' },
        { id: '5', name: 'dog', description: 'description about product', category: 'animal' },
        { id: '6', name: 'cat', description: 'description about product', category: 'animal' },
      ],
    };
  },
  computed: {
    computed: {
      selectedItems: function () {
        return this.items.filter(function (item) {
          return this.categories.includes(item.category);
        }, this);
      },
    },
  },
};
</script>