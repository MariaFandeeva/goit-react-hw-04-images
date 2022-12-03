import PropTypes from 'prop-types';

export const Button = ({ onLoadMore }) => {
  return (
    <div className="Button-container" onClick={onLoadMore}>
      <button type="button" className="Button">
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func,
};
