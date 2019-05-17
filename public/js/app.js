$('.pleaseWait').hide();

$(document).ready(function () {
  $("#weatherBtn").click(function () {
    var forcast_location = $("#forcast_location").val();
    $('.weatherContent').hide();
    $('.pleaseWait').show();
    $.ajax({
      url: `http://localhost:7777/weather?address=${forcast_location}`,
      type: "get", //send it through get method
      data: {
        name:'Veer',
        age: 28
      },
      success: function (response) {
        $('#forcastStr').text(response.forcast);
        $('#locationStr').text(response.location);
        $('#placeStr').text(response.address);
        $('.weatherContent').show();
        $('.pleaseWait').hide();
        $("#forcast_location").val('');
      },
      error: function (xhr) {
        console.log(xhr);        
      }
    });
  });
}); 