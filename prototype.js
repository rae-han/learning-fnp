let person = {
  name: 'Lee',
  gender: 'male',
  sayHello: function(){
    console.log('Hi! my name is ' + this.name);
  }
};

console.dir(person);

console.log(person.__proto__ === Object.prototype)
console.log(Object.prototype.constructor === Object)
console.log(Object.__proto__ === Function.prototype)
console.log(Function.prototype.__proto__ === Object.prototype)

function Person(name, gender) {
  this.name = name;
  this.gender = gender;
  this.sayHello = function(){
    console.log('Hi! my name is ' + this.name);
  };
}

let foo = new Person('Lee', 'male');

console.dir(Person);
console.dir(foo);

console.log(foo.__proto__ === Person.prototype)
console.log(Person.prototype.__proto__ === Object.prototype)
console.log(Person.prototype.constructor === Person)
console.log(Person.__proto__ === Function.prototype)
console.log(Function.prototype.__proto__ === Object.prototype)

let str = 'test';

String.prototype.myMethod = function() {
  return 'myMethod';
}

console.log(str.myMethod());
console.dir(String.prototype);

console.log(str.__proto__ === String.prototype)
console.log(String.prototype.__proto__  === Object.prototype)
console.log(String.prototype.constructor === String)
console.log(String.__proto__ === Function.prototype)
console.log(Function.prototype.__proto__  === Object.prototype)