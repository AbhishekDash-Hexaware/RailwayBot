module.exports={
  'seatCarousel':function(data,response) {

    console.log("forming");
    let dynamicBody=[];
    let title="Availability Status";
    for(var i=0;i<data.length;i++){

      let status=data[i].date+"\n"+data[i].status
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
