class Solution {

  constructor(value) {
    this.value = value;
    this.satisfiedRequirements = [];
  }

  get score() {
    return this.satisfiedRequirements.map(requirement => requirement.score).reduce((sum, score) => sum + score, 0);
  }

  satisfies(requirement) {
    this.satisfiedRequirements.push(requirement);
  }

  notSatisfies(requirement) {
    for (let i = 0; i < this.satisfiedRequirements.length; i++) {
      if (this.satisfiedRequirements[i] === requirement) {
        this.satisfiedRequirements.splice(i, 1);
        i--;
      }
    }
  }
}

const app = new Vue({
  el: '#app',
  data: {
    newRequirementValue: '',
    newSolutionValue: '',
    requirements: [],
    requirementPairs: [],
    solutions: []
  },
  methods: {
    addRequirement: function () {
      if (!this.newRequirementValue) {
        return;
      }
      const newRequirement = new Item(this.newRequirementValue, 1);
      for (const requirement of this.requirements) {
        this.requirementPairs.push(new Pair(requirement, newRequirement));
      }
      this.requirements.push(newRequirement);
      this.newRequirementValue = '';
    },
    addSolution: function () {
      if (!this.newSolutionValue) {
        return;
      }
      this.solutions.push(new Solution(this.newSolutionValue));
      this.newSolutionValue = '';
    },
    evaluateSolution: function (e, solution, requirement) {
      if (e.target.checked) {
        solution.satisfies(requirement);
      } else {
        solution.notSatisfies(requirement)
      }
    }
  },
  computed: {
    sortedRequirements: function () {
      return Array.from(this.requirements).sort((a, b) => b.score - a.score);
    },
    notVotedPairs: function () {
      return this.requirementPairs.filter(pair => !pair.voted);
    },
    sortedSolutions: function () {
      return Array.from(this.solutions).sort((a, b) => b.score - a.score);
    },
    maxScore: function () {
      return Math.max.apply(null, this.solutions.map(solution => solution.score));
    },
    winners: function () {
      if (this.maxScore > 1) {
        return this.solutions.filter(item => item.score == this.maxScore);
      } else {
        return [];
      }
    },
  }
});
