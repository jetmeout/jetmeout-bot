module.exports = function(t) {
  if(
    (
      t.match(/want/) ||
      t.match(/need/)
    ) && (
      t.match(/holiday/) ||
      t.match(/relax/) ||
      t.match(/journey/)
    )
  ) {
    return {
      msg: "",
      type: "options",
      options: {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "What's your budget?",
            "subtitle": "Max. amount of money you wanna spent",
            "image_url": "http://dev.carlodenaro.com/jetmeout/i/top_budget.png",
            "buttons": [{
                "type": "postback",
                "title": "0 - 50",
                "payload": "{cta: \"size\", range: \"50\"}"
            }, {
                "type": "postback",
                "title": "50 - 100",
                "payload": "{cta: \"size\", range: \"100\"}"
            }, {
                "type": "postback",
                "title": "over 100",
                "payload": "{cta: \"size\", range: \"1000\"}"
            }]
          }]
        }
      }
    }
  }
  else if(
    t.match(/i(.{0,3})m/) && (
      t.match(/stressed/) ||
      t.match(/tired/) ||
      t.match(/angry/)
    )
  ) {
    return {
      msg: "Really? In my opinion you need relax",
      type: "text"
    }
  }
  else if(
    t.match(/hate/) && (
      t.match(/job/) ||
      t.match(/boss/) ||
      t.match(/mate/)
    )
  ) {
    return {
      msg: "Hatred is a bad thing, are you ok?",
      type: "text"
    }
  }

  else if (
    t.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  ) {
    return {
      msg: "Please enter your Credit or Debit Card number:",
      type: "text"
    }
  }
  else if (
    t.match(/^4[0-9]{12}(?:[0-9]{3})?$/)
  ) {
    return {
      msg: "Your card's expiry (mm/yy):",
      type: "text"
    }
  }
  else if (
    t.match(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)
  ) {
    return {
      msg: "The CVC number:",
      type: "text"
    }
  }
  else if (
    t.match(/^([0-9]{3})$/)
  ) {
    return {
      trigger: "automessage",
      msg: "", //Bro you need an holiday.
      type: "options",
      options: {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "Journey to Florence via “Blablacar”",
            "subtitle": "The most populous city in Tuscany. One of the important city in Italian fashion, food experience and architectural heritage.",
            "image_url": "http://dev.carlodenaro.com/jetmeout/i/florence.png",
            "buttons": [{
                "type": "web_url",
                "url": "https://www.blablacar.it/passaggio-auto/milano/roma/",
                "title": "More info"
            }, {
                "type": "postback",
                "title": "Relax now",
                "payload": "final-option1"
            }]
          },
          {
            "title": "Journey to Florence via Lastminute.com by flight",
            "subtitle": "The most populous city in Tuscany. One of the important city in Italian fashion, food experience and architectural heritage.",
            "image_url": "http://dev.carlodenaro.com/jetmeout/i/florence.png",
            "buttons": [{
                "type": "web_url",
                "url": "https://www.lastminute.com",
                "title": "More info"
            }, {
                "type": "postback",
                "title": "Relax now",
                "payload": "final-option2"
            }]
          }]
        }
      }
    }
  }
  else if (
    t.match(/^\+/)
  ) {
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
                "airport_code": "XXX",
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
  else {
    return {
      msg: "Relax {{name}}, I'll get you out !!!",
      flow: "start",
      type: "text"
    }
  }
}
