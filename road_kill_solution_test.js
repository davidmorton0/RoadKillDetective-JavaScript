const ANIMALS = ["hyena", "penguin", "bear", "rabbit", "alligator", "beaar"]

//solution test, which fails if there is an animal called a "beaar" or similar situations

const collectPieces = str => str.replace(/=/g, '');
const dedupe = str => str.split('').reduce((a, b) => a + (a[a.length -1] === b ? '' : b), '');
const reverse = str => str ? str.split('').reverse().join('') : '';
const counter = str => str.split('').reduce((obj, x) => (obj[x] = obj[x] + 1 || 1, obj), {});

const animals = ANIMALS.reduce((obj, name) => {
  const deduped = dedupe(name);
  obj[deduped] = name;
  obj[reverse(deduped)] = name;
  return obj;
}, {});

const reassemble = (pieces, animal) => {
  const animalPartCounts = counter(animal);
  const pieceCounts = counter(pieces);
  return animal.split('').every(x => pieceCounts[x] >= animalPartCounts[x]);
}

const road_kill = photo => {
  const pieces = collectPieces(photo);
	console.log(pieces);
  const animal = animals[dedupe(pieces)] || ''
	console.log(animal);
  const enoughPieces = reassemble(pieces, animal) || reassemble(pieces, reverse(animal));
  return (animal && enoughPieces) ? animal : '??';
}

var assert = require('assert');
assert.equal(road_kill("==========h===yyyyyy===eeee=n==a========"), "hyena")
assert.equal(road_kill("======pe====nnnnnn=======================n=n=ng====u==iiii=iii==nn========================n="), "penguin")
assert.equal(road_kill("=====r=rrr=rra=====eee======bb====b======="), "bear")
