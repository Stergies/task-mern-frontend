import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import taskService from './taskService';

const mock = new MockAdapter(axios);

describe('taskService', () => {
    afterEach(() => {
        mock.reset();
    });

    test('fetches tasks successfully', async () => {
        const token = 'mock_token';
        const tasks = [
            {
                _id: '67010ccba2e4fbdd2ccf0a42',
                text: 'Learn Computer Science',
                user: '6701099ba2e4fbdd2ccf0a2b',
                createdAt: '2024-10-05T09:54:19.122+00:00',
                updatedAt: '2024-10-05T12:07:18.183+00:00',
                __v: 0
            }
        ];

        mock.onGet('/api/tasks/').reply(200, { data: tasks });
        const response = await taskService.getTasks(token);
        expect(response.data).toEqual(tasks);
    });
});