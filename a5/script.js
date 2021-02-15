function weather()
{
  var city = document.getElementById("city").value;
  var zip = document.getElementById("zip").value;
  var country = document.getElementById("country").value;
  var url = "";
  var temp = document.getElementById("temp");
  var feels = document.getElementById("feels");
  var min = document.getElementById("min");
  var max = document.getElementById("max");
  if (city !== "")
  {
    url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&appid=0e218b3b9b0c947c500e95cd52a23203";
  }
  else 
  {
    url = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + "," + country + "&appid=0e218b3b9b0c947c500e95cd52a23203";
  }
  var req = new XMLHttpRequest();
  req.addEventListener("load", function(e)
  {
    console.log(e);
    console.log(e.target.response);
    
    var response = JSON.parse(e.target.response);
    temp.innerText = response.main.temp;
    feels.innerText = response.main.feels_like;
    min.innerText = response.main.temp_min;
    max.innerText = response.main.temp_max;
  });
  req.open("GET", url);
  req.send();
}

function post()
{
  var text = document.getElementById("postdata").value;
  var url = "https://httpbin.org/post";
  var output = document.getElementById("form2");
  var req = new XMLHttpRequest();
  req.addEventListener("load", function(e)
  {
    var response = JSON.parse(e.target.response);
    output.innerText = response.data;
  });
  req.open("POST", url);
  req.send(text);
}

document.getElementById("weather").onkeydown = function(e)
{
  if (e.code == "Enter")
  {
    weather();
    e.preventDefault();
  }
}

document.getElementById("weathersubmit").onclick = function(e)
{
  weather();
  e.preventDefault();
}

document.getElementById("post").onkeydown = function(e)
{
  if (e.code == "Enter")
  {
    post();
    e.preventDefault();
  }
}

document.getElementById("postsubmit").onclick = function(e)
{
  post();
  e.preventDefault();
}