import 'react-native';
import React from 'react';
import {CategoryCard} from '../../src/components/CategoryCard';
import {render, fireEvent} from '@testing-library/react-native';

const mockedCategoriesProp = ['Italian'];
const mockedCallBack = jest.fn();

describe('Given a <CategoryCard/> component', () => {
  describe('when pressed', () => {
    test('should call the callback function', () => {
      const {getByTestId} = render(
        <CategoryCard
          category={mockedCategoriesProp}
          callBack={mockedCallBack}
          isSelected={true}
        />,
      );
      fireEvent.press(getByTestId('categoryCard-Italian'));
      expect(mockedCallBack).toHaveBeenCalled();
    });
  });
});
