// components
import { ContentFeedSkeleton } from 'components/common';

// mui
import { Fade } from '@material-ui/core';

const NewContentPlaceholder = ({ open }: { open: boolean }) => (
  <Fade unmountOnExit in={open}>
    <div>
      <ContentFeedSkeleton />
    </div>
  </Fade>
);

export default NewContentPlaceholder;
