// user interaction 

$(function() {
  $(".devour-btn").on("click", function(event) {
    var id = $(this).data("id");
    
    var newDevouredState = {
      devoured: true
    };
    
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(
      function() {
        location.reload();
      }
    );
  });
  
  $("#submit-burger").on("click", function(event) {
    event.preventDefault();
    var newBurger = {
      burger_name: $("#add-burger-box").val().trim(),
      devoured: false
    };
    
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        location.reload();
      }
    );
  });
});