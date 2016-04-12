To test:
node app.js
visit localhost:3030/lambdatest.html

Project: Basic API Hosting with Amazon Web Services

Amazon Web Services offers the most powerful set of services for cloud hosting, having originated the field in the early 2000s. Today, their very generous free tier lets you setup a full stack without paying any money upfront. Static website hosting is handled through S3. API endpoints are created visually using API Gateway and HTTP methods are mapped to Lambda functions, which can execute arbitrary code including access the free NoSQL database DynamoDB. By following these steps, you will give yourself the ability to very quickly prototype any website including a backend suitable for writing mobile applications. The key to learning to write modern web applications is to be able to run a whole stack and quickly make changes. 

1. Signup for Amazon Web Services Free Tier 

See details at aws.amazon.com/free They do require a valid credit card unless you exceed free tier usage (you won't any time soon).
If someone is concerned about this and willing to try with a prepaid credit card (greendot etc), please leave a comment about whether that works!
Once you are done, bookmark the console https://console.aws.amazon.com

2. Setup Permissions
Amazon uses their IAM service to manage permissions. By default, there are no entries so we need to setup permissions to run our stack. This is the most annoying part. If you are interested in security, then you can follow along with this guide https://docs.aws.amazon.com/apigateway/latest/developerguide/setting-up.html and also give the lambda execution role S3 access. Otherwise, go to services and IAM in the amazon console. We will create 3 policies, 2 roles, 1 user group and 1 user. 

	2a. Go to policies, filter to policies and create three policies: AmazonAPIGatewayAccess, APIGatewayLambdaExecPolicy, APIGAtewayLambdaInvokePolicy. Police documents are JSON documents, use these unless you have a better idea (if so, please let me know) . Note that this diverges from the guide above somewhat.
For AmazonAPIGatewayAccess:
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "apigateway:*"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
For APIGatewayLambdaExecPolicy use
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "logs:*"
            ],
            "Effect": "Allow",
            "Resource": "arn:aws:logs:*:*:*"
        }
    ]
}

For APIGatewayLambdaInvokePolicy use:
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Resource": [
                "*"
            ],
            "Action": [
                "lambda:InvokeFunction"
            ]
        }
    ]
}

	2b. Go to roles and create 2 roles, APIGatewayLambdaExecRole and APIGatewayLambdaInvokeRole.
	For APIGatewayLambdaExecRole attach the Amazon managed policy called AmazonDynamoDBFullAccess.
	For APIGatewayLambdaInvokeRole attach the Amazon managed policy called AmazonAPIGatewayPushToCloudWatchLogs. 

	2c. Create a user group called LambdaAPI and attach the Amazon policies AWSLambdaFullAccess, AmazonS3FullAccess, CloudWatchFullAccess and the policy we just created called AmazonAPIGatewayAccess. 

	2d. Create a user called lambdapi and add it to the group we just created. 

3. Visit this tutorial about setting up APIGateway and Lambda. DO NOT do anything else in the IAM console (in step 4). We did this in the previous step. DO NOT perform step 9 and cleanup, do not delete anything after finishing the tutorial. I called my test resource "testing". You can use whatever you are comfortable with. 
https://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started.html

4. Go to the DynamoDB service, create a table called UserLeads. Specify a partition key called email and do not specify a sort key. email is a required property for this database. 

5. Go to the Lambda Console. Create a new lambda function called DynamoServiceTest. 
Use this code, which manually maps JSON objects into the "awesome" DynamoDB syntax. 

console.log('Loading function');

var AWS = require('aws-sdk');

exports.handler = function(event, context) {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    var operation = event.operation;
    var newItem = {
        Item:{
          email:{
              S:"keefe@categorize.us"
          },
          firstName:{
              S:"keefe"
          },
          lastName:{
              S:"roedersheimer"
          }
        },
        TableName:'UserLeads'
    };
    if(event.firstName!==undefined) newItem.Item.firstName.S = event.firstName;
    if(event.lastName!==undefined) newItem.Item.lastName.S = event.lastName;
    if(event.email!==undefined) newItem.Item.email.S = event.email;
    
    var dynamo = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    dynamo.putItem(newItem, function(err, data){
       if(err){
           console.log(err, err.stack);
           context.fail(err);
       }else{
            console.log(data);
            context.succeed(data);
       }
    });
};

Click test and play around with different JSON objects if you so desire. Again, note the region of your function, in my case us-west-2.

6. Go back to the API Gateway. Create a new resource called dynamo, similar to the testing resource we just created. Create a new POST method. Link this to the Lambda function you just created, just as was done in the tutorial. 

7. Setup CORS https://en.wikipedia.org/wiki/Cross-origin_resource_sharing for the API we just created. This will allow us to call it from other domains. We are going to give it very permissive settings (anybody anywhere can call our API). In a production setting, it is important to restrict this to only your domain (e.g. if I build api.categorize.us I only want *.categorize.us to be able to call it.) If you publish something from this tutorial in a blog, I strongly recommend restricting your API to your domain. Until then, go to API Gateway, go to each resource, go to actions and click enable CORS. Leave it as star and enable for your API. 

8. Deploy the API, put an optional stage and note the URL. 

7. Now, we will deploy a front end to test this API. Go to services, S3. Create a new bucket. Click enable static website hosting. Note this endpoint URL. 

8. Create a simple test HTML file, such as this one that invokes the API.
<html>
	<head>
		<script
			  src="https://code.jquery.com/jquery-2.2.2.js"
			  integrity="sha256-4/zUCqiq0kqxhZIyp4G0Gk+AOtCJsY1TA00k5ClsZYE="
			  crossorigin="anonymous"></script>
		<script type="text/javascript">
			$(document).ready(function(){
				$("#btnHello").click(function(){
					var first = $("#txtHello").val();
					request = {
						firstName:first,
						lastName:first
					};
					$.post("https://nwsxpja3zd.execute-api.us-west-2.amazonaws.com/cors/testing", JSON.stringify(request)).done(function(data){
						$("#divResults").append("<p>"+data.Hello+"</p>");
					});
				});
				$("#btnSubmit").click(function(){
					var data = {};
					data.firstName = $("#txtFirstName").val();
					data.lastName = $("#txtLastName").val();
					data.email = $("#txtEmail").val();
					$.post("https://nwsxpja3zd.execute-api.us-west-2.amazonaws.com/cors/dynamo", JSON.stringify(data)).done(function(data){
						$("#divResults").append("<p> Request Done"+JSON.stringify(data)+"</p>");
					});
				});			
			});

		</script>
	</head>

	<body>
		<div id="divResults"/>
		<input type="text" id="txtHello" width=200><input type="button" id="btnHello" value="Hello"/><br/>
		Email <input type="text" id="txtEmail" width=200><br/>
		First Name <input type="text" id="txtFirstName" width=200><br/>
		Last Name<input type="text" id="txtLastName" width=200><br/>
		<input type="button" id="btnSubmit" value="Contact Me!"/>
	</body>

</html>

9. Upload file to the S3 bucket and check that http://endpoint/file.html works. Once you submit, you should be able to navigate back to dynamodb and see the entries in the database. 

10. Go to services, click CloudFront. Create a new distribution and enter the alternative CNAME as the one that will be used in your DNS, e.g. katie.categorize.us. 

11. Create a new origin, attach it to the S3 bucket that you just created. 

12. Under behaviors, customize object caching and set the TTL (time to live) as 60s, so that you can see changes quickly. In a production deployment, this will be higher. 

13. Visit your DNS host (e.g. dyn.com) and create a CNAME record matching the cloudfront record. You're done!


