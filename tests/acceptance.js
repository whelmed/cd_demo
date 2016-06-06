var page = require('webpage').create(),
  system = require('system'),
  address;

console.error = function () {
    system.stderr.write(Array.prototype.join.call(arguments, ' ') + '\n');
};


if (system.args.length === 1) {
  console.log('Usage: acceptance.js <some URL>');
  phantom.exit();
}

address = system.args[1];

// This isn't a "REAL" test. It's just a basic get for our demo.
page.open(address, function(status) {
  if (status !== 'success') {
    console.error('FAILED to load the address');
  } else {

    console.log('Loading ' + system.args[1]);

    var status_code = page.evaluate(function() {
      var content = document.querySelector("header h1").textContent;
      var scode = 0;

      if (content === "todont") {
        console.log('CONTENT todo exists!');
      }
      else {
        scode = 1;
        console.error("ERROR! CONTENT todo is missing! This is essential for the application...probably!");
      }

      return scode;

    });

  }
  phantom.exit(status_code);
});
