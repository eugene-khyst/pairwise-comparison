const app = new Vue({
  el: '#app',
  data: {
    newItemValue: '',
    items: [],
    pairs: []
  },
  methods: {
    addItem: function () {
      if (!this.newItemValue) {
        return;
      }
      const newItem = new Item(this.newItemValue);
      for (const item of this.items) {
        this.pairs.push(new Pair(item, newItem));
      }
      this.items.push(newItem);
      this.newItemValue = '';
    }
  },
  computed: {
    sortedItems: function () {
      return Array.from(this.items).sort((a, b) => b.score - a.score);
    },
    maxScore: function () {
      return Math.max.apply(null, this.items.map(item => item.score));
    },
    winners: function () {
      if (this.pairs.length == 0 || this.notVotedPairs.length > 0) {
        return [];
      };
      return this.items.filter(item => item.score == this.maxScore);
    },
    notVotedPairs: function () {
      return this.pairs.filter(pair => !pair.voted);
    }
  }
});
