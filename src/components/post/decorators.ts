import { CompositeDecorator } from 'draft-js';

//components
import { Bold, Italic, Underline } from './Markdowns';

//utils
import {
  boldStrategy,
  italicStrategy,
  underlineStrategy,
} from 'utils/strategies';

export const decorators = new CompositeDecorator([
  {
    strategy: boldStrategy,
    component: Bold,
  },
  {
    strategy: italicStrategy,
    component: Italic,
  },
  {
    strategy: underlineStrategy,
    component: Underline,
  },
]);
