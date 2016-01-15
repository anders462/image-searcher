





var submit = document.getElementById("submit");

$('#searchRes').show();
$('#latestRes').hide();
// define event handler for button 1 click
submit.onclick = function() {
var term = document.getElementById('search').value;
console.log(term);

if (term !=""){
var request = new XMLHttpRequest();
request.open('GET', 'https://image-searcher.herokuapp.com/api/search/' + term, true);
//request.open('GET', '/api/search/' + term, true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = JSON.parse(request.responseText);
    console.log(data);

  } else {
    // We reached our target server, but it returned an error
    console.log(request.status);
  }

  $('#latestRes').hide();
  $('#searchRes').show();
  //$("#content").empty();
  data.forEach(function(value){
    $('#content').append('<img src="' + value.thumbnail + '">');
  });
};

request.onerror = function() {
  console.log("connection error");
};

request.send();
} else {
  $('#content').append("No search string entered");
}

};

$('#latest').click(function(){
$.getJSON('https://image-searcher.herokuapp.com/api/latest/', function(data) {
    //$.getJSON('/api/latest/', function(data) {


    $('#searchRes').hide();
    $('#latestRes').show();
    $("#history").empty();
    data.forEach(function(value){
      $('#history').append('<tr><td>' + value.term + '</td><td>' + value.date + '</td></tr>');
    });

  });

})


$('#clear').click(function(){
  $("#content").empty();
  $("#history").empty();
  if($("#search").val()!=""){
    $('#search').val('');
  }
});
