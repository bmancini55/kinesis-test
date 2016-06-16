'use strict';

exports.handler = (event, context, callback) => {
    event.Records.forEach(function(record) {
        console.log(record);
        
        var payload = new Buffer(record.kinesis.data, 'base64').toString('ascii');
        console.log('Decoded payload:', payload);
        
    });
    context.succeed();
};