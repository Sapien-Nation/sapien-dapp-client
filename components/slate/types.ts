// constants
import { ElementType } from './constants';

export interface CustomText {
  text: string;
}

export interface CustomElement {
  type: ElementType;
  children: Array<CustomText>;
  id?: string;
  isFetching?: boolean;
  imageFallback?: string;
  key?: string | null;
  caption?: string;
  url?: string;
  onRemove?: () => void;
}
