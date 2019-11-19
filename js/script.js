console.log('location details');

$('#map').hide();

$(document).ready(function(){
  $('#details').click(function(){
    $('#map').show();
    var place=document.getElementById('place').value;
    var duration = document.getElementById('duration').value;
    console.log(place,duration);
    initMap(place,duration);
  });


});


//date calculation
//validate user entry
$('#startDate').datepicker({
  dateFormat: 'yy-mm-dd',
  changeMonth: true,
  minDate: new Date(),
  maxDate: '+1y',
  onSelect: function(date){
    var selectDate = new Date(date);
    var msecsInADay = 86400000; // number of milliseconds in a day
    var stDate = new Date(selectDate.getTime() + msecsInADay); //considering the time of the day when the site is used

    //set minimm date of endDatePicker after selecteddate of startDate
    $('#endDate').datepicker('option', 'minDate', stDate);

    var enDate = new Date(selectDate.getTime() + 15 * msecsInADay);

    $('#endDate').datepicker('option', 'maxdate', enDate);

  }
});

$('#endDate').datepicker({
  dateFormat: 'yy-mm-dd',
  changeMonth: true
});

function dateDiff(){
  // console.log(calc);
  var start = $(startDate).datepicker('getDate');
  var end = $(endDate).datepicker('getDate');
  // convert milliseconds to seconds then to seconds, then to minutes, then to hours
  var days = (end - start)/1000/60/60/24; //user readable format

  document.getElementById('days').value = days;
  return;
}

$('#calcDate').click(function(){
  console.log('date');
  dateDiff();
});

var myKey = JSON.parse(apiKey);
//console.log(myKey[0].key);

var locations = [
  {
    name : "Pak & Sav Petone",
    place: "lowerHutt",
    distance : "5.6 Km",
    travelDuration: 19,
    longAndLat : {lat:-41.2052562, lng:174.9133139}
    },
  {
    name : "Pak & Sav Lower Hutt",
    place: "lowerHutt",
    distance : "23.5 Km",
    travelDuration: 40,
    lat:-41.205244,
    long:174.9111033
  },
  {
    name : "Pak & Sav Kilbirnie",
    place: "Wellington",
    distance : "1.6 Km",
    travelDuration: 7,
    longAndLat : {lat:-41.319012, lng:174.7944573}
  },
  {
    name : "Pak & Sav Upper Hutt",
    place: "upperHutt",
    distance : "5.6 Km",
    travelDuration: 17,
    longAndLat : {lat:-41.1239729, lng:175.0644122}
  },
  {
    name : "Pak & Sav Masterton",
    place: "masterton",
    distance : "40.2 km",
    travelDuration: 52,
    longAndLat : {lat: -40.9572025, lng: 175.6474858}
    }
  // {
  //   name : "Charcoal Bay",
  //   place: "Auckland",
  //   distance : "17.5 km",
  //   travelDuration: 26,
  //   lat: -36.8017,
  //   long: 174.6855
  // }
] //end of array of objects

var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key='+ myKey[0].key ;
document.getElementsByTagName('body')[0].appendChild(script);


// function initMap(p,d){
//   console.log(p,d);
//
//  var oldwindow;
//  var center;
//   //center coordinates
//   if (p === "Wellington") {
//    center = {lat: -41.319012, lng: 174.7944573};
//   } else if (p === "lowerHutt"){
//     center = {lat:-41.205244 , lng:174.9111033 };
//   } else if (p === "upperHutt"){
//     center = {lat:-41.1239729 , lng:175.0644122 };
//   } else {
//     center = {lat:-40.9572025 , lng:175.6474858 };
//   }
//   //map object
//   var map = new google.maps.Map(
//       document.getElementById('map'), {
//       zoom:15,
//       center: center,
//     });//end of map objects
//
//   // loop through all the objects in the array locations
//     for(var i = 0; i<locations.length; i++){
//       console.log(p,typeof(p), d, typeof(d));
//       console.log(locations[i].place, typeof(locations[i].place));
//       console.log(locations[i].travelDuration, typeof(locations[i].travelDuration));
//       console.log(locations[i].place === p);
//       console.log(locations[i].travelDuration <= d);
//
//       if (locations[i].place === p && locations[i].travelDuration <= d){
//       //create content dynamically
//       var content = '<div class="bg-primary h4" id="' + locations[i].id + '">' +
//       '<h5> '+ locations[i].name + '</h5>' +
//       '<h6>'+ locations[i].place + '</h6>' +
//       '<h6>Distance: '+ locations[i].distance + '</h6>'+
//       '<h6>Duration: '+ locations[i].travelDuration + ' min</h6>' +
//       '<h6> from the nearest i-site visitor\'s information center</h6>'+
//       '</div>';
//
//       // create infowindow
//       var infowindow = new google.maps.InfoWindow({
//         content : content
//       });
//
//       //position to add marker
//       var position = {lat:locations[i].lat , lng:locations[i].long };
//
//       //crete marker
//       var marker = new google.maps.Marker({
//         position : position,
//         map : map
//       });
//
//       newWindow(marker, infowindow);
//
//       function newWindow(newMarker, newInfowindow){
//
//         newMarker.addListener('click', function(){
//           if (oldwindow){
//             oldwindow.close();
//           }
//           newInfowindow.open(map, newMarker);
//           oldwindow=newInfowindow;
//
//         });//end of addListener
//       }//end of newwindow function
//
//
//      }
//     }//end of for
//
//   }//end of initMap



function initMap(){
  var center;
   var oldwindow;
    //center coordinates
       center = {lat: -41.2911449, lng: 174.7814447};
    //map object
        map = new google.maps.Map(
           document.getElementById('map'), {
           zoom:12,
           center: center,
           mapTypeId: 'roadmap',
           styles: [
             {
               featureType: 'road',
               elementType: 'geometry',
               stylers:[
                 {
                   // color: '#48dbfb'
                   lightness: '-40'
                 }
               ]
             },
             {
             featureType: 'road',
             elementType: 'labels.text.fill',
             stylers:[
               {
                 // color: '#48dbfb'
                 color: '#34495e'
               }
             ]
           },
           {
           featureType: 'landscape',

           stylers:[
             {
               // color: '#48dbfb'
               color: '#2ecc71'
             }
           ]
         },
         {
         featureType: 'water',

         stylers:[
           {
             // color: '#48dbfb'
             color: '#17263c'
           }
         ]
       },
           ]
        });
        for(i=0; i<locations.length;i++){
           // Adds all of the markers from the brewery array
           addMarkers(locations[i]);
        }
        function addMarkers(props){
            // Creates the marker variable
            var myIcon = 'http://maps.google.com/mapfiles/kml/shapes/motorcycling.png';
             var marker = new google.maps.Marker({
                animation: google.maps.Animation.BOUNCE,
                 // Positions the marker to where the brewery is located
                 position: props.longAndLat,
                 // adds the marker to the specific map
                 map: map,
                 icon: myIcon
               })
}
};
