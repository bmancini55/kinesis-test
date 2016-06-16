var AWS     = require('aws-sdk');
var kinesis = new AWS.Kinesis();

exports.handler = (event, context, callback) => {
    console.log(event)

    event.Records.forEach(function(record) {
        // parse the data from the record
        var payload = JSON.parse(new Buffer(record.kinesis.data, 'base64').toString('utf8'));


        // route the event data
        route(payload);
    });
};

function route(payload) {
    console.log('routing: %j', payload);

    // this is a simple switch statement but could be converted into
    // 1) a database driven router
    // 2) call other lambda functions instead of writing to other streams
    // 3) ??? other things...
    switch(payload.event) {
        case 'some.event':
            publish('test1', payload);
            publish('test2', payload);
            break;
    }

}

function publish(streamName, payload) {
    console.log('publishing to %s', streamName);

    // create the kinesis payload
    var params = {
      Data: JSON.stringify(payload),
      PartitionKey: Date.now().toString(),
      StreamName: streamName
    };

    // push into the general stream
    kinesis.putRecord(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
}