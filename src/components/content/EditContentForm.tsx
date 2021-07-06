// types
import type { Content } from 'tools/types/content';

interface Props {
  content: Content;
}

const CreateContentForm = ({ content }: Props) => {
  console.log(content);
  const onSubmitForm = async (event) => {
    try {
      event.preventDefault();
      //
    } catch (err) {
      //
    }
  };

  return (
    <form onSubmit={onSubmitForm}>
      <h1>TODO Form</h1>
    </form>
  );
};

export default CreateContentForm;
