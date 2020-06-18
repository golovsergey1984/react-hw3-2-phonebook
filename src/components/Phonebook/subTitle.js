import React from 'react';
import PropTypes from 'prop-types';
import styles from './Fponebook.module.css';

const subTitle = props => <p className={styles.title}>{props.title}</p>;
export default subTitle;

subTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
