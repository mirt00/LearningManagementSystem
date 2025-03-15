function CommonForm({ handleSubmit,buttonText }) {
  return(
 <form Onsubmit={handleSubmit}>

{/* render form controls here */}
<Buttton type="submit">{buttonText || 'Submit'}</Buttton>
</form>);
}

export default CommonForm;