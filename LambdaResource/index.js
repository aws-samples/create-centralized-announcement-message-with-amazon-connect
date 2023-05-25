const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

exports.handler = function(event, context, callback) {
  //console.log(event.Details, JSON.stringify(event, null, 4));
    //console.log(`Doing user lookup for ${event.Details.ContactData.CustomerEndpoint.Address}`);
    let MessageId = event.Details.Parameters.MessageId;

  function userLookup(MessageId) {
    var params = {
      TableName: 'IVRMessage',
      Key: {
        MessageId: MessageId
      }
    };
    
    dynamodb.get(params, function(err, data) {
      if (err) {
        console.log("DEBUG:\t docClient.scan", err);
      }
      else {
        console.log("Results: " , data)
        if (data.Item) {
          console.log(JSON.stringify(data.Item));
          callback(null, data.Item)
        }
        if (!data.Item) callback(null, {verified: "false"})
      }
    })
  };
  
  userLookup(MessageId);
}