import { Component } from 'react';
import s from '../Filter/Filter.module.css';

class Filter extends Component {
  handleChange = e => {
    const filter = e.currentTarget.value;
    this.props.onFilterChanged(filter);
  };

  render() {
    return (
      <label htmlFor="">
        <p className={s.titleFind}>Find contacts by name</p>
        <input
          onChange={this.handleChange}
          type="text"
          name="filter"
          className={s.inputFind}
        />
      </label>
    );
  }
}

export default Filter;
