// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var parser=require('./parseErail.js');

var Client = require('node-rest-client').Client;
var client = new Client();

const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('ASCII');

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://sridhargomix@gmail.com:gomixsridhar@smtp.gmail.com');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

var Train = require('./train.js').Train;


var trainCount = 0;
var timer= setInterval(function(){
    client.get("http://erail.in/rail/getTrains.aspx?Station_From=SC&Station_To=vskp&DataSource=0&Language=0&Cache=false", function (data, response) {
      // parsed response body as js object
      var inputString=decoder.write(data);
      var trains = parser.parseErail(inputString);
      console.log(trains.length);
      if(trainCount===0){
        trainCount=trains.length;
        // mailSender(new mailOptions('Your service has started just now', trainChangedBody+trainCount));
      }
      else if(trains.length>trainCount){
        trainCount=trains.length;
        console.log(trainCount);
        //send the mail
        // mailSender(new mailOptions(trainChangedSubject, trainChangedBody+trainCount));
      }
    });
  },60000);
  
  // setInterval(function(){
  //   mailSender(new mailOptions('Relax the service is running with out any issues 🛀. Go and have a party🎉' ,'' ));
  // }, 5* 60 * 60000);
  
  // setInterval(function(){
  //   client.get("http://mammoth-search.gomix.me/", function (data, response) {
  //     console.log("dogfooding 😂");
  //   });
  // },1* 60000);
  
var trainChangedSubject = '👏 🐗 Trains from SC to VSKP has changed';
var trainChangedBody = 'Number of trains currently is ';
var mailOptions=require('./mailOptions.js').MailOptions;

// send mail with defined transport object 
 function mailSender(mailOptions){
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('Message sent: ' + info.response + mailOptions.text);
  });
 }
