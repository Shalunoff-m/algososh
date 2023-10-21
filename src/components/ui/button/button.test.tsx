import renderer from 'react-test-renderer';
import { Button } from './button';
import { render, screen, fireEvent } from '@testing-library/react';
import { Direction } from '../../../types/direction';

describe('Проверка кнопки', () => {
  it('Кнопка с текстом', () => {
    const tree = renderer.create(<Button text='Текст кнопки' />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
