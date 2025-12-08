const arr = [1,2,3,4,5];
arr.push(6);
console.log(arr);
arr.pop();
console.log(arr);
arr.shift(2);   //remove from beginning
console.log(arr);
arr.unshift(1);  //add at beginning
console.log(arr);


let str1 = "Hello ";
let str2 = "World";
console.log(str1.concat(",",str2,"!"));
console.log(str1.includes("HI")); //check true or false
console.log(str1.indexOf("H"));  // show the index of the character
console.log(str1.substring(0,3)); //extract part of string
