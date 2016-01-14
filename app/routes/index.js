"use strict"

var Search = require(process.cwd() + '/app/model/terms.js'),
    Bing = require('bing.search'),
    util = require('util');



module.exports = function(app) {


var bing = new Bing(process.env.BING_ACC_KEY,50,true);


  //main route to serve index.html
    app.route('/')
    .get(function(req,res){
        res.sendFile(process.cwd() + '/public/index.html');
    });


  //imagesearch api
app.route('/api/search/:term?/:page?')
.get(function(req,res){
  if(!req.params.term) {
    res.send("you didn't search string after /api/search/.....");
  } else {
  console.log("search : " + req.params.term);
var search = new Search({'term': req.params.term,'page': 1});
  search.save(function(err,search){
    if (err) {
      throw(err);
    }
  });
  //search bing for images
  var skipNo = 0;
  if (req.params.page){
    skipNo = req.params.page*10;
  }
  console.log("skip : " + skipNo)
  bing.images(req.params.term,
    {top: 10,skip: skipNo},
    function(err, results) {
      if (err) {
        throw(err);
      }
        res.send(results.map(function(doc){
          var newDoc ={"context":doc.sourceUrl, "thumbnail":doc.thumbnail.url,"snippet":doc.title, "url":doc.url}
          return newDoc;
        }));
    }
  );
};
});

app.route('/api/latest')
.get(function(req,res){
  Search.find({},function(err,result){
    if (err) {
      throw(err);
    }
    //sort stored searches, newest first
    var sorted = result.sort(function(a,b){
    console.log(a.date + " " + b.date);
    if (a.date > b.date) {
      return -1;
      }
    if (a.date < b.date) {
      return 1;
    }
    // a must be equal to b
      return 0;
    }).slice(0,10);
    res.send(sorted.map(function(doc){
      var newDoc ={"term":doc.term, "date":doc.date}
      return newDoc;
    }));
  });
});


    //all other get request will result in 400 error
    app.use(function(req, res){
        res.sendStatus(404);
    });



}
