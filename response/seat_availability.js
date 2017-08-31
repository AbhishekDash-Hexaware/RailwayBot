module.exports={
  'seatCarousel':function(data,class_name,quota_name,train_name,response) {

    //console.log("forming");
    let dynamicBody=[];

    for(var i=0;i<data.length;i++){
      let title="Seat Status for "+data[i].date;
      let status=data[i].status;
      let subtitle="Status: "+status+" Class: "+class_name+"\nQuota: "+quota_name+"\nTrain: "+train_name;
        dynamicBody.push({
          "title": title,
          "subtitle": subtitle,
        })
    }


  var facebookResponse={

          "speech": "",
          "displayText": "",
          "data": {
            "facebook": [{
              "text":"Here are the available seats for this train for the next 5 days."
            },{
              "attachment": {
                "type": "template",
                "payload": {
                  "template_type": "generic",
                  "elements": dynamicBody
                  }
                }
              },
              {
                  "text":"Is there anything else?",
                  "quick_replies":[
                  {
                    "content_type":"text",
                    "title":"Find Another Train",
                    "payload":"find_train"
                  },
                  {
                    "content_type":"text",
                    "title":"Check PNR Status",
                    "payload":"pnr_status"
                  },
                  {
                    "content_type":"text",
                    "title":"Another Question",
                    "payload":"another_query"
                  },
                  {
                    "content_type":"text",
                    "title":"That's all",
                    "payload":"thanks"
                  }
                ]
              }]
            },
          "contextOut": [],
          "source": "DuckDuckGo"
          }

    response.send(facebookResponse);
  //  console.log("sent");
  }
}
