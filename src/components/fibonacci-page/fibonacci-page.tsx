import React, { useState } from 'react';
import styles from './fibonacci-page.module.css';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import classNames from 'classnames';
import { Circle } from '../ui/circle/circle';
import { calcFibonacci } from '../../utils/logic-fibonnaci';
import { timeDelay } from '../../utils/time-delay';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

export const FibonacciPage: React.FC = () => {
  const [isLoad, setLoad] = useState(false);
  const [userText, setUserText] = useState<string>('');
  const [result, setResult] = useState<string[]>([]);

  const changeUserString = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = evt.target;
    if (Number(value) > 19) value = '19';
    setUserText(value);
  };

  const renderResult = async () => {
    let result: string[] = calcFibonacci({ userText, setLoad, setResult });

    setLoad(true);
    for (let i = 0; i <= result.length; i++) {
      await timeDelay(SHORT_DELAY_IN_MS);
      setResult(result.slice(0, i + 1));
    }
    setLoad(false);
  };

  return (
    <SolutionLayout title='Последовательность Фибоначчи'>
      <div className={classNames(styles.wrapper)}>
        <Input
          min={1}
          max={19}
          value={userText}
          isLimitText={true}
          type='number'
          onChange={changeUserString}
        />
        <Button
          text='Рассчитать'
          isLoader={isLoad}
          disabled={false}
          onClick={renderResult}
        />
      </div>
      <div className={styles.result}>
        {result.map((el, i) => (
          <Circle key={i} letter={el} index={i} />
        ))}
      </div>
    </SolutionLayout>
  );
};
