module.exports={
  'seatCarousel':function(multidata,response) {
    var data=multidata[0].availability;
    var train_name=multidata[0].train_name;
    var class_name=multidata[0].cls;
    var quota_name=multidata[0].quota;
    var price=multidata[1].price;

    if(train_name =="UNAVAILABLE"){
      var flag=1;
    }

    var messageOne="Here are the available seats in the "+train_name+" for the next 5 days it runs.";
    //console.log("forming");
    let dynamicBody=[];

    for(var i=0;i<data.length;i++){
      let title="Seat Status for "+data[i].date;
      let status=data[i].status;
      let subtitle="Status: "+status+"\nClass: "+class_name+"\nQuota: "+quota_name+"\nFare: ₹"+price;
        dynamicBody.push({
          "title": title,
          "subtitle": subtitle,
        })
    }

  if(flag==1){
    var messageOne="It seems the seats available for this train is unavailable at the moment. Try for this train later or go ahead for another train."
      var facebookResponse={

          "speech": "",
          "displayText": "",
          "data": {
            "facebook": [{
              "text":messageOne
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
  }
  else{
  var facebookResponse={

          "speech": "",
          "displayText": "",
          "data": {
            "facebook": [{
              "text":messageOne
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
  }

    response.send(facebookResponse);
  //  console.log("sent");
  }
}
