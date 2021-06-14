import { CompositeDecorator } from 'draft-js';

//components
import { Bold, Italic, Link, Underline } from 'utils/draftjs';

//utils
import {
  boldStrategy,
  italicStrategy,
  linkStrategy,
  underlineStrategy,
} from 'utils/draftjs/strategies';

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
    strategy: linkStrategy,
    component: Link,
  },
  {
    strategy: underlineStrategy,
    component: Underline,
  },
]);
