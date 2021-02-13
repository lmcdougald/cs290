function Initialize(rows, columns)
{
  if (typeof(rows) !== "number" || typeof(columns) !== "number")
  {
    return;
  }
  rows = Math.floor(rows);
  columns = Math.floor(columns);
  
  if (rows < 1 || columns < 1)
    return;
  
  var table = document.createElement("table");
  var head = document.createElement("thead");
  var headrow = document.createElement("tr");
  var body = document.createElement("tbody");
  
  var trows = [];
  var x = 0;
  var y = 0;
  
  for (var i = 0; i < columns; ++i)
  {
    var headcol = document.createElement("th");
    headcol.innerText = "Header " + (i + 1);
    headrow.appendChild(headcol);
  }
  
  head.appendChild(headrow);
  table.appendChild(head);
  
  for (var j = 0; j < rows; ++j)
  {
    var row = document.createElement("tr");
    trows.push(row);
    for (var k = 0; k < columns; ++k)
    {
      var cell = document.createElement("td");
      cell.innerText = (j+1) + "," + (k+1);
      cell.style.borderWidth = "1px";
      cell.style.borderStyle = "solid";
      cell.style.borderColor = "white";
      cell.style.backgroundColor = "white";
      //console.log(cell);
      row.appendChild(cell);
    }
    body.appendChild(row);
  }
  
  table.appendChild(body);
  document.body.appendChild(table);
  trows[y].childNodes[x].style.borderColor = "black";
  
  
  //Create clickable buttons
  //Toggle button
  var button = document.createElement("button");
  button.addEventListener("click", function(e)
  {
    if (trows[y].childNodes[x].style.backgroundColor === "white")
    {
      trows[y].childNodes[x].style.backgroundColor = "yellow";
    }
    else trows[y].childNodes[x].style.backgroundColor = "white";
  });
  button.innerText = "Mark Cell";
  document.body.appendChild(button);
  
  //Left button
  button = document.createElement("button");
  button.addEventListener("click", function(e)
  {
    if (x > 0)
    {
      trows[y].childNodes[x].style.borderColor = "white";
      --x;
      trows[y].childNodes[x].style.borderColor = "black";
    }
  });
  button.innerText = "Left";
  document.body.appendChild(button);
  
  //Right button
  button = document.createElement("button");
  button.addEventListener("click", function(e)
  {
    if (x < columns - 1)
    {
      trows[y].childNodes[x].style.borderColor = "white";
      ++x;
      trows[y].childNodes[x].style.borderColor = "black";
    }
  });
  button.innerText = "Right";
  document.body.appendChild(button);
  
  //Up button
  button = document.createElement("button");
  button.addEventListener("click", function(e)
  {
    if (y > 0)
    {
      trows[y].childNodes[x].style.borderColor = "white";
      --y;
      trows[y].childNodes[x].style.borderColor = "black";
    }
  });
  button.innerText = "Up";
  document.body.appendChild(button);
  
  //Down button
  button = document.createElement("button");
  button.addEventListener("click", function(e)
  {
    if (y < rows - 1)
    {
      trows[y].childNodes[x].style.borderColor = "white";
      ++y;
      trows[y].childNodes[x].style.borderColor = "black";
    }
  });
  button.innerText = "Down";
  document.body.appendChild(button);
  
  
  
  //Arrowkey bindings and space/enter bindings.
  //Did this first because I misunderstood the "directional buttons" requirement
  document.addEventListener("keydown", function(e)
  {
    if (e.code == "ArrowLeft")
    {
      if (x > 0)
      {
        trows[y].childNodes[x].style.borderColor = "white";
        --x;
        trows[y].childNodes[x].style.borderColor = "black";
      }
    }
    else if (e.code == "ArrowRight")
    {
      if (x < columns - 1)
      {
        trows[y].childNodes[x].style.borderColor = "white";
        ++x;
        trows[y].childNodes[x].style.borderColor = "black";
      }
    }
    else if (e.code == "ArrowDown")
    {
      if (y < rows - 1)
      {
        trows[y].childNodes[x].style.borderColor = "white";
        ++y;
        trows[y].childNodes[x].style.borderColor = "black";
      }
    }
    else if (e.code == "ArrowUp")
    {
      if (y > 0)
      {
        trows[y].childNodes[x].style.borderColor = "white";
        --y;
        trows[y].childNodes[x].style.borderColor = "black";
      }
    }
    else if (e.code == "Enter" || e.code == "Space")
    {
      if (trows[y].childNodes[x].style.backgroundColor === "white")
      {
        trows[y].childNodes[x].style.backgroundColor = "yellow";
      }
      else trows[y].childNodes[x].style.backgroundColor = "white";
    }
    return;
  });
  
  return trows;
}

Initialize(4,4);