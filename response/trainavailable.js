module.exports = {
  'TrainCarousel' : function(train_number,train_name,train_travel_time,train_schedule_arrival,train_schedule_departure,train_cls,response){
    console.log("Building Train Carousel");
    var dynamicBody=[];

    var messageOne = "There are "+train_number.length+" trains available.";
    var messageTwo = "Is there anything else?";
    //checking data
    // console.log(train_number);
    // console.log(train_name);
    // console.log(train_travel_time);
    // console.log(train_schedule_arrival);
    // console.log(train_schedule_departure);


    // train_cls.forEach(function(element) {
    //  element.forEach(function(cls){
    //    cls=cls.slice(0,1)+" "+cls.slice(1);
    //  })
    // });
     for(var i=0;i<train_cls.length;i++){
       for(j=0;j<train_cls[i].code_data.length;j++){
            train_cls[i].code_data[j]=train_cls[i].code_data[j].slice(0,1)+" "+train_cls[i].code_data[j].slice(1);
       }
     }

console.log(train_cls);

    for(var i=0;i<train_number.length;i++){

      var stringifiedClass = train_cls[i].code_data.join(",");
      console.log(stringifiedClass);
      var title = train_name[i];
      var train_payload = train_number[i]+" seat "+stringifiedClass;
      console.log("Quick Reply Payload Set as : "+train_payload);
      var trainDetailsSubtitle = "No.: "+train_number[i]+" Travel Time: "+train_travel_time[i]+"\nDeparture: "+train_schedule_departure[i]+"\nArrival: "+train_schedule_arrival[i];

      dynamicBody.push({
        "title": title,
        "subtitle": trainDetailsSubtitle,
        "buttons":[
          {
            "type":"postback",
            "payload":train_payload,
            "title":"Available Seats"
          }
        ]
      })
      console.log("Train "+(i+1)+" pushed to JSON");
    }//end of loop
    console.log("The Dynamic Body for JSON has been Built");

    var facebookResponse={
                            "speech": "",
                            "displayText": "",
                            "data": {
                              "facebook": [{
                                "text":messageOne
                              },
                              {
                                  "attachment": {
                                    "type": "template",
                                    "payload": {
                                      "template_type": "generic",
                                      "elements": dynamicBody
                                     }
                                    }
                                  },
                                  {
                                      "text":messageTwo,
                                      "quick_replies":[
                                      {
                                        "content_type":"text",
                                        "title":"Another Transit",
                                        "payload":"find_train"
                                      },
                                      {
                                        "content_type":"text",
                                        "title":"PNR Status",
                                        "payload":"pnr_status"
                                      },
                                      {
                                        "content_type":"text",
                                        "title":"Another Query",
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
                          }//end of custom JSON
    console.log(JSON.stringify(facebookResponse));
    //console.log(JSON.stringify(facebookResponse));

    response.send(facebookResponse);

    //end of 'TrainCarousel' function
  },


  'TrainCarouselNoData' : function(src,dst,response){
    console.log("Building Train Carousel No Data");

    var facebookResponse = [{
      "text":"I'm sorry but there are no trains travelling from "+src+" to "+dst+" on this day."
    },{
        "text":"Is there anything else?",
        "quick_replies":[
        {
          "content_type":"text",
          "title":"Try Again",
          "payload":"find_train"
        },
        {
          "content_type":"text",
          "title":"PNR Status",
          "payload":"pnr_status"
        },
        {
          "content_type":"text",
          "title":"Another Query",
          "payload":"another_query"
        },
        {
          "content_type":"text",
          "title":"That's all",
          "payload":"thanks"
        }
      ]
    }];

    response.send(facebookResponse);
  }
}
