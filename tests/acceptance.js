var page = require('webpage').create(),
  system = require('system'),
  address;

if (system.args.length === 1) {
  console.log('Usage: acceptance.js <some URL>');
  phantom.exit();
}

address = system.args[1];

// This isn't a "REAL" test. It's just a basic get for our demo.
page.open(address, function(status) {
  if (status !== 'success') {
    console.error('FAILED to load the address');
    pantom.exit(1);
  } else {

    console.log('Loading ' + system.args[1]);

    var exitCode = page.evaluate(function() {
      var content = document.querySelector("header h1").textContent;
      if (content === "todont") {
        console.log('CONTENT todo exists!');
        return 0;
      }
      else {
        console.log("ERROR! CONTENT todo is missing! This is essential for the application...probably!");
        return 1;
      }
    });

    phantom.exit(exitCode);
  }

});
