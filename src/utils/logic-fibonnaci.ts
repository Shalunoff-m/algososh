import { IFibonacci } from '../components/fibonacci-page/fibonacci-page-types';

export const calcFibonacci = ({ userText, setLoad, setResult }: IFibonacci) => {
  //   console.log(userText);
  const numberQuery = Number(userText);
  const exampleArr = ['1', '1'];

  for (let i = 2; i < numberQuery + 1; i++) {
    const first = Number(exampleArr[i - 1]);
    const second = Number(exampleArr[i - 2]);
    const res = first + second;
    exampleArr.push(String(res));
  }

  /* [x] Надо исправить: всю логику рендера и присвоение стоит писать уже в самом компоненте или в функциях, которые не реализуют другую логику. calculateFibonacci должен возвращать только шаги последовательности так как это его задача, а само отображение тут реализовываться не должно*/
  return exampleArr;
};
