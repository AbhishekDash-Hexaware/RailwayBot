module.exports={
  'seatCarousel':function(data,response) {

    console.log("forming");
    let dynamicBody=[];

    for(var i=0;i<data.length;i++){
      let title="Seat Status for "+data[i].date;
      let status=data[i].status
        dynamicBody.push({
          "title": title,
          "subtitle": status,
        })
    }


  var facebookResponse={

          "speech": "",
          "displayText": "",
          "data": {
            "facebook": {
              "attachment": {
                "type": "template",
                "payload": {
                  "template_type": "generic",
                  "elements": dynamicBody
                  }
                }
              }
            },
          "contextOut": [],
          "source": "DuckDuckGo"
          }

    response.send(facebookResponse);
    console.log("sent");
  }
}
