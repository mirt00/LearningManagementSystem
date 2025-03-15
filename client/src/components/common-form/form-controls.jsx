function FormControls({ FormControls = [], formData, setFormdata }) {
  function randerComponentByType() {}
  return (
    <div className="flex flex-col gap-3">
      {FormControls.map((controlItem) => (
        <div key={controlItem.name}></div>
      ))}
    </div>
  );
}
