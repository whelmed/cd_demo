var page = require('webpage').create(),
  system = require('system'),
  t, address;

console.error = function () {
    require("system").stderr.write(Array.prototype.join.call(arguments, ' ') + '\n');
};


if (system.args.length === 1) {
  console.log('Usage: acceptance.js <some URL>');
  phantom.exit();
}

t = Date.now();
address = system.args[1];

// This isn't a "REAL" test. It's just a basic get for our demo.
page.open(address, function(status) {
  if (status !== 'success') {
    console.error('FAILED to load the address');
  } else {
    t = Date.now() - t;
    console.log('Loading ' + system.args[1]);
    page.evaluate(function() {
      var content = document.querySelector("header h1").textContent;

      if (content === "todont") {
        console.log('CONTENT todo exists!');
        phantom.exit();
      }
      else {
        console.error("CONTENT todo is missing! This is essential for the application...probably!")
        phantom.exit(1);
      }

    });


  }
  phantom.exit();
});
