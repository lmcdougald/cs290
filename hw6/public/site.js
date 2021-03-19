function spa()
{
    var id = document.getElementById("id");
    var name = document.getElementById("name");
    var reps = document.getElementById("reps");
    var weight = document.getElementById("weight");
    var date = document.getElementById("date");
    var lbs = document.getElementById("lbs");
    var output = document.getElementById("output");
    var submit = document.getElementById("submit");
    var reset = document.getElementById("reset");
    var reload = document.getElementById("reload");

    var data;
    var stringdata;

    submit.addEventListener("click", function(e)
    {
        form_submit();
        e.preventDefault();
    })

    submit.onkeydown = function(e)
    {
        if (e.code == "Enter")
        {
            form_submit();
            e.preventDefault();
        }
    }

    reset.addEventListener("click", function(e)
    {
        table_reset();
        e.preventDefault();
    })

    reset.onkeydown = function(e)
    {
        if (e.code == "Enter")
        {
            table_reset();
            e.preventDefault();
        }
    }

    reload.addEventListener("click", function(e)
    {
        load();
        e.preventDefault();
    })

    reload.onkeydown = function(e)
    {
        if (e.code == "Enter")
        {
            load();
            e.preventDefault();
        }
    }


    function form_submit()
    {
        var fields = 
        {
            form_id : id.value,
            form_name : name.value,
            form_reps : reps.value,
            form_weight : weight.value,
            form_date : date.value,
            form_lbs : lbs.checked
        };
        console.log(fields);
        load();
    }

    function load()
    {  
        var req = new XMLHttpRequest();
        req.addEventListener("load", function(e)
        {
            console.log(e);
            console.log(e.target.response);

            var response = JSON.parse(e.target.response);
            output.innerText = response;
            stringdata = JSON.parse(response.results);
        });
        req.open("GET", "/show");
        req.send();
    }

    function table_reset()
    {
        var req = new XMLHttpRequest();
        req.addEventListener("load", function(e)
        {
            console.log(e.target.response);
        });
        req.open("GET", "/table-reset");
        req.send();
    }


    return stringdata;
}

spa();