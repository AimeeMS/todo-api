//to update object, you must mutate it (not redeclare it)

// var person = {
// 	name: 'Aimee',
// 	age: 21
// }

// function updatePerson(object) {
// 	// object = {
// 	// 	name: 'Aimee',
// 	// 	age: 24
// 	// };
// 	// return object;
// 	object.age = 18;
// }

// updatePerson(person);
// console.log(person);

// Array example
/*
new array of grades
function addgrade adds grade with push

function addgrade assign new value
*/

var numbers = [12,67,43];

function addGrade (num) {
	numbers.push(num);
};

function addGradeNew (numbers, num) {
	//actually creates a new array with same name
	numbers = [12, 67, 43, num];
	//node debug fileName.js
	//lets you pause your code and see what variables have what values when
	debugger;
};

//works
addGrade(5);
console.log(numbers);

//doesn't work
addGradeNew(29);
console.log(numbers);