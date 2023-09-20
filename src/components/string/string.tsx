import React, { useState } from 'react';
import styles from './string.module.css';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import classNames from 'classnames';
import { stringReverse } from '../utils/string-reverse';
import { IString } from './interface';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';

export const StringComponent: React.FC = () => {
  // Храним введенный текст в стейте
  const [userString, setUserString] = useState<string>('');
  // Стейт для результата
  const [result, setResult] = useState<IString[]>([]);
  // Стейт лоадера
  const [isLoad, setLoad] = useState<boolean>(false);

  const changeUserString = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUserString(evt.target.value);
  };

  const runCalculate = () => {
    stringReverse({
      userText: userString,
      setResult,
      setLoad,
    });
  };

  return (
    <SolutionLayout title='Строка'>
      <div className={classNames(styles.wrapper)}>
        <Input
          maxLength={11}
          isLimitText={true}
          onChange={changeUserString}
          value={userString}
        />
        <Button
          text='Развернуть'
          isLoader={isLoad}
          disabled={false}
          onClick={runCalculate}
        />
      </div>
      <div className={styles.result}>
        {result.map((element, i) => (
          <Circle key={i} letter={element.element} state={element.color} />
        ))}
      </div>
    </SolutionLayout>
  );
};
