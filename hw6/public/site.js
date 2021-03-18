var output = document.getElementById("output");
var data;
var stringdata;


var req = new XMLHttpRequest();
req.addEventListener("load", function(e)
{
    console.log(e);
    console.log(e.target.response);

    var response = JSON.parse(e.target.response);
    output.innerText = response;
    data = response.prestring;
    stringdata = JSON.parse(response.results);
});
req.open("GET", "/show");
req.send();