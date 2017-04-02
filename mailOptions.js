module.exports.MailOptions=function(sub, body){
    this.from = 'sridhargomix@gmail.com'; // sender address 
    this.to = 'thota.sush0@gmail.com'; // list of receivers 
    this.subject = sub; // Subject line 
    this.text =  body;// plaintext body 
};