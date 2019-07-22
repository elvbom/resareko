$("#submit").on("click", function(e) {
  alert('hej');
  e.preventDefault();//prevent default action 

});

/*$(function() {
  $(window).load(function() {
    $('#Modal').modal('show');

  });

   $('#submit').click(function(){
      var name  = $(":input[name='name']").val();
      var email = $(":input[name='email']").val();

      var varData = 'name=' + name + '&email=' +email; 

      $.ajax({
        type: 'POST',
        url: 'email_form.php',
        data: varData,
        success: function(){
            alert('Mail sent. Thank you.');
        }
    });
});
});*/