import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TextInputWithIcon from '../../common/inputs/TextInputWithIcon';
import {colorPrimary} from '../../../../assets/styles/GlobalTheme';
import {
  PlanTrip,
  planTripCords,
} from '../../../interfaces/reducers/PlanTripInterface';
import {UpdateTripStopPoints} from '../../../redux/reducers/planTrip.reducer';

const initialCords = {
    cords: null,
    name: '',
  }
const RouteMapStops = () => {
  const [planTripCords, setPlanTripCords] = useState<planTripCords>(initialCords);
  const stops: Array<planTripCords> = useSelector(
    (state: any) => state.planTrip.stops,
  );
  const dispatch = useDispatch();

  const handelAddStops = () => {
    dispatch(UpdateTripStopPoints({action: 'Add', data: planTripCords}));
    setPlanTripCords(initialCords);
  };

  const handleRemoveStops = (index: number) => {
    if (index) {
      dispatch(UpdateTripStopPoints({action: 'Remove', data: index - 1}));
    }
  };

  const onChangeHandler = (planTripCords: planTripCords) => {
    setPlanTripCords({...planTripCords})
  }

  console.log('stops', stops);
  

  return (
    <>
      {stops.length > 0 ? (
        <React.Fragment>
          {stops.map((item: planTripCords, index: number) => {
            return (
              <React.Fragment key={index}>
                <TextInputWithIcon
                  rightIconClickHandler={handleRemoveStops}
                  value={item?.name}
                  isEditable={false}
                  type="stops"
                  stopAdded={true}
                  index={index + 1}
                  iconSize={[25]}
                  iconFamily={['FontAwesome']}
                  iconName={['dot-circle-o']}
                  iconColor={[colorPrimary]}
                  placeholder="Add Stops"
                />
              </React.Fragment>
            );
          })}
          <TextInputWithIcon
            rightIconClickHandler={handelAddStops}
            type="stops"
            id='stops'
            stopAdded={false}
            onChangeHandler={onChangeHandler}
            value={planTripCords.name}
            index={stops.length + 1}
            iconSize={[25]}
            iconFamily={['FontAwesome']}
            iconName={['dot-circle-o']}
            iconColor={[colorPrimary]}
            placeholder="Add Stops"
          />
        </React.Fragment>
      ) : (
        <TextInputWithIcon
          rightIconClickHandler={handelAddStops}
          type="stops"
          id='stops'
          onChangeHandler={onChangeHandler}
          stopAdded={false}
          index={1}
          value={planTripCords.name}
          iconSize={[25]}
          iconFamily={['FontAwesome']}
          iconName={['dot-circle-o']}
          iconColor={[colorPrimary]}
          placeholder="Add Stops"
        />
      )}
    </>
  );
};

export default RouteMapStops;

const styles = StyleSheet.create({});
