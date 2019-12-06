const ANIMALS = ["hyena", "penguin", "bear", "rabbit", "alligator", "beaar"]

function road_kill(photo) {
	let identify = photo.replace(/=/g, "").split(''), char = identify[0], patt = [], i = 1, counter = 1;
  if (identify.length == 0 || photo.match(/[$\s\d]/)) {return "??"};
	while (i <= identify.length) {
		if (i == identify.length) {
			pattern = `^${patt.reduce((p, ar) => {return p += `${ar[0]}{1,${ar[1]}}`}, "")}${char}{1,${counter}}$`;
			reversePattern = `^${char}{1,${counter}}${patt.reverse().reduce((p, ar) => {return p += `${ar[0]}{1,${ar[1]}}`}, "")}$`;
		} else if (identify[i] === char) {
			++counter;
		} else {
			patt.push([char, counter]);
			char = identify[i];
			counter = 1;
		}
		++i;
	}

  let check = ANIMALS.filter(animal => animal.match(pattern));
	let checkReverse = ANIMALS.filter(animal => animal.match(reversePattern));

	if (check.length) {
		return check[0];
	} else if (checkReverse.length) {
		return checkReverse[0];
	} else {
		return "??";
	}
}

var assert = require('assert');
assert.equal(road_kill("==========h===yyyyyy===eeee=n==a========"), "hyena")
assert.equal(road_kill("======pe====nnnnnn=======================n=n=ng====u==iiii=iii==nn========================n="), "penguin")
assert.equal(road_kill("=====r=rrr=rra=====eee======bb====b======="), "bear")
