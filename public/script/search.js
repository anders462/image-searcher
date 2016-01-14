





var submit = document.getElementById("submit");



// define event handler for button 1 click
submit.onclick = function() {
var term = document.getElementById('search').value;
console.log(term);

if (term !=""){
var request = new XMLHttpRequest();
request.open('GET', '/api/search/' + term, true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = JSON.parse(request.responseText);
    console.log(data);

  } else {
    // We reached our target server, but it returned an error
    console.log(request.status);
  }
  $("#content").empty();
  data.forEach(function(value){
    $('#content').append('<span><img src="' + value.thumbnail + '"></span>');
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
  $.getJSON('/api/latest', function(data) {
    $("#content").empty();
    data.forEach(function(value){
      $('#content').append('<tr><td><strong>Search Term:</strong>&nbsp&nbsp' + value.term + ',     ' + '<strong>Date:</strong>    ' + value.date + '</td></tr>');
    });

  });

})


$('#clear').click(function(){
  $("#content").empty();
  if($("#search").val()!=""){
    $('#search').val('');
  }
});
