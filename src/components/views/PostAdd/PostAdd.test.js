import React from 'react';
import { shallow } from 'enzyme';
import { PostAdd, PostAddComponent } from './PostAdd';

describe('Component PostAdd', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostAddComponent />);
    expect(component).toBeTruthy();
  });
});
