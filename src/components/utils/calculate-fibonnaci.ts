import { IFibonacci, INumber } from '../fibonacci-page/fibonacci-page-types';

export const calculateFibonacci = ({
  userText,
  setLoad,
  setResult,
}: IFibonacci) => {
  //   console.log(userText);
  const numberQuery = Number(userText);
  const calculateArr = calculateFiboncacciArray(numberQuery);
  console.log(calculateArr);
};

const calculateFiboncacciArray = (
  num: number,
  memo: Record<number, number> = {}
): number => {
  if (num in memo) return memo[num];

  if (num <= 2) return 1;
  memo[num] =
    calculateFiboncacciArray(num - 1, memo) +
    calculateFiboncacciArray(num - 2, memo);

  return memo[num];
};

// 1,1,2,3,5
