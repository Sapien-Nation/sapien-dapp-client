// constants
import { ElementType } from './constants';

export interface CustomText {
  text: string;
}

export interface CustomElement {
  href?: string;
  type: ElementType;
  children: Array<CustomText>;
  id?: string;
  isFetching?: boolean;
  imageFallback?: string;
  image?: any;
  key?: string | null;
  caption?: string;
  url?: string;
  onRemove?: () => void;
}
