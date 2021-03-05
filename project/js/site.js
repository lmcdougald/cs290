function toggleMenu()
{
    var isVisible = !$('.sidebar-head').hasClass('sidemenu-in');
    $("#menu").attr("src", isVisible ? "/iconw/menu.svg" : "/iconw/x.svg");
    $(".sidebar-head")
        .toggleClass('sidemenu-in')
        .animate(isVisible ? 'slidein' : 'slideout', 500, "linear");
    $(".sidebar-rowbutton")
        .toggleClass('sidemenu-in')
        .animate(isVisible ? 'slidein' : 'slideout', 500, "linear");
    $(".sidebar-rowhover")
        .toggleClass('rowhover-in')
        .animate(isVisible ? 'rowhoverin' : 'rowhoverout', 500, "linear");
    if (isVisible) {
        $("#body").unbind("click", toggleMenu);
    }
    else
    {
        $("#body").click(toggleMenu);
    }
}

$("#menu").click(toggleMenu);

$(".sidebar-rowhover").first().click(function (e) {
    //views = viewManager();
});
$(".sidebar-rowhover").eq(2).click(function (e) {
    //views = viewManager(1);
});
