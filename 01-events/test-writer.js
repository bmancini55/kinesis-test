var AWS     = require('aws-sdk');
var kinesis = new AWS.Kinesis();

/**
 * This is a generic emitter to put events into a main event stream
 */
exports.handler = function(event, context) {
    
    // this is the event source
    var payload = {
        event: 'some.event',
        greeting: 'hello world'
    };
    
    // create the kinesis payload
    var params = {
      Data: JSON.stringify(payload),
      PartitionKey: Date.now().toString(),
      StreamName: 'app'
    };
    
    // push into the general stream
    kinesis.putRecord(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
    
};