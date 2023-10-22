import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';
import { selectionSort, sortingBubble } from '../../utils/logic-array';

const oneElementArr = [{ value: 1, color: ElementStates.Default }];

const testingArr = [
  { value: 1, color: ElementStates.Default },
  { value: 3, color: ElementStates.Default },
  { value: 2, color: ElementStates.Default },
  { value: 4, color: ElementStates.Default },
];

const resultArrAsc = [
  { value: 1, color: ElementStates.Modified },
  { value: 2, color: ElementStates.Modified },
  { value: 3, color: ElementStates.Modified },
  { value: 4, color: ElementStates.Modified },
];

const resultArrDsc = [
  { value: 4, color: ElementStates.Modified },
  { value: 3, color: ElementStates.Modified },
  { value: 2, color: ElementStates.Modified },
  { value: 1, color: ElementStates.Modified },
];

describe('Тестирование сортировок массива', () => {
  let setSortArrayMock: jest.Mock;
  let setLoadMock: jest.Mock;
  let setLoadTypeMock: jest.Mock;

  beforeEach(() => {
    setSortArrayMock = jest.fn();
    setLoadMock = jest.fn();
    setLoadTypeMock = jest.fn();
  });

  it('Пустой массив выбором на возрастание', async () => {
    await selectionSort(
      Direction.Ascending,
      [],
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    expect(setSortArrayMock).toHaveBeenCalledTimes(0);
  });

  it('Пустой массив выбором на убывание', async () => {
    await selectionSort(
      Direction.Descending,
      [],
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    expect(setSortArrayMock).toHaveBeenCalledTimes(0);
  });

  it('Пустой массив пузырьком на возрастание', async () => {
    await sortingBubble(
      Direction.Ascending,
      [],
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    expect(setSortArrayMock).toHaveBeenCalledTimes(0);
  });

  it('Пустой массив пузырьком на убывание', async () => {
    await sortingBubble(
      Direction.Descending,
      [],
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    expect(setSortArrayMock).toHaveBeenCalledTimes(0);
  });

  it('Сортировка выбором на возрастание с одним эл-том', async () => {
    await selectionSort(
      Direction.Ascending,
      oneElementArr,
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    expect(setSortArrayMock).toHaveBeenCalledTimes(0);
  });

  it('Сортировка выбором на убывание с одним эл-том', async () => {
    await selectionSort(
      Direction.Descending,
      oneElementArr,
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    expect(setSortArrayMock).toHaveBeenCalledTimes(0);
  });

  it('Сортировка пузырьком на убывание с одним эл-том', async () => {
    await sortingBubble(
      Direction.Ascending,
      oneElementArr,
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    expect(setSortArrayMock).toHaveBeenCalledTimes(0);
  });

  it('Сортировка пузырьком на возрастание с одним эл-том', async () => {
    await sortingBubble(
      Direction.Descending,
      oneElementArr,
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    expect(setSortArrayMock).toHaveBeenCalledTimes(0);
  });

  it('Сортировка выбором на возрастание базовая', async () => {
    await selectionSort(
      Direction.Ascending,
      testingArr,
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    const sortedArr = setSortArrayMock.mock.calls[3][0];
    expect(sortedArr).toStrictEqual(resultArrAsc);
  });

  it('Сортировка выбором на убывание базовая', async () => {
    await selectionSort(
      Direction.Descending,
      testingArr,
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    const sortedArr = setSortArrayMock.mock.calls[3][0];
    expect(sortedArr).toStrictEqual(resultArrDsc);
  });

  it('Сортировка пузырьком на возрастание базовая', async () => {
    await sortingBubble(
      Direction.Ascending,
      testingArr,
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    const sortedArr = setSortArrayMock.mock.calls[3][0];
    expect(sortedArr).toStrictEqual(resultArrAsc);
  });

  it('Сортировка пузырьком на убывание базовая', async () => {
    await sortingBubble(
      Direction.Descending,
      testingArr,
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    const sortedArr = setSortArrayMock.mock.calls[3][0];
    expect(sortedArr).toStrictEqual(resultArrDsc);
  });
});
