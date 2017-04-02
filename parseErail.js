//to Get trains list from response string
var Train = require('./train.js').Train;

module.exports.parseErail=function(response){
  
    var trainList=[];
    var details=[];

    response=response.split('^');

    for(var i=1;i<response.length;i++){
        details=response[i].split('~');
        var train=new Train();
        train.number=details[0];
        train.name=details[1];
        trainList.push(train);
    }
    return trainList;
};