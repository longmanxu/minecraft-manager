function initLogger() {
    var oldLog = console.log;
    var oldError = console.error;

    var logger = document.getElementById('log');

    console.log = function () {
        oldLog.apply(console, arguments);
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == 'object') {
                logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) + '<br />';
            }
            else {
                logger.innerHTML += arguments[i] + '<br />';
            }
        }
    }

    console.error = function () {
        oldError.apply(console, arguments);
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == 'object') {
                logger.innerHTML += '<span style="color:red">'
                    + (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) 
                    + '</span><br />';
            }
            else {
                logger.innerHTML += '<span style="color:red">' + arguments[i] + '</span><br />';
            }
        }
    }
}