import { Dispatch, SetStateAction } from 'react';
import { ElementStates } from '../types/element-states';
import { timeDelay } from './time-delay';
import { SHORT_DELAY_IN_MS } from '../constants/delays';
import { TArr } from '../components/sorting-page/sorting-page-types';
import { Direction } from '../types/direction';

// СЛУЧАЙНЫЙ МАССИВ
export const randomArr = () => {
  const randomArr = [];
  const lenLimit = Math.floor(Math.random() * (17 - 3 + 1)) + 3;

  /* 
[x] По аналогии и с остальными функциями. Так мы делаем их хорошо тестируемыми и независимыми
 */

  for (let i = 0; i <= lenLimit; i++) {
    randomArr.push({
      value: Math.floor(Math.random() * 100),
      color: ElementStates.Default,
    });
  }
  return randomArr;
};

// ---------------------------------
// МЕТОДЫ СОРТИРОВКИ
/* 
[x] Можно лучше: мне кажется не стоит копипастить почти весь код для ASC и DESC направлений. Это можно передать как аргумент функции
 */

export const selectionSort = async (
  type: Direction,
  arr: TArr[],
  setSortArray: Dispatch<SetStateAction<TArr[]>>,
  setLoad: Dispatch<SetStateAction<boolean>>,
  setLoadType: Dispatch<SetStateAction<boolean>>
) => {
  setLoad(true);
  setLoadType(true);

  for (let i = 0; i < arr.length - 1; i++) {
    let tmp = arr[i].value;
    let jIndex = 0;
    arr[i].color = ElementStates.Changing;
    for (let j = i + 1; j < arr.length; j++) {
      arr[j].color = ElementStates.Changing;
      setSortArray([...arr]);
      await timeDelay(SHORT_DELAY_IN_MS);
      // Первое сравнение -----
      if (type === Direction.Ascending) {
        if (arr[j].value <= tmp) {
          tmp = arr[j].value;
          jIndex = j;
        }
      } else if (type === Direction.Descending) {
        if (arr[j].value >= tmp) {
          tmp = arr[j].value;
          jIndex = j;
        }
      }

      // ----------------------
      arr[j].color = ElementStates.Default;
      setSortArray([...arr]);
    }
    // Второе сравнение ------
    if (type === Direction.Ascending) {
      if (tmp < arr[i].value) {
        arr[jIndex].value = arr[i].value;
        arr[i].value = tmp;
      }
    } else if (type === Direction.Descending) {
      if (tmp > arr[i].value) {
        arr[jIndex].value = arr[i].value;
        arr[i].value = tmp;
      }
    }

    // -----------------------

    arr[i].color = ElementStates.Modified;

    setSortArray([...arr]);
  }
  if (arr.length <= 0 || arr.length === 1) {
    return;
  }
  arr[arr.length - 1].color = ElementStates.Modified;
  setSortArray([...arr]);
  setLoad(false);
  setLoadType(false);
};

export const sortingBubble = async (
  type: Direction,
  arr: TArr[],
  setSortArray: Dispatch<SetStateAction<TArr[]>>,
  setLoad: Dispatch<SetStateAction<boolean>>,
  setLoadType: Dispatch<SetStateAction<boolean>>
) => {
  setLoad(true);
  setLoadType(true);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].color = ElementStates.Changing;
      arr[j + 1].color = ElementStates.Changing;
      setSortArray([...arr]);
      await timeDelay(SHORT_DELAY_IN_MS);
      //  ------
      if (type === Direction.Ascending) {
        if (arr[j].value > arr[j + 1].value) {
          const tmp = arr[j].value;
          arr[j].value = arr[j + 1].value;
          arr[j + 1].value = tmp;
        }
      } else if (type === Direction.Descending) {
        if (arr[j].value < arr[j + 1].value) {
          const tmp = arr[j].value;
          arr[j].value = arr[j + 1].value;
          arr[j + 1].value = tmp;
        }
      }
      //  ------
      arr[j].color = ElementStates.Default;
    }
    if (arr.length <= 0 || arr.length === 1) {
      return;
    }
    arr[arr.length - i - 1].color = ElementStates.Modified;
  }
  setLoad(false);
  setLoadType(false);
};
