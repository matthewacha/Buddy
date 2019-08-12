import * as create from '../src/animals/create';
import createAnimal from '../src/mock/createAnimal.json'

test('createAnimal', async () => {
  const event = createAnimal;
  process.env.animalTableName = 'dev-animals'
  // const context = 'context';
  // const callback = (error, response) => {
  //   expect(response.statusCode).toEqual(200);
  //   expect(typeof response.body).toBe("string");
  // };
  const response = await create.post(event);
  expect(response.statusCode).toEqual(200)
  // await handler.hello(event, context, callback);
});
