import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {CategoriesSlider} from '../../src/components/CategoriesSlider';

const mockedCategoriesProp = ['Italian', 'Argentinian'];
const mockedCallBack = jest.fn();
const mockedSelectedCategory = 'Italian';

describe('Given a <CategoriesSlider/> component', () => {
  describe('receiving an array with two categories', () => {
    test('should return two CategotyCard components', () => {
      const tree = renderer
        .create(
          <CategoriesSlider
            categories={mockedCategoriesProp}
            callBack={mockedCallBack}
            selectedCategory={mockedSelectedCategory}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
