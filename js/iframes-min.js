var myEventMethod=window.addEventListener?"addEventListener":"attachEvent",myEventListener=window[myEventMethod],myEventMessage="attachEvent"==myEventMethod?"onmessage":"message";myEventListener(myEventMessage,function(e){e.data===parseInt(e.data)&&(document.getElementById("iFrame1").height=e.data+"px")},!1);var frames=window.frames;