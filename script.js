var result = ["CHENGALPATTU JUNCTION","CHENGANNUR","CHENNAI CENTRAL","CHENNAI EGMORE","CHUNAR"];
var confidence_score = [0.8142857142857143,0.8866666666666667,0.88,0.8857142857142858,0.8222222222222222 ];
var score_new = confidence_score.slice();
var matched_stations = [];

score_new.sort(function(a, b){return b-a})

for(var i in score_new){

  matched_stations.push(result[confidence_score.indexOf(score_new[i])]);
}

//console.log();
console.log(matched_stations);
//console.log(scoreA);

// console.log("before sort ",score.join());
// console.log("before sort ",places.join());
// for(var i=0;i<score.length;i++){
//   for(var j=0;j<score.length;j++){
//     if(score[i]>score[j]){
//       // userSort(score);
//       // userSort(places);
//       var temp=score[i];
//       score[i]=score[j];
//       score[j]=temp;
//     }
//   }
// }
// console.log( "after",score);
// function userSort(data){
//
//
//
// }

// Confidence Score is 0.8142857142857143 for CHENGALPATTU JUNCTION
// Confidence Score is 0.8866666666666667 for CHENGANNUR
// Confidence Score is 0.88 for CHENNAI CENTRAL
// Confidence Score is 0.8857142857142858 for CHENNAI EGMORE
// Confidence Score is 0.8222222222222222 for CHUNAR



// Confidence Score is 0.8866666666666667 for CHENGANNUR
// Confidence Score is 0.8857142857142858 for CHENNAI EGMORE
// Confidence Score is 0.88 for CHENNAI CENTRAL
// Confidence Score is 0.8222222222222222 for CHUNAR
// Confidence Score is 0.8142857142857143 for CHENGALPATTU JUNCTION
