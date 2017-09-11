

module.exports={

  'TrainPrompts': function(request,response){

    var station_knowledge=require("../knowledge/station_code");

    var natural = require('natural');
    var spell = require('../textprocess/jarowrinkler');



    console.log("Slot Response Builder");
    // console.log(JSON.stringify(request.body));
    // console.log("Current Context : ",JSON.stringify(request.body.result.contexts[0]));
    // console.log("Next Context : ",JSON.stringify(request.body.result.contexts[1]));
    // console.log("Custom Source Value : "+request.body.result.fulfillment.source);


    if(request.body.result.fulfillment.speech=="Please tell me the Destination Station Code or the Station City name to where you will be travelling."){
      console.log("Resolved Destination Query : "+request.body.result.resolvedQuery);
      if(request.body.result.parameters.destination==""){
        console.log("Destination Prompt Asked");
          var matched  =spell.conversationNorm(request.body.result.resolvedQuery);
          console.log("Matches returned for Destination: "+matched);
          if(matched.length==0){
            console.log("Proceed with Default Destination Response");
            var facebookResponse={
                                           "speech": "",
                                           "displayText": "",
                                           "data": {
                                             "facebook": [
                                               {
                                                   "text":"Please tell me the Destination Station Code or the Station City name to where you will be travelling."

                                               }
                                             ]
                                           },
                                           "contextOut": [],
                                           "source": ""
                                         }

                 response.send(facebookResponse);
          }
          else{
            console.log("Will build Quick Replies for Destination");
            console.log(matched);
            var facebookResponse={
                                           "speech": "",
                                           "displayText": "",
                                           "data": {
                                             "facebook": [
                                               {
                                                   "text":"These are the stations I found for your Destination. Select a specific one please.",
                                                   "quick_replies":matched
                                               }
                                             ]
                                           },
                                           "contextOut": [],
                                           "source": ""
                                         }

                 response.send(facebookResponse);
          }

      }
      else if(request.body.result.parameters.destination!=""){
        console.log("Destination Obtained Correctly : "+request.body.result.parameters.destination);

      }

    }

//myString.substr(-1);
//var lastChar = myString.substr(myString.length -1);

    else if(request.body.result.fulfillment.speech=="Kindly tell me the Source Station Code or the Station City name from where you will be travelling."){
      console.log("Resolved Query : "+request.body.result.resolvedQuery);

      var all_station_names = station_knowledge.data.entries;
      var algo_flag=0;
      all_station_names.forEach(function(element){
        if(request.body.result.resolvedQuery.toUpperCase()==element.synonyms[0]){
        //console.log(natural.JaroWinklerDistance(element.synonyms[0], station_name),element.synonyms[0],station_name);
        console.log("No Jaro Wrinkler Required");
        algo_flag=1;

  			  }
      })

      if(algo_flag==0){

      let lastChar = request.body.result.resolvedQuery;
      lastChar=lastChar.substr(lastChar.length-1);
      if(lastChar=="$"){
        console.log("Reinitializing resolvedQuery to Blank");
        var tempQuery = " ";
      }
      else{
        tempQuery=request.body.result.resolvedQuery;
      }

      if(request.body.result.parameters.destination!=""&&request.body.result.parameters.source==""){
        console.log("Destination Prompt Input Correctly");
        var matched  =spell.conversationNorm(tempQuery);
        console.log("Matches returned for Source : "+matched);
        if(matched.length==0){
          console.log("Proceed with Default Source Response");
          var facebookResponse={
                                         "speech": "",
                                         "displayText": "",
                                         "data": {
                                           "facebook": [
                                             {
                                                 "text":"Kindly tell me the Source Station Code or the Station City name from where you will be travelling.",
                                                 
                                             }
                                           ]
                                         },
                                         "contextOut": [],
                                         "source": "DuckDuckGo"
                                       }

               response.send(facebookResponse);
        }
        else{
          console.log("Will build Quick Replies for Source");
          console.log(matched);
          var facebookResponse={
                                         "speech": "",
                                         "displayText": "",
                                         "data": {
                                           "facebook": [
                                             {
                                                 "text":"These are the stations I found for your Source. Select a specific one please.",
                                                 "quick_replies":matched
                                             }
                                           ]
                                         },
                                         "contextOut": [],
                                         "source": "DuckDuckGo"
                                       }

               response.send(facebookResponse);
        }
      }
    }

      else if(algo_flag==1){
        console.log("Destination Obtained Correctly : Should ask Source Now : "+request.body.result.parameters.source);

      }

    }





  }
}
