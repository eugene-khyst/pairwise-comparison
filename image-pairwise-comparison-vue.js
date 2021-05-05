const app = new Vue({
  el: '#app',
  data: {
    items: [],
    pairs: []
  },
  methods: {
    addItem: function (value) {
      const newItem = new Item(value);
      for (const item of this.items) {
        this.pairs.push(new Pair(item, newItem));
      }
      this.items.push(newItem);
    }
  },
  computed: {
    sortedItems: function () {
      return Array.from(this.items).sort((a, b) => b.score - a.score);
    },
    notVotedPairs: function () {
      return this.pairs.filter(pair => !pair.voted);
    },
    nextNotVotedPair: function () {
      return this.notVotedPairs.length > 0 ? this.notVotedPairs[0] : null;
    },
    allPairsVoted: function () {
      return this.pairs.length > 0 && this.notVotedPairs.length == 0;
    }
  }
});

const filechooser = document.querySelector('#filechooser');
let images = [];

filechooser.onchange = function () {
  images.forEach(URL.revokeObjectURL);

  images = Array.from(filechooser.files)
    .filter(file => /image\/.*/.test(file.type))
    .map(file => {
      return {
        filename: file.name,
        url: URL.createObjectURL(file)
      };
    });

  app.pairs = [];
  app.items = [];
  for (const image of images) {
    app.addItem(image);
  }
}