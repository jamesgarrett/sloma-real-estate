// browser compatibility: get method for event 
// addEventListener(FF, Webkit, Opera, IE9+) and attachEvent(IE5-8)
var myEventMethod = 
    window.addEventListener ? "addEventListener" : "attachEvent";
// create event listener
var myEventListener = window[myEventMethod];
// browser compatibility: attach event uses onmessage
var myEventMessage = 
    myEventMethod == "attachEvent" ? "onmessage" : "message";
// register callback function on incoming message
myEventListener(myEventMessage, function (e) {
    // we will get a string (better browser support) and validate
    // if it is an int - set the height of the iframe #my-iframe-id
    if (e.data === parseInt(e.data)) 
        document.getElementById('iFrame1').height = e.data + "px";
}, false);


var frames = window.frames;

console.log(frames);