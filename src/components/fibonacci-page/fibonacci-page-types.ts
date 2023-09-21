import { ElementStates } from '../../types/element-states';

export interface IFibonacci {
  userText: string;
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
  setResult: React.Dispatch<React.SetStateAction<INumber[]>>;
}

export interface INumber {
  element: string;
  color: ElementStates;
}
