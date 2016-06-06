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


function waitFor(testFx, onReady, timeOutMillis) {
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3000, //< Default Max Timout is 3s
        start = new Date().getTime(),
        condition = false,
        interval = setInterval(function() {
            if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
                // If not time-out yet and condition not yet fulfilled
                condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
            } else {
                if(!condition) {
                    // If condition still not fulfilled (timeout but condition is 'false')
                    console.log("'waitFor()' timeout");
                    phantom.exit(1);
                } else {
                    // Condition fulfilled (timeout and/or condition is 'true')
                    console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                    typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                    clearInterval(interval); //< Stop this interval
                }
            }
        }, 250); //< repeat check every 250ms
};

// This isn't a "REAL" test. It's just a basic get for our demo.
page.open(address, function(status) {
  if (status !== 'success') {
    console.error('FAILED to load the address');
  } else {

    console.log('Loading ' + system.args[1]);
    waitFor(function() {
        // Check in the page if a specific element is now visible
        return page.evaluate(function() {
          var content = document.querySelector("header h1").textContent;
          if (content === "todont") {
            console.log('CONTENT todo exists!');
            return true;
          }
          else {
            console.error("ERROR! CONTENT todo is missing! This is essential for the application...probably!");
            return false;
          }
        });
    }, function() {
       console.log("The sign-in dialog should be visible now.");
       phantom.exit();
    });


  }
  phantom.exit();
});
