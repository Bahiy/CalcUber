const Input = ({ name, value, place, onChange }) => {
  const style =
    "bg-zinc-950 border-solid rounded border-2 border-gray-400 m-2 text-center px-2";

  return (
    <input
      type="number"
      name={name}
      id={name}
      value={value}
      placeholder={place}
      onChange={onChange}
      className={style}
    />
  );
};

export default Input;
