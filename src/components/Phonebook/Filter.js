import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SubTitle from './subTitle.js';

const Filter = ({ value, onChangeFilter }) => (
  <Fragment>
    <SubTitle title="Find contacts by name" />
    <input
      type="text"
      placeholder="Type to filter names..."
      value={value}
      onChange={onChangeFilter}
    ></input>
  </Fragment>
);

export default Filter;

Filter.propTypes = {
  onChangeFilter: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
