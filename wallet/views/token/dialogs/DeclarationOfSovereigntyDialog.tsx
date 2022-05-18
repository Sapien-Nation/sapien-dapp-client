import { Dialog } from 'components/common';

interface Props {
  onClose: () => void;
}

const EditTribeDialog = ({ onClose }: Props) => {
  return (
    <Dialog
      show
      onClose={onClose}
      title="Declaration Of Sovereignty"
      confirmLabel="Ok"
    >
      <h1>TODO Text</h1>
    </Dialog>
  );
};

export default EditTribeDialog;
