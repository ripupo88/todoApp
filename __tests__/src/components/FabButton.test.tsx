import React from 'react';
import {FabButtom} from '../../../src/components/FabButtom';

// Note: test renderer must be required after react-native.
import {render, RenderAPI, fireEvent} from '@testing-library/react-native';

let component: RenderAPI;

describe('<TasksItems>', () => {
  beforeEach(() => {
    const onPress = jest.fn(() => {
      console.log('pressed');
    });
    component = render(<FabButtom onPress={onPress} text={'My Button'} />);
  });

  it('renders correctly', () => {
    expect(component).toBeDefined();
    expect(component.getByTestId('Text')).toBeDefined();
  });
  it('Press Button', () => {
    const Button = component.getByTestId('Text').parent;
    fireEvent(Button!, 'press');
  });
});
