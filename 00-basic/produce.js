let AWS = require('aws-sdk');
AWS.config.update(require('../config').aws);

async function exec() {
  let kinesis = new AWS.Kinesis();
  for(let i = 0; i < 1000; i++) {
    produce(kinesis);
  }
  console.log('queuing complete');
}

function produce(kinesis) {
  let data = {
    Data: new Buffer('Hello world ' + new Date()),
    PartitionKey: 'test-' + Math.floor(Math.random() * 100000),
    StreamName: 'test'
  };
  kinesis.putRecord(data, result);
}

function result(err, data) {
  console.log(err || data);
}

exec();
