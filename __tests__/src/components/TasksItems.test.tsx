import React from 'react';
import {TasksItems} from '../../../src/components/TasksItems';

// Note: test renderer must be required after react-native.
import {render, RenderAPI} from '@testing-library/react-native';

let component: RenderAPI;

describe('<TasksItems>', () => {
  beforeEach(() => {
    component = render(
      <TasksItems
        item={{
          completed: false,
          id: '123456',
          text: 'Test task',
        }}
      />,
    );
  });

  it('renders correctly', () => {
    expect(component).toBeDefined();
    expect(component.getByTestId('Text')).toBeDefined();
    expect(component.queryAllByTestId('TextInput').length).toEqual(0);
  });
});
