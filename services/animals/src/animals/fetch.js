import * as dynamodbLib from '../lib/dynamo-lib';
import { success, failure } from '../lib/response-lib';

export const getAnimal = async (event, context) => {
    const params = {
        TableName: process.env.animalTableName,
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            animalId: event.pathParameters.id
          }
    }
    try{
        const response = await dynamodbLib.call('get', params);
        if(response.Item){
            return success(response.Item);
        } else {
            return failure({ status: false, error: "Item not found." });
        }
    }catch(e){
        failure({ status: false , error: e.message})
    }
}

export const getAnimals = async (event, context) => {
    const params = {
        TableName: process.env.animalTableName,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": event.requestContext.identity.cognitoIdentityId
        }
    }

    try{
        const response = await dynamodbLib.call('query', params)
        if(response.Items){
            return success(response.Items)
        }
        return failure({ statusCode: 401, error: "Animals by the user do not exist"})
    }catch(e){
        return failure({ status: false, error: e.message })
    }
}