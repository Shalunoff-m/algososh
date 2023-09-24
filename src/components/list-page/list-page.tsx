import React, { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './list-page.module.css';
import { timeDelay } from '../../utils/time-delay';
import { List } from './list-page-class';
import {
  addToHead,
  addToTail,
  example,
  addItemIndex,
  removeFromHead,
  removeItemIndex,
  removeTailItem,
} from '../../utils/list-logic';
import { TListElement } from './list-page-types';
import { ElementStates } from '../../types/element-states';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';

export const ListPage: React.FC = () => {
  /* 
  [x]  Можно лучше: если реакт сам может вывести тип, то можно его не писать. Как в этом случае useState<boolean>(false) тоже самое, что useState(false)
   */

  // СТЕЙТЫ
  const [list] = useState(new List(example));
  // ---
  const [userValue, setUserValue] = useState<string>('');
  const [userIndexValue, setInputIndexState] = useState<string>('');
  // ---
  const [isAddToHead, setAddToHead] = useState(false);
  const [isRemoveFromHead, setRemoveFromHead] = useState(false);
  const [isAddToTail, setAddToTail] = useState(false);
  const [isRemoveFromTail, setRemoveFromTail] = useState(false);
  const [isAddIndex, setAddIndex] = useState(false);
  const [isRemoveIndex, setRemoveIndex] = useState(false);
  // ---
  const [isStart, setIsStart] = useState(false);
  const [isBottom, setBottom] = useState(false);
  // ---
  const [disableBtn, setDisableBtn] = useState(false);
  const [listArr, setListArr] = useState<TListElement[]>(list.arr);
  const [roundTip, setRoundTip] = useState<TListElement>({
    value: '',
    color: ElementStates.Changing,
    position: -1,
  });

  // ХЕНДЛЕРЫ
  // Ввод индекса
  const changeIndexHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputIndexState(evt.target.value);
    const num = Number(evt.target.value);
    if (num > list.arr.length) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  };

  // Ввод значения
  const changeValueHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUserValue(evt.target.value);
  };

  // Анимация добавления
  const addAnim = async (num: number, end: number) => {
    for (let i = 0; i <= end; i++) {
      setRoundTip({
        ...roundTip,
        value: userValue,
        position: i,
      });
      await timeDelay(SHORT_DELAY_IN_MS);
      list.arr[num].color = ElementStates.Changing;
      if (num < end) {
        num++;
      }
      setListArr([...list.arr]);
    }
  };

  // Анимация Удаление
  const removeAnim = async (end: number) => {
    setIsStart(true);
    for (let i = 0; i <= end; i++) {
      list.arr[i].color = ElementStates.Changing;
      setListArr([...list.arr]);
      await timeDelay(SHORT_DELAY_IN_MS);
    }
    list.arr[end].color = ElementStates.Default;
    /* [ ] Можно лучше: В хуке useEffect (А также в любых функциях, что выполняют асинхронные действия) вызывать useState стооит только если компонент действительно существует. Иначе, если выйти из страницы с неоконченным выполнением алгоритма возникает такая ошибка:
    
    react_devtools_backend.js:4026 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
  at StringComponent (http://localhost:3000/static/js/bundle.js:2603:84)
    
    Именно поэтому важно очищать все асинхронные запросы при размонтировании компонента. Это можно сделать примерно вот так:

    useEffect(() ⇒ {
    let isComponentMounted = true;
    await someAsyncStuff(() ⇒ {
    if (isComponentMounted ) doMagic()
    })
    return  () ⇒ {isComponentMounted  = false};
    })

    */
    setRoundTip({
      ...roundTip,
      value: list.arr[end].value,
      position: end,
    });
    await timeDelay(SHORT_DELAY_IN_MS);
    setIsStart(false);
  };

  return (
    <SolutionLayout title='Связный список'>
      <div className={styles.input_wrapper}>
        <div className={styles.buttons_wrapper}>
          <Input
            maxLength={4}
            isLimitText={true}
            value={userValue}
            onChange={changeValueHandler}
          />
          <Button
            text='Добавить в head'
            onClick={() =>
              addToHead(
                setIsStart,
                setAddToHead,
                setRoundTip,
                roundTip,
                userValue,
                list,
                setListArr,
                setInputIndexState,
                setUserValue
              )
            }
            disabled={!userValue || isStart}
            isLoader={isAddToHead}
          />
          <Button
            text='Добавить в tail'
            disabled={!userValue || isStart}
            onClick={() =>
              addToTail(
                setIsStart,
                setAddToTail,
                setRoundTip,
                roundTip,
                userValue,
                list,
                setListArr,
                setInputIndexState,
                setUserValue
              )
            }
            isLoader={isAddToTail}
          />
          <Button
            text='Удалить из head'
            onClick={() =>
              removeFromHead(
                setIsStart,
                setRemoveFromHead,
                setBottom,
                setRoundTip,
                roundTip,
                list,
                setListArr,
                setInputIndexState,
                setUserValue
              )
            }
            isLoader={isRemoveFromHead}
            disabled={list.isEmpty() || isStart}
          />
          <Button
            text='Удалить из tail'
            onClick={() =>
              removeTailItem(
                setIsStart,
                setRemoveFromTail,
                setBottom,
                setRoundTip,
                roundTip,
                list,
                setListArr,
                setInputIndexState,
                setUserValue
              )
            }
            isLoader={isRemoveFromTail}
            disabled={list.isEmpty() || isStart}
          />
          <Input
            maxLength={4}
            type='number'
            value={userIndexValue}
            onChange={changeIndexHandler}
            placeholder='Введите индекс'
          />
          <Button
            extraClass={styles.index_add}
            text='Добавить по индексу'
            disabled={!userIndexValue || !userValue || isStart}
            onClick={() =>
              addItemIndex(
                setIsStart,
                setAddIndex,
                setRoundTip,
                userValue,
                userIndexValue,
                list,
                setListArr,
                setInputIndexState,
                setUserValue,
                addAnim
              )
            }
            isLoader={isAddIndex}
          />
          <Button
            extraClass={styles.index_remove}
            text='Удалить по индексу'
            disabled={
              !userIndexValue ||
              disableBtn ||
              isStart ||
              Number(userIndexValue) > listArr.length - 1 ||
              Number(userIndexValue) < 0
            }
            onClick={() =>
              removeItemIndex(
                setIsStart,
                setRemoveIndex,
                setBottom,
                setRoundTip,
                userIndexValue,
                list,
                setListArr,
                setInputIndexState,
                setUserValue,
                removeAnim
              )
            }
            isLoader={isRemoveIndex}
          />
        </div>
      </div>
      <ul className={styles.elements_list}>
        {listArr?.map((item, index) => (
          <li className={styles.circles_wrapper} key={index}>
            {roundTip.position === index && (
              <Circle
                isSmall={true}
                letter={roundTip.value}
                state={roundTip.color}
                extraClass={`${isBottom && styles.bottom_tip}`}
              />
            )}
            <Circle
              extraClass={styles.default_element}
              letter={item.value}
              state={item.color}
              index={index}
              tail={
                index === list.getTail() && index !== roundTip.position
                  ? 'tail'
                  : ''
              }
              head={
                index === list.getHead() && index !== roundTip.position
                  ? 'head'
                  : ''
              }
            />
            {index < listArr.length - 1 && (
              <div className={styles.arrow_box}>
                <ArrowIcon />
              </div>
            )}
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
