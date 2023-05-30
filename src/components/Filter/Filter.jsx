import { Component } from 'react';
import PropTypes from 'prop-types';

export class Filter extends Component {
  render() {
    const { handleChange } = this.props;
    return (
      <>
        <form>
          <input type="text" name="filter" onChange={handleChange} />
        </form>
      </>
    );
  }
}

Filter.ptopTypes = {
  handleChange: PropTypes.func,
};
