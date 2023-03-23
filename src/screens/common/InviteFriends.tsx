import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Searchbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderWithBackBtn from '../../components/common/Headers/HeaderWithBackBtn';
import {Button} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {colorPrimary} from '../../../assets/styles/GlobalTheme';
import FriendList from '../../components/Dashboard/chalenges/FriendList';
import SearchBarComponent from '../../components/common/inputs/SearchBarComponent';

const InviteFriends = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <HeaderWithBackBtn title="Invite your friend" />
      <View style={styles.body}>
        <View style={styles.searchContainer}>
          <SearchBarComponent />
        </View>
        <View style={styles.friendListContainer}>
            <Text style={styles.textSecondary}>PapaGo users</Text>
            <FriendList />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InviteFriends;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(3),
    justifyContent:'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#eeeeee',
  },
  btn: {
    width: responsiveScreenWidth(90),
    paddingVertical: responsiveScreenHeight(0.7),
    marginTop: responsiveScreenHeight(2)
  },
  btnText: {
    fontSize: responsiveFontSize(2),
    fontWeight: '800',
  },
  textPrimary: {
    fontSize: responsiveFontSize(2.4),
    letterSpacing: 0.4,
    fontWeight: 'bold',
    color: 'black'
  },
  textSecondary: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    color: 'black'
  },
  body: {
    flex: 1,
    paddingTop: responsiveScreenHeight(2)
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  search: {
    width: responsiveScreenWidth(90),
    backgroundColor: 'rgba(221,221,221,0.2)',
    paddingVertical: 0
  },
  searchInput: {
    color: '#dddddd'
  },
  friendListContainer: {
    flex: 1,
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(3),
  }
});
