console.log(squarer(5));
console.log(square(5));

var squarer = function(x) 
{
    return square(x);
}

function square(x) {
  return x * x;
}

console.log(squarer(5));