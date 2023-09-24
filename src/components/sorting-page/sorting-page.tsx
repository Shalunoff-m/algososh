import React, { useEffect, useState } from 'react';
import styles from './sorting-page.module.css';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Direction } from '../../types/direction';
import {
  randomArr,
  selectionSortAsc,
  selectionSortDsc,
  sortingBubbleAsc,
  sortingBubbleDsc,
} from '../../utils/logic-array';
import { SortingRadioType, TArr } from './sorting-page-types';
import { Button } from '../ui/button/button';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Column } from '../ui/column/column';

export const SortingPage: React.FC = () => {
  // СТЕЙТЫ
  const [workArr, setWorkArr] = useState<TArr[]>([]);

  const [radioType, setRadioType] = useState<SortingRadioType>(
    SortingRadioType.SelectionSort
  );
  const [sortType, setSortType] = useState<Direction>();
  const [isLoad, setLoad] = useState<boolean>(false);
  const [isLoadAsc, setLoadAsc] = useState<boolean>(false);
  const [isLoadDesc, setLoadDesc] = useState<boolean>(false);

  // ИНИЦИАЛИЗАЦИЯ
  useEffect(() => {
    setNewArray();
    return () => {
      return;
    };
  }, []);

  const setNewArray = () => {
    const tempArr = randomArr();
    setWorkArr(tempArr);
  };

  // ХЕНДЛЕРЫ
  const onChangeRadioChoise = () => {
    setRadioType(SortingRadioType.SelectionSort);
  };

  const onChangeRadioBubble = () => {
    setRadioType(SortingRadioType.Bubble);
  };

  const onSelectSortType = (sort: Direction) => {
    setSortType(sort);
    if (
      sortType === Direction.Ascending &&
      radioType === SortingRadioType.SelectionSort
    ) {
      selectionSortAsc(workArr, setWorkArr, setLoad, setLoadAsc);
    }
    if (
      sortType === Direction.Descending &&
      radioType === SortingRadioType.SelectionSort
    ) {
      selectionSortDsc(workArr, setWorkArr, setLoad, setLoadDesc);
    }
    if (
      sortType === Direction.Ascending &&
      radioType === SortingRadioType.Bubble
    ) {
      sortingBubbleAsc(workArr, setWorkArr, setLoad, setLoadAsc);
    }
    if (
      sortType === Direction.Descending &&
      radioType === SortingRadioType.Bubble
    ) {
      sortingBubbleDsc(workArr, setWorkArr, setLoad, setLoadDesc);
    }
  };

  // ВЫВОД
  return (
    <SolutionLayout title='Сортировка массива'>
      <div className={styles.input_wrapper}>
        <div className={styles.checkbox_wrapper}>
          <RadioInput
            label='Выбор'
            checked={radioType === SortingRadioType.SelectionSort}
            onChange={onChangeRadioChoise}
            disabled={isLoad}
          />
          <RadioInput
            label='Пузырёк'
            checked={radioType === SortingRadioType.Bubble}
            onChange={onChangeRadioBubble}
            disabled={isLoad}
          />
        </div>
        <div className={styles.button_wrapper}>
          <Button
            text='По возрастанию'
            onClick={() => onSelectSortType(Direction.Ascending)}
            sorting={Direction.Ascending}
            isLoader={isLoadAsc}
            disabled={isLoad}
          />
          <Button
            text='По убыванию'
            onClick={() => onSelectSortType(Direction.Descending)}
            sorting={Direction.Descending}
            disabled={isLoad}
            isLoader={isLoadDesc}
          />
        </div>
        <div>
          <Button
            text='Новый массив'
            onClick={() => setNewArray()}
            extraClass={styles.button_arr}
            disabled={isLoad}
          />
        </div>
      </div>
      <div className={styles.columns_list}>
        {workArr?.map((item, i) => (
          <Column key={i} index={item.value} state={item.color} />
        ))}
      </div>
    </SolutionLayout>
  );
};
