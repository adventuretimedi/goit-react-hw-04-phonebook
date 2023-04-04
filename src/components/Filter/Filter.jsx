import s from './Filter.module.css';

const Filter = ({ onFilterChanged }) => {
  const handleChange = e => {
    const filter = e.currentTarget.value;
    onFilterChanged(filter);
  };

  return (
    <label htmlFor="">
      <p className={s.titleFind}>Find contacts by name</p>
      <input
        onChange={handleChange}
        type="text"
        name="filter"
        className={s.inputFind}
      />
    </label>
  );
};

export default Filter;
