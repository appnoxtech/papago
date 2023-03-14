import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, memo, useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import LoadIcon from '../../common/LoadIcon';
import { colorPrimary, denimBlue } from '../../../../assets/styles/GlobalTheme';
import { data } from '../../../interfaces/Dashboard/record.interface';
import { ChangeSelectedActivity } from '../../../redux/reducers/planTrip.reducer';

interface params {
    item: data;
    selectedActivity: string
  }

const RenderItem: FC<params> = ({item, selectedActivity}) => {
    const dispatch = useDispatch();
    const isSelected = selectedActivity ? selectedActivity ===  item._id : null;
    const handlePress = (id: string) => {
        dispatch(ChangeSelectedActivity(id));
    }
    return (
       <TouchableOpacity onPress={() => handlePress(item._id)} style={isSelected ? styles.itemSelectedContainer : styles.itemContainer}>
          <LoadIcon size={20} iconFamily={item.iconFamily} iconName={item.iconName} color={isSelected ? denimBlue : 'black'} style={{marginBottom: responsiveScreenHeight(0.4)}} /> 
          <Text style={isSelected ? styles.selectedItemText : styles.itemText}>{item.activityName}</Text>
       </TouchableOpacity>
    )
}

const MemoisedRender = memo(RenderItem);

const ViewActivityHorizontalList = () => {
  const {activityList} = useSelector((state: any) => state.activity);
  const {selectedActivity} = useSelector((state: any) => state.planTrip);
  const data = useMemo(() => {
    let list: any = [];
    activityList.map((item: any) => {
        list = [...list, ...item.data];
    });
    return list;
  }, []);
  
  
  
  return (
    <FlatList
      style={styles.container}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      initialNumToRender={5}
      contentContainerStyle={styles.contentContainer}
      data={data}
      extraData={selectedActivity}
      renderItem={({item}) => <RenderItem selectedActivity={selectedActivity} item={item} />}
    />
  )
}

export default ViewActivityHorizontalList

const styles = StyleSheet.create({
    container: {
       marginVertical: responsiveScreenHeight(1.3)
    },
    contentContainer: {
        paddingHorizontal: responsiveScreenWidth(3),
        paddingVertical: responsiveScreenHeight(1),
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemContainer: {
        paddingHorizontal: responsiveScreenWidth(5),
        paddingVertical: responsiveScreenHeight(0.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemText: {
        color: 'black',
        fontWeight: 'bold'
    },
    itemSelectedContainer: {
        paddingHorizontal: responsiveScreenWidth(5),
        paddingVertical: responsiveScreenHeight(0.5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52,138,237,0.2)',
        borderRadius: 20,
    },
    selectedItemText: {
        color: denimBlue,
        fontWeight: 'bold'
    }
})