import uuid from 'uuid'
import * as dynamodbLib from '../lib/dynamo-lib';
import { success, failure } from '../lib/response-lib';

export const post = async ( event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.animalTableName,
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            animalId: uuid.v1(),
            attachment: data.attachment,
            animalName: data.name,
            superpower: data.superpower,
            breed: data.breed,
            animalType: data.type,
            birthday: data.birthday,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
    };


    try {
        await dynamodbLib.call('put', params);
        return success(params.Item);
    } catch(error){
        return failure({ status: false })
    }
}