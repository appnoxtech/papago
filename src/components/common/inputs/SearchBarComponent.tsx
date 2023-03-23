import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import LoadIcon from '../LoadIcon';

const SearchBarComponent = () => {
  const [input, setInput] = useState('');
  return (
    <View style={styles.container}>
      <LoadIcon
        style={{}}
        size={20}
        iconName="search"
        iconFamily="Feather"
        color="grey"
      />
      <View style={styles.textContainer}>
        <TextInput
          placeholder="Search"
          value={input}
          placeholderTextColor={'grey'}
          onChangeText={text => setInput(text)}
          style={styles.input}
        />
      </View>
    </View>
  );
};

export default SearchBarComponent;

const styles = StyleSheet.create({
  container: {
    width: responsiveScreenWidth(95),
    backgroundColor: '#eeeeee',
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(0.5),
    height: responsiveScreenHeight(5.4),
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center'
  },
  input: {
     width: '100%',
     paddingVertical: responsiveScreenHeight(0.5),
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: responsiveScreenWidth(3)
  }
});
