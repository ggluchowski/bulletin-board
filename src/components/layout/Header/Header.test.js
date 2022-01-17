import React from 'react';
import { shallow } from 'enzyme';
import { Header, HeaderComponent } from './Header';

describe('Component Header', () => {
  it('should render without crashing', () => {
    const component = shallow(<HeaderComponent />);
    expect(component).toBeTruthy();
  });
});
