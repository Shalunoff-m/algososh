import React from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';

export const StringComponent: React.FC = () => {
  return (
    <SolutionLayout title='Строка'>
      <Input />
      <Button
        text='Развернуть'
        type='button'
        isLoader={false}
        disabled={true}
      />
    </SolutionLayout>
  );
};
