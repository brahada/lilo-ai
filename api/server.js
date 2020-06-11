'use strict'
//https://ca773e96d68b.ngrok.io/webhook?hub.verify_token=lillo_one&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe
console.log("Hello!");

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PAGE_ACCESS_TOKEN = "EAAstbAhCjnQBAFDuksEPrUBcGeqFguWrp4sn4Ov1ylQczbP7n5ROR1S2UWf1At4hQBUjfvke9uTQxZCtGnDU2NnpyC02rvMZAhNI8oRmpwbcijaDfHFZAvvh8K53lf86DtzNQFAGad5hEZC9XM5Vgn4F2utZBBwOqkz2wGLuuUgZDZD";

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

app.listen(80, function(){
	console.log('Listening on 80')
})

app.get('/', (req, res) => {
	res.sendFile(__dirname + "/index.html")
})

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "lillo_one"
  console.log("Req: "+req);
    
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
  
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});

app.post('/webhook', (req, res) => {  
 
  let body = req.body;
  console.log(req.body);

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the message. entry.messaging is an array, but 
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

// Handles messages events
function handleMessage(sender_psid, received_message) {

}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  
}


