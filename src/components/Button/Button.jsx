import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onLoadMore }) => {
  return (
    <div className={css.ButtonContainer} onClick={onLoadMore}>
      <button type="button" className={css.Button}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func,
};
