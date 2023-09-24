import { Dispatch, SetStateAction } from 'react';
import { Stack } from './stack-class';
import { TItem } from './stack-page-types';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';
import { timeDelay } from '../../utils/time-delay';

// ДОБАВЛЕНИЕ ЭЛЕМЕНТА
/* 
[x] Можно лушче: такие специфичные для компонента функции лучше держать рядом с компонентом. К примеру в файле utils.ts так их быстрее будет искать
 */
export const addItem = async (
  setAddLoad: Dispatch<SetStateAction<boolean>>,
  inputState: string,
  setStackArr: Dispatch<SetStateAction<TItem[]>>,
  setInputState: Dispatch<SetStateAction<string>>,
  stack: Stack<TItem>
) => {
  setAddLoad(true);
  stack.push({ value: inputState, color: ElementStates.Changing });
  setStackArr([...stack.elements()]);
  setInputState('');
  await timeDelay(SHORT_DELAY_IN_MS);
  stack.lastItem.color = ElementStates.Default;
  setStackArr([...stack.elements()]);
  setAddLoad(false);
};

// УДАЛЕНИЕ ЭЛЕМЕНТА
export const deleteItem = async (
  setRemoveLoad: Dispatch<SetStateAction<boolean>>,
  setStackArr: Dispatch<SetStateAction<TItem[]>>,
  stack: Stack<TItem>
) => {
  /* 
  [x] Отлично! Тут данная функция вынесена к месту. Она реализует конкретную анимацию и ее не нужно тестировать так как stack.pop(); можно тестировать отдельно unit тестами
   */

  setRemoveLoad(true);
  stack.lastItem.color = ElementStates.Changing;
  setStackArr([...stack.elements()]);
  await timeDelay(SHORT_DELAY_IN_MS);
  stack.pop();
  setStackArr([...stack.elements()]);
  setRemoveLoad(false);
};

// ОЧИСТКА СТЕКА
export const clearStack = (
  setStackArray: Dispatch<SetStateAction<TItem[]>>,
  stack: Stack<TItem>
) => {
  stack.clear();
  setStackArray([...stack.elements()]);
};

// ПОКАЗАТЬ HEAD
export const takeTop = (index: number, arr: TItem[]): string | null => {
  if (index === arr.length - 1) {
    return 'top';
  } else {
    return null;
  }
};