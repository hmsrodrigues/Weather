var tempMode = 0;


function getWeather() {
  //var apiURI = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=987610a81949635d87a693d63a098bd3";
  //var apiURI = "http://api.openweathermap.org/data/2.5/weather?id=2738154&appid=987610a81949635d87a693d63a098bd3";
  
  var apiURI = "./js/lousa.json";
  //var apiURI = "./lousa.json";
  var dir=0;
  $.ajax({
    url: apiURI,
    dataType: "json",
    type: "GET",
    async: "false",
	
    success: function(resp) {

      $("#tempMode").on("click", function() {
        if (this.checked) {
          $("#temp-text").html(cels.toFixed(1) + " C&deg");
          console.log("checked");
        } else
          $("#temp-text").html(fahr.toFixed(0) + " F&deg");
      });
      console.log(apiURI);
      console.log(resp.name);
      if (resp.name) {
        $("#city-text").html(resp.name1 + ", " + resp.sys.country);
		
      }
	  
      if (resp.wind) {
		 var dir = (resp.wind.deg).toFixed(1);
		if (dir > -1 ) var dir1 = 'N';
		if (dir > 22.5 ) var dir1 = 'NE';
		if (dir > 67.5 ) var dir1 = 'E';
		if (dir > 112.5 ) var dir1 = 'SE';
		if (dir > 157.5 ) var dir1 = 'S';
		if (dir > 202.5 ) var dir1 = 'SW';
		if (dir > 247.5 ) var dir1 = 'W';
		if (dir >  297.5) var dir1 = 'NW';
		if (dir >  337.5) var dir1 = 'N';
		
        //var knots = resp.wind.speed * 1.9438445;
        //$("#wind-text").html(knots.toFixed(1) + " Knots");
		$("#wind-text").html(resp.wind.speed + " m/s " + dir1 + " (" + dir + ")");
      }
	  
	  if (resp.main.humidity) {
       $("#humidity-text").html(resp.main.humidity + ' %');
      }
      if (resp.main.temp) {
        var fahr = (resp.main.temp * 9 / 5) - 459.67;
        var cels = (resp.main.temp - 273.15);
        if (cels > 24){ 
          $("#temp-text").css("color", "red");
        } else if (cels < 18){
          $("#temp-text").css("color", "blue");
        }
        $("#temp-text").html((tempMode === 1 ? fahr.toFixed(0) + " F&deg" : cels.toFixed(0) + " C&deg"));
      }
      if (resp.weather) {
        var imgURL = "http://openweathermap.org/img/w/" + resp.weather[0].icon + ".png";
        console.log(imgURL)
        $("#weatherImg").attr("src", imgURL);
        $("#weather-text").html(resp.weather[0].description);
      }   
    },
    error: function(resp) {
       alert("Error: " + e);
       clearInterval(updateinter);
    }
  });
}

function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      getWeather(position.coords.latitude, position.coords.longitude);
    })
  } else {
    alert("geolocation not available" + e);
    clearInterval(updateinter);
  }
}
var i = 0;
var updateinter = setInterval(function(){
  console.log("iteration# " + i++);
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      getWeather(position.coords.latitude, position.coords.longitude);
    })
  } else {
    alert("geolocation not available" + e);
  }
}, 300000);

getWeather();
//getLocation();