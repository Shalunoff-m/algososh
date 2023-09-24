import React, { useEffect, useState } from 'react';
import styles from './string-page.module.css';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import classNames from 'classnames';
import { stringReverse } from '../../utils/logic-string';
import { IString } from './string-interface';
import { Circle } from '../ui/circle/circle';
import { timeDelay } from '../../utils/time-delay';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

export const StringComponent: React.FC = () => {
  // Храним введенный текст в стейте
  const [userText, setUserText] = useState<string>('');
  // Стейт для результата
  const [result, setResult] = useState<IString[]>([]);
  // Стейт лоадера
  const [isLoad, setLoad] = useState(false);

  const changeUserString = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUserText(evt.target.value);
  };

  const runCalculate = async () => {
    const steps = stringReverse({
      userText: userText,
      setResult,
      setLoad,
    });
    for (const step in steps) {
      await timeDelay(SHORT_DELAY_IN_MS);
      setResult(steps[step]);
      // console.log();
    }
  };

  return (
    <SolutionLayout title='Строка'>
      <div className={classNames(styles.wrapper)}>
        <Input
          maxLength={11}
          isLimitText={true}
          onChange={changeUserString}
          value={userText}
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
