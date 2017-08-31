module.exports=function priceInfo(trainNo,src,dst,date,cls,quota,age,callback){

// function seatAvailability(trainNo,src,dst,date,cls,kota){
    var request = require("request");
    var price_value;
    var options = { method: 'GET',
    url: `http://api.railwayapi.com/v2/fare/train/${trainNo}/source/${src}/dest/${dst}/age/${age}/quota/${quota}/date/${date}/apikey/663h5e2h1b/`,
    headers:
    { 'postman-token': '7d0838a3-e639-1a10-190e-a179de320833',
     'cache-control': 'no-cache' } };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    body.fare.forEach(function(element){
      if(element.code==cls){
            console.log("Fare for "+cls+" Rs."+element.fare);
            price_value=element.fare;
          }
      })


    callback(price_value);
    });
}
