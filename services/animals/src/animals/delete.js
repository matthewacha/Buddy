import * as dynamodbLib from '../lib/dynamo-lib';
import { success, failure } from '../lib/response-lib';


export const deleteAnimal = async (event, context) => {
    const params = {
        TableName: process.env.animalTableName,
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            animalId: event.pathParameters.id
          }
    }

    try{
        const response = await dynamodbLib.call('delete', params)
        return success({ status: true, message: "Successfully deleted animal"})
    }catch(e){
        return failure({ status: false, error: e.message })
    }
}