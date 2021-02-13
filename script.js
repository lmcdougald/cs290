/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log("Lets make sure JavaScript is working.");

const obj4 = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj4)); // console: ['0', '1', '2']

const obj3 = { 2: 'c', 1: 'b', 0: 'a' };
console.log(Object.keys(obj3)); // console: ['0', '1', '2']

function deepEqual(obj1, obj2)
{
  if (typeof(obj1) !== 'object' && typeof(obj2) !== 'object' 
      && typeof(obj1) !== 'function' && typeof(obj2) !== 'function')
  {
    return obj1 === obj2;
  }
  if (obj1 === null || obj2 === null)
  {
    return obj1 === obj2;
  }
  if (typeof(obj1) === 'object' && typeof(obj2) === 'object')
  {
    let obj1keys = Object.keys(obj1);
    let obj2keys = Object.keys(obj2);
    
    if (obj1keys.length !== obj2keys.length)
      return false;
    
    for (let i = 0; i < obj1keys.length; ++i)
    {
      if (obj1keys[i] !== obj2keys[i])
        return false;
      else if (!deepEqual(obj1[obj1keys[i]], obj2[obj2keys[i]]))
        return false;
    }
    return true;
  }
  return false;
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
console.log(deepEqual(obj, null));