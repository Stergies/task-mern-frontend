import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TaskItem from './TaskItem';

describe('TaskItem', () => {
    const task = {
        _id: 'task-123',
        createdAt: '2024-10-05T09:54:19.122+00:00',
        text: 'Learn Computer Science'
    };

    const mockStore = configureStore([]);
    const store = mockStore({});

    test('renders task details correctly', () => {
        const { getByText } = render(
            <Provider store={store}>
                <TaskItem task={task} />
            </Provider>
        );

        expect(getByText(task.text)).toBeInTheDocument();
        expect(getByText(new Date(task.createdAt).toLocaleString('en-US'))).toBeInTheDocument();
    })
});