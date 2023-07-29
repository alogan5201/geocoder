// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// react-flatpickr components
import Flatpickr from 'react-flatpickr';

// react-flatpickr styles
import 'flatpickr/dist/flatpickr.css';

import Input from 'components/Input';

function DatePicker({ input, ...rest }) {
  return (
    <Flatpickr
      {...rest}
      render={({ defaultValue }, ref) => <Input {...input} defaultValue={defaultValue} inputRef={ref} />}
    />
  );
}

// Setting default values for the props of DatePicker
DatePicker.defaultProps = {
  input: {},
};

// Typechecking props for the DatePicker
DatePicker.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
};

export default DatePicker;
