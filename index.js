'use strict'

const express     = require('express')
const bodyParser  = require('body-parser')
const request     = require('request')
const sleep       = require('sleep');

const app         = express()
const response    = require('./responseBuilder.js')
const postback    = require('./postbackBuilder.js')
const payoff      = "Relax, I'll get you out !!!";

var cronjob       = {};

app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send(payoff)
})

app.post('/webhook/', function (req, res) {
  let messaging_events = req.body.entry[0].messaging
  for (let i = 0; i < messaging_events.length; i++) {
    let event = req.body.entry[0].messaging[i]
    let sender = event.sender.id
    if (event.message && event.message.text) {
      let text = event.message.text
      let generated = response(text)
      sleep.sleep(1);
      if (generated.type === 'options') {
        if(generated.msg !== "") {
          sendTextMessage(sender, generated.msg)
        }

        sendGenericMessage(sender, generated.options)

        if (generated.trigger === "automessage") {
          cronjob = setTimeout(function (sender) {

            sendTextMessage(sender, "\"There ain't no journey what don't change you some\" - How can I help you?", [
              {
                "content_type":"text",
                "title":"+ food",
                "payload":"final-option1"
              },
              {
                "content_type":"text",
                "title":"+ relax",
                "payload":"final-option1"
              },
              {
                "content_type":"text",
                "title":"+ fun",
                "payload":"final-option2"
              },
              {
                "content_type":"text",
                "title":"+ romance",
                "payload":"final-option2"
              }
            ] );
          }, 10000, sender);
        }
        continue
      }
      else {
        if(typeof generated.flow !== "undefined") {
          sendTextMessageWithUser(sender, " " + generated.msg)
          clearTimeout(cronjob);
        } else {
          sendTextMessage(sender, generated.msg)
        }
      }
    }

    if (event.postback) {
      let text = JSON.stringify(event.postback)
      let payload = JSON.parse(text).payload;

      sleep.sleep(1);
      var message = postback(payload);
      if(typeof message !== "undefined" && message !== null) {
        if(message.type === "options") {
          sendGenericMessage(sender, message.options)
        } else {
          sendTextMessage(sender, message.msg)
        }
      }
      continue
    }
  }
  res.sendStatus(200)
})

/** f */
function sendTextMessage(sender, text, quick) {
  let messageData = {}
  if(typeof quick === "undefined") {
    messageData = { text:text }
  } else {
    messageData = {
      text:text,
      quick_replies: quick
    }
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  })
}
function sendGenericMessage(sender, options) {
  let messageData = {
    "attachment": options
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  })
}
function sendTextMessageWithUser(sender, text) {
  request({
    url: 'https://graph.facebook.com/v2.6/'+sender,
    qs: {
      access_token:token,
      fields: "first_name,last_name,profile_pic,locale,timezone,gender"
    },
    method: 'GET'
  }, function(error, response, body) {
    sendTextMessage(sender, text.replace('{{name}}', JSON.parse(response.body).first_name) );
    if (error) {
      console.log('Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  })
}

/** s */
const token = "TOKEN-HERE"

app.listen(app.get('port'), function() {
  console.log('running on port', app.get('port'))
})
