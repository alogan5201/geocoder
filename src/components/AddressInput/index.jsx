/* eslint-disable jsx-a11y/no-autofocus */
import Grid from '@mui/material/Grid';
import Input from 'components/Input';
// @mui material components
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import { useEffect, useRef, useState } from 'react';
import useStore from 'store/mapStore';
// @mui icons
import Box from 'components/Box';
import Typography from 'components/Typography';

function AddressInput({ onSubmit, ...props }) {
  const markerData = useStore((state) => state.markerData);
  const clearMapInputs = useStore((state) => state.clearMapInputs);
  const addressInputElm = useRef(null);
  const [address, setAddress] = useState(null);
  const locationMarkerData = useStore((state) => state.locationMarkerData);
  const [clear, setClear] = useState(false);

  useEffect(() => {
    if (clearMapInputs) {
      if (props.readOnly) {
        addressInputElm.current.value = '';
        setAddress(null);
      } else if (props.clear) {
        setClear(true);
      }
    }
  }, [clearMapInputs]);

  useEffect(() => {
    if (locationMarkerData && props.label === 'Destination') {
      return;
    } else if (locationMarkerData) {
      const index = props.index ? props.index : 0;

      const addressData = locationMarkerData[index].title.includes(', United States')
        ? locationMarkerData[index].title.replace(', United States', '')
        : locationMarkerData[index].title;

      setAddress(addressData);
    } else if (markerData && !locationMarkerData) {
      const index = props.index ? props.index : 0;

      const addressData = markerData[index].title.includes(', United States')
        ? markerData[index].title.replace(', United States', '')
        : markerData[index].title;

      setAddress(addressData);
    }
    return () => {
      setAddress(null);
    };
  }, [markerData, locationMarkerData]);
  useEffect(() => {
    if (address) {
      if (props.readOnly) {
        addressInputElm.current.value = address;
      }
    }
  }, [address]);
  return (
    <Grid item xs={12} pr={1} mb={2}>
      {props.label && (
        <Box>
          <Typography display="inline" variant="h6" fontWeight="regular" color="secondary">
            {props.label}
          </Typography>
        </Box>
      )}

      {props.readOnly ? (
        <Input
          inputRef={addressInputElm}
          label={addressInputElm ? '' : 'Address'}
          type="text"
          fullWidth
          InputProps={{ readOnly: props.readOnly }}
        />
      ) : (
        <AutoCompleteAddress
          autoFocus={props.autoFocus}
          address={address}
          label={props.label}
          submitOnSelect={props.submitOnSelect}
          onSubmit={onSubmit}
          icon={props.icon ? props.icon : null}
          clear={clear}
        />
      )}
    </Grid>
  );
}

export default AddressInput;
