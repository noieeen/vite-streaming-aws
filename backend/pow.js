const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = "products-inventory";
const healthPath = "/health";
const productPath = "/product";
const ProductsPath = "/products";

exports.handler = async function (event) {
  console.log("Request event: ", event);
  let response;
  switch (true) {
    case event.httpMethod === "GET" && event.path === healthPath:
      response = buildResponse(200);
      break;
    case event.httpMethod === "GET" && event.path === productPath:
      response = await getProduct(event.queryStringParameters.productId);
      break;
    case event.httpMethod === "GET" && event.path === ProductsPath:
      response = await getProducts();
      break;
    case event.httpMethod === "POST" && event.path === productPath:
      response = await saveProduct(
        requestBody.productId,
        requestBody.updateKey,
        requestBody.updateValue
      );
      break;
    case event.httpMethod === "PATCH" && event.path === productPath:
      const requestBody = JSON.parse(event.body);
      response = await modifyProduct(
        requestBody.productId,
        requestBody.updateKey,
        requestBody.updateValue
      );
      break;
    case event.httpMethod === "DELETE" && event.path === productPath:
      response = await deleteProduct(JSON.parse(event.body).productId);
      break;
    default:
      response = buildResponse(404, "404 Not Found");
  }

  return response;
};

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}

async function getProduct(productId) {
  const params = {
    TableName: dynamodbTableName,
    Key: { productId: productId },
  };

  return await dynamodb
    .get(params)
    .promise()
    .then(
      (response) => {
        return buildResponse(200, response.Item);
      },
      (err) => {
        console.error("Something Wrong! ", err);
      }
    );
}

async function getProducts() {
  const params = {
    TableName: dynamodbTableName,
  };

  const allProducts = await scanDynamoRecord(params, []);
  const body = {
    products: allProducts,
  };

  return buildResponse(200, body);
}

async function scanDynamoRecords(scanParams, itemArray) {
  try {
    const dynamoData = await dynamodb.scan(scanParams).promise();
    itemArray = itemArray.concat(dynamoData.Item);
    if (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartKey = dynamoData.LastEvaluatedKey;
      return await scanDynamoRecords(scanParams, itemArray);
    }
  } catch (error) {
    console.error("Something Wrong!", error);
  }
}

async function saveProduct(requestBody) {
  const params = {
    TableName: dynamodbTableName,
    Item: requestBody,
  };

  return await dynamodb
    .put(params)
    .promise()
    .then(
      () => {
        const body = {
          Operation: "SAVE",
          Message: "SUCCESS",
          Item: requestBody,
        };

        return buildResponse(200, body);
      },
      (error) => {
        console.error("Something Wrong!", error);
      }
    );
}

async function modifyProduct(productId, updateKey, updateValue) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      productId: productId,
    },
    UpdateExpression: `set ${updateKey} = :value`,
    ExpressionAttributeValues: {
      ":value": updateValue,
    },
    returnValues: "UPDATED_NEW",
  };
  return await dynamodb
    .update(params)
    .promise()
    .then(
      (response) => {
        const body = {
          Operation: "UPDATE",
          Message: "SUCCESS",
          Item: response,
        };
      },
      (error) => {
        console.error("Something Wrong!", error);
      }
    );
}

async function deleteProduct(productId) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      productId: productId,
    },
    returnValues: "ALL_OLD",
  };
  return await dynamodb
    .delete(params)
    .promise()
    .then(
      (response) => {
        const body = {
          Operation: "DELETE",
          Message: "SUCCESS",
          Item: response,
        };
      },
      (error) => {
        console.error("Something Wrong!", error);
      }
    );
}
