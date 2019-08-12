import * as dynamodbLib from '../lib/dynamo-lib';
import { success, failure } from '../lib/response-lib';


export const updateAnimal = async (event, context) => {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.animalTableName,
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            animalId: event.pathParameters.id
          },
        UpdateExpression: "SET animalName = :animalName, superpower = :superpower, animalType = :type, breed = :breed, birthday = :birthday",
        ExpressionAttributeValues: {
            ":animalName": data.name || null,
            ":superpower": data.superpower || null,
            ":type": data.type || null,
            ":breed": data.breed || null,
            ":birthday": data.birthday || null,
        },
        ReturnValues: "ALL_NEW"
    }

    try{
        const response = await dynamodbLib.call('update', params)
            return success(response.Items)
    }catch(e){
        return failure({ status: false, error: e.message })
    }
}