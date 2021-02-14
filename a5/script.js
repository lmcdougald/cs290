function weather()
{
  var city = document.getElementById("city").value;
  var zip = document.getElementById("zip").value;
  var country = document.getElementById("country").value;
  var url = "";
  var output = document.getElementById("form1");
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
    output.innerText = e.target.response;
  });
  req.open("GET", url);
  req.send();
}

function post()
{
  var text = document.getElementById("postdata").value;
  var url = "https://postbin.org/post";
  var output = document.getElementById("form2");
  var req = new XMLHttpRequest();
  req.addEventListener("load", function(e)
  {
    console.log(e.target.response);
    output.innerText = e.target.response;
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
}