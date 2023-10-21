import { stringReverse } from '../../utils/logic-string';

describe('stringReverse', () => {
  let setResult: jest.Mock;
  let setLoad: jest.Mock;

  beforeEach(() => {
    setResult = jest.fn();
    setLoad = jest.fn();
  });

  it('корректно разворачивает строку с чётным количеством символов', () => {
    const result = stringReverse({ userText: 'abcd', setResult, setLoad });
    expect(
      result[result.length - 1].map((item: any) => item.element).join('')
    ).toEqual('dcba');
  });

  it('корректно разворачивает строку с нечетным количеством символов', () => {
    const result = stringReverse({ userText: 'abcde', setResult, setLoad });
    expect(
      result[result.length - 1].map((item) => item.element).join('')
    ).toEqual('edcba');
  });

  it('корректно разворачивает строку с одним символом', () => {
    const result = stringReverse({ userText: 'a', setResult, setLoad });
    expect(
      result[result.length - 1].map((item) => item.element).join('')
    ).toEqual('a');
  });

  it('корректно обрабатывает пустую строку', () => {
    const result = stringReverse({ userText: '', setResult, setLoad });
    expect(
      result[result.length - 1].map((item) => item.element).join('')
    ).toEqual('');
  });
});
