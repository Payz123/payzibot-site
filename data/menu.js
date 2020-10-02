$(document).ready(() => {
  $("#openm").click(function() {
    let token = localStorage.getItem("token");
    if ($(this).hasClass("open")) {
      $(this).attr(
        "src",
        "https://cdn.glitch.com/48f2db7f-9120-4cb0-af29-10c396b1a810%2F20200815_202147.png?v=1597497818884"
      );
      $(this).removeClass("open");
      $("#inv").addClass("none");
      if (token) $("#gl").addClass("none");
      $("#menu").animate({ height: "8%" }, 500);
    } else {
      $(this).attr(
        "src",
        "https://cdn.glitch.com/48f2db7f-9120-4cb0-af29-10c396b1a810%2F20200815_202230.png?v=1597497824119"
      );
      $(this).addClass("open");
      $("#menu").animate({ height: "20%" }, 500, () => {
        $("#inv").removeClass("none");
        if(token) $("#gl").removeClass("none")
      });
    }
  });
});
