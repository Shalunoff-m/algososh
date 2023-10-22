import { ElementStates } from '../types/element-states';
import { IDataGet, IString } from '../components/string/string-interface';

const deepClone = (obj: any): any => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item: any) => deepClone(item));
  }

  const clonedObj: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }

  return clonedObj;
};

export const stringReverse = ({ userText, setResult, setLoad }: IDataGet) => {
  // Создаем массив объектов, с индивидуальным типом
  if (!userText) {
    setLoad(false);
    return [[]]; // Возвращаем пустой массив шагов или другое необходимое значение
  }

  const elements = userText
    .split('')
    .map((element) => ({ element, color: ElementStates.Default }));

  const steps: IString[][] = [deepClone(elements)];
  // Включаем лоадер
  setLoad(true);

  const middle = Math.floor(elements.length / 2);
  for (let i = 0; i < middle; i++) {
    elements[i].color = ElementStates.Changing;
    elements[elements.length - 1 - i].color = ElementStates.Changing;
    setResult([...elements]);
    steps.push([...deepClone(elements)]);

    let temp = elements[i];
    elements[i] = elements[elements.length - 1 - i];
    elements[elements.length - 1 - i] = temp;

    // Меняем цвета на результирующие
    elements[i].color = ElementStates.Modified;
    elements[elements.length - 1 - i].color = ElementStates.Modified;
  }
  elements[middle].color = ElementStates.Modified;
  steps.push([...deepClone(elements)]);
  setLoad(false);
  return steps;
};
