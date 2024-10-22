import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { getTasks } from './taskSlice';
import taskService from './taskService';

const mockStore = configureMockStore([thunk]);
const mock = new MockAdapter(axios);

describe ('taskSlice', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            task: {
                tasks: [],
                isError: false,
                isSuccess: false,
                isLoading: false,
                message:'',
            },
            auth: {
                user: { token: 'mock_token' },
            },
        });
    });

    afterEach(() => {
        mock.reset();
        store.clearActions();
    });

    test('calls the taskService to fetch tasks', async () => {
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

        const getTasksSpy = jest.spyOn(taskService, 'getTasks').mockResolvedValue(tasks);
        await store.dispatch(getTasks());
        expect(getTasksSpy).toHaveBeenCalledWith(token);
    });
});