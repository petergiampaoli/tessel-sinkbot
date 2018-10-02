'use strict';

// Import the interface to Tessel hardware
const tessel = require('tessel');

// var tessel = require('tessel');
var ambientlib = require('ambient-attx4');

var ambient = ambientlib.use(tessel.port['A']);

ambient.on('ready', function() {
  // Get points of light and sound data.
  setInterval(function() {
    ambient.getLightLevel(function(err, lightdata) {
      if (lightdata < 0.03) {
        console.log('minimal light detected');
      } else {
        console.log('IPHONE');
      }
      if (err) throw err;
      ambient.getSoundLevel(function(err, sounddata) {
        if (err) throw err;
        console.log(
          'Light level:',
          lightdata.toFixed(8),
          ' '
          //   'Sound Level:',
          //   sounddata.toFixed(8)
        );
      });
    });
  }, 1000); // The readings will happen every .5 seconds
});

ambient.on('ready', function() {
  ambient.setLightTrigger(0.02);

  if (ambient.getLightLevel() <= 0.05) {
    console.log('Waiting for a bright light or a sound...');
  } else {
    console.log('Dirty sink detected!');
  }
});

ambient.on('error', function(err) {
  console.log(err);
});
// Turn one of the LEDs on to start.
tessel.led[2].on();

// Blink!
setInterval(() => {
  tessel.led[2].toggle();
  tessel.led[3].toggle();
}, 100);

console.log("I'm blinking! (Press CTRL + C to stop)");
