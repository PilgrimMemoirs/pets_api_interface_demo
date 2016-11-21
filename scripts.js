

$(document).ready(function() {


    $.ajax({
      type: "GET",
      url: "https://petdibs.herokuapp.com/pets",
      cache: false,
      dataType: "jsonp",
      success: function(data) {
        // console.log(data);

        $.each(data, function(index, pet) {
          // var v = JSON.parse(pet);
          // console.log(index);
          $("<li><a href='#' class='pet' data-id=" + pet.id + ">" + pet.name + "</a></li>").appendTo($("#pets"));
        }); // .each end

        setInfoCard();

      }// success end
    }); // $.ajax for get all pets end



    var setInfoCard =  function () {
      $('a').click( function(e){
                e.preventDefault();
                var petId = $(this).data("id");
                var pet = getPet(petId);
      });
    };

    var getPet = function (petId) {
      var url = "https://petdibs.herokuapp.com/pets/" + petId;
        $.ajax({
            type: "GET",
            url: url,
            cache: false,
            dataType: "jsonp",
            success: function(data) {
              // console.log(data);
                // var v = JSON.parse(value);
                console.log(data);
                setData(data);
            }
          });
    };

    var setData = function(pet){
      $("#pet-profile").show();
      $("#name").text(pet.name);
      $("#age").text(pet.age);

      if (pet.owner !== null ) {
        $("#owner").text(pet.name + "owned by" + pet.owner);
      } else {
        $("form").show();
        $("form").attr("action", "https://petdibs.herokuapp.com/pets/"+pet.id+"/dibs")
        $("#owner").text("Own " + pet.name);
      };
    };



    // Form to call dibs on a pet - takes a name as input
    $('form').submit(function(e) {

      e.preventDefault();
      var url = $(this).attr("action");
      var formData = $(this).serialize();

      $.ajax({
        type: "PUT",
        url: url,
        data: formData,
        crossDomain: true,
        dataType: "json",
        success: function(response){
          console.log(response);
          $('#message').html('<p> Pet added! </p>');
        },
        error: function (xhr, status) {
            alert(url);
            console.log(formData);
        }
      });
    });

 }); // doc ready end




 // $(document).ready(function() {
 //
 //   $.ajax({
 //       type: "GET",
 //       url: "https://petdibs.herokuapp.com/pets/1",
 //       cache: false,
 //       dataType: "jsonp",
 //       success: function(data) {
 //         // console.log(data);
 //
 //           // var v = JSON.parse(value);
 //           console.log(data);
 //           $("<h3>" + data.name + "</h3><br><h4>" + data.age + "</h4>").appendTo($("#pets"));
 //       }
 //     });
 //  });
