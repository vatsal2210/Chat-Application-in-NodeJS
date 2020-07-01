var exports = {}; 
  
var path = require('path'),
    fs   = require('fs'),
    winston = require('winston');      
require('winston-daily-rotate-file');

var logDirectory = path.join(__dirname, '../logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var tsFormat = () => ( new Date() ).toLocaleDateString() + ' - ' + ( new Date() ).toLocaleTimeString();

var timestamp = function() {
  return new Date().toLocaleDateString() + ' - ' + ( new Date() ).toLocaleTimeString();
};

var logFormatter = function(options) {      
    return '[' + options.timestamp() +'] - ['+ options.level.toUpperCase() + ']' +
        ' - '+ (options.message ? options.message : '') + (options.meta && Object.keys(options.meta).length ?'\n\t'+ JSON.stringify(options.meta) : '');
};

var transport1 = new winston.transports.DailyRotateFile({
    filename: logDirectory+'/log',
    timestamp: tsFormat,
    formatter: logFormatter,
    datePattern: 'yyyy-MM-dd.',             
    prepend: true,
    level: process.env.ENV === 'development' ? 'debug' : 'info',
    json: false      
});

var transport2 = new winston.transports.Console({
    colorize: true,
    timestamp: tsFormat,
    level: 'info',
});

var logger = new (winston.Logger)({
  transports: [
    transport1, transport2
  ]
});
   
module.exports = function() {
  var exports = {};    
  exports.logger = logger;
  return logger;
};
