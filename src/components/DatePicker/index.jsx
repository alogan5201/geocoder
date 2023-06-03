/**
=========================================================
* Material Kit 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-flatpickr components
import Flatpickr from "react-flatpickr";

// react-flatpickr styles
import "flatpickr/dist/flatpickr.css";

// Material Kit 2 PRO React components
import Input from "components/Input";

function DatePicker({ input, ...rest }) {
  return (
    <Flatpickr
      {...rest}
      render={({ defaultValue }, ref) => (
        <Input {...input} defaultValue={defaultValue} inputRef={ref} />
      )}
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
