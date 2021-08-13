const CreateContentForm = () => {
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
