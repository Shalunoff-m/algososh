import renderer from 'react-test-renderer';
import { Circle } from './circle';

describe('Проверка Circle', () => {
  it('Кружок без текста', () => {
    const circle = renderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  });
});
