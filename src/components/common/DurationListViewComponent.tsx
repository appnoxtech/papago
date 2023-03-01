import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

interface props {
  list: Array<string | number>;
  activeIndex: number,
  setActiveIndex: any
}
const DurationListViewComponent: FC<props> = ({list, activeIndex, setActiveIndex}) => {

  const RenderItem: FC<{item: string | number; index: number}> = ({item, index}) => {
    const isSelected = activeIndex === index;
    return (
      <TouchableOpacity style={styles.monthNameContainer} onPress={() => setActiveIndex(index)}>
        <Text
          style={[styles.monthName, {color: isSelected ? 'black' : '#dddddd'}]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        renderItem={({item, index}) => <RenderItem item={item} index={index} />}
        contentContainerStyle={styles.contentContainer}
        style={styles.listStyle}
        extraData={activeIndex}
      />
    </View>
  );
};

export default DurationListViewComponent;

const styles = StyleSheet.create({
  container: {
    paddingVertical: responsiveScreenHeight(2),
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1.3,
  },
  monthNameContainer: {
    marginHorizontal: responsiveScreenWidth(2)
  },
  monthName: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: '600',
  },
  contentContainer: {
    flexDirection: 'row',
    gap: responsiveScreenWidth(3),
    paddingHorizontal: responsiveScreenWidth(2)
  },
  listStyle: {
    flexDirection: 'row-reverse'
  }
});
