module.exports = function(p) {
  if( p.match(/size/) ) {
    return {
      "type": "options",
      "options": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "How long?",
            "subtitle": "Max. duration of your holiday (num. of days)",
            "image_url": "http://dev.carlodenaro.com/jetmeout/i/top_date.png",
            "buttons": [{
                "type": "postback",
                "title": "Short (0 - 3)",
                "payload": "{cta: \"card\", range: \"S\"}"
            }, {
                "type": "postback",
                "title": "Medium (3 - 5)",
                "payload": "{cta: \"card\", range: \"M\"}"
            }, {
                "type": "postback",
                "title": "Long (over 5)",
                "payload": "{cta: \"card\", range: \"L\"}"
            }]
          }]
        }
      }
    };
  }
  else if (p.match(/card/)) {
    return {
      "type": "text",
      "msg": "What's is your email? Needit for invoice & communication"
    };
  }
  else if (p.match(/final/)) {

    if(p.match(/option1/)) {
      return {
        "type": "options",
        "msg": "You'll receive confirm in your email !! Good holiday !!",
        "options":{
          "type":"template",
          "payload":{
            "template_type":"receipt",
            "recipient_name":"Carlo Denaro",
            "order_number":"12345678902",
            "currency":"EUR",
            "payment_method":"Visa 1111",
            "order_url":"http://www.lastminute.com",
            "timestamp":"1428444852",
            "elements":[
              {
                "title":"Blablacar",
                "subtitle":"your journey",
                "quantity":1,
                "price":50,
                "currency":"EUR",
                "image_url":"http://dev.carlodenaro.com/jetmeout/i/florence.png"
              }
            ],
            "summary":{
              "subtotal":75.00,
              "shipping_cost":4.95,
              "total_tax":6.19,
              "total_cost":56.14
            }
          }
        }
      };
    } else {
      return {
        "type": "options",
        "msg": "You'll receive confirm in your email !! Good holiday !!",
        "options":{
          "type": "template",
          "payload": {
            "template_type": "airline_checkin",
            "intro_message": "Check-in is available now.",
            "locale": "it_IT",
            "pnr_number": "ABCDEF",
            "flight_info": [
              {
                "flight_number": "f001",
                "departure_airport": {
                  "airport_code": "MXP",
                  "city": "Malpensa",
                  "terminal": "T4",
                  "gate": "G8"
                },
                "arrival_airport": {
                  "airport_code": "FLR",
                  "city": "Florence",
                  "terminal": "T4",
                  "gate": "G8"
                },
                "flight_schedule": {
                  "boarding_time": "2017-01-05T15:05",
                  "departure_time": "2017-01-05T15:45",
                  "arrival_time": "2017-01-05T17:30"
                }
              }
            ],
            "checkin_url": "https:\/\/www.lastminute.com\/check-in"
          }
        }
      };
    }

  }
}
