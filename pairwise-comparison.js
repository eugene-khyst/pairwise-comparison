class Item {

  constructor(value, score) {
    this.value = value;
    this.score = score || 0;
  }
}

class Pair {

  constructor(item1, item2) {
    this.item1 = item1;
    this.item2 = item2;
    this.winner = null;
  }

  get voted() {
    return this.winner != null;
  }

  _voteFor(item) {
    if (!this.voted) {
      item.score++;
      this.winner = item;
    }
  }

  voteForItem1() {
    this._voteFor(this.item1);
  }

  voteForItem2() {
    this._voteFor(this.item2);
  }

  isItem1Winner() {
    return this.winner == this.item1;
  }

  isItem2Winner() {
    return this.winner == this.item2;
  }
}