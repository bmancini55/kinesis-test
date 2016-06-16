#AWS Setup:

Sorry, I should convert this to a CloudFormation script...

Here are the step to run this test:

1. Create an IAM Role allowing Lambda to read from the Kinesis Streams

```
 {
    "Version": "2012-10-17",
    "Statement": [
      {
          "Effect": "Allow",
          "Action": [
            "lambda:InvokeFunction"
          ],
          "Resource": [
            "*"
          ]
      },
      {
          "Effect": "Allow",
          "Action": [
              "kinesis:*"
          ],
          "Resource": [
              "*"
          ]
      }
    ]
}
```

2. Create Lambda functions with the code from `kinesis-router`, `kinesis-service1`, `kinesis-service2`, and `test-writer`

3. Create a Kinesis Stream called `app`
4. Create a Kinesis Stream called `service1`
5. Create a Kinesis Stream called `service2`
6. Create an Event Source in the `kinesis-router` Lambda to the `app` Kinesis Stream
7. Create an Event Source in the `kinesis-service1` Lambda to the `service1` Kinesis Stream
8. Create an Event Source in the `kinesis-service2` Lambda to the `service2` Kinesis Stream
9. Run test `test-writer` Lambda
10. Go to CloudWatch and look at the execution