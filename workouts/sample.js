var country = "India";
var add = 5 + 6
console.log(add)
var sub = 8 - 6


function geet(name){
    console.log("Hello"+name)
}
geet("Ravi")
for(let i=0;i<5;i++){
    console.log(i)
}


let car = {brand : "BMW", model : "m5", year : 2020}
console.log(x1)
var x1 = 10

//reassigning
let ac = "abc"
ac = "def"
console.log(ac)

function selectfruit(fruit) {
    let message = "";
   switch(fruit) {
        case 'apple':
            message = "apple is selected";
            break;
        case 'mango':
            message = "mango is selected";
            break;
        default:
            message = "select any fruit";
    }
    console.log(message); 
}
selectfruit('apple');

//////////////////

function ValidAge(age){
    if(age<18){
        console.log("Not valid")
    }
    else{
        console.log("Valid")
    }
}
ValidAge(20)

const greet = name => {
    return 'hello, ${name}';
}
console.log(greet('Ravi'));

//spread operator
const number = [1,2,3,4,5];
const moreNum = [7,8,9];
const combined = [...number,...moreNum];
console.log(combined);

const person = {name : "Ravi", age : 25};
const updatePerson = {...person, city : "Erode"};
console.log(updatePerson);


//destructuring
const num = [1,2,3,4,5];
const [a,b,c,d,e] = num;
console.log(a,b,c,d,e);

const[first, ,third] = num;
console.log(first,third);

const[x,y,...rest] = num;
console.log(x,y);
console.log(rest);

const user = {name : "Ravi ~", age : 19, city : "Erode"};
const {name, age} = user;
console.log(name, age);


///map and filter
const num1 =[10,20,30,40,50];
const num2 = num1.map(num1 => num1 * num1);
console.log(num2);

const evenNum = num1.filter(num1 => num1 % 2 === 0);
console.log(evenNum);


const  sum = num1.reduce((acc, curr) => acc + curr, 0);
console.log(sum);
function sum(...numbers){
    return numbers.reduce((total,num) => total + num,0);
}
console.log(sum(1,2,3,4,5));
