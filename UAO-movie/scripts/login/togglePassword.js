$(".toggle-password").click(function () {
  $(this).toggleClass("fa-eye fa-eye-slash");
  if ($("#pass_signup").attr("type") == "password") {
    $("#pass_signup").attr("type", "text");
  } else {
    $("#pass_signup").attr("type", "password");
  }
});
