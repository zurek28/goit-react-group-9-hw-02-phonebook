import { Component } from 'react';
import PropTypes from 'prop-types';

import css from './Filter.module.css';

export class Filter extends Component {
  render() {
    const { onFilterChange } = this.props;
    return (
      <>
        <form className={css.form}>
          <label className={css.label}>
            Search contact
            <input type="text" name="filter" onChange={onFilterChange} />
          </label>
        </form>
      </>
    );
  }
}

Filter.ptopTypes = {
  onFilterChange: PropTypes.func,
};
