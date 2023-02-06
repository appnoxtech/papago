import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, FlatList, TouchableOpacity, ImageBackground, Image, ScrollView, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { Text } from 'react-native-paper';
import { moderateScale, scale } from 'react-native-size-matters';
import { boldFont, danger, iconSize, lightFont, mainColor, mediumFont, mediumText, normalText } from '../../assets/styles/GlobalTheme';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { GetDataListService } from '../services/axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

interface photos {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}
export default function Home() {
    const navigation = useNavigation();
    const [data, setData] = useState(Array<photos> || []);
    const [searchText, setSearchText] = useState('')
    const [showImage, setShowImage] = useState(true);

    const getData = async () => {
        try {
            const res = await GetDataListService();
            if(res.data){
                const data = res.data.slice(1, 30);
                setData([...data]);
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }
    
    useEffect(() => {
        getData()
    }, []);
    return (

        <SafeAreaView style={styles.container}>
            <View style={{ width: '100%', alignSelf: 'center', }}>
                {!showImage && searchText == '' && <View style={styles.searchBarContainer}>
                    <Text style={{fontFamily: boldFont, fontSize: responsiveFontSize(8), textAlign: 'center', color: '#648966'}}>Home</Text>
                </View>}

                {/* search conatiner */}

                <View style={{ borderWidth: 1, width: '92%', alignSelf: 'center', paddingVertical: moderateScale(5), borderRadius: moderateScale(20), borderColor: mainColor, elevation: 2, backgroundColor: '#fff', shadowColor: mainColor, flexDirection: 'row', paddingHorizontal: scale(10), marginVertical: moderateScale(10) }}>
                    <AntDesign name='search1' size={iconSize - 4} />
                    <TextInput onFocus={() => setShowImage(true)}
                        onBlur={() => setShowImage(false)}
                        style={{ marginLeft: scale(5), fontFamily: lightFont, fontSize: normalText + 2, width: '100%' }} placeholder='Search Product' onChangeText={(val) => setSearchText(val)} />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: moderateScale(200) }}>
                        {data.filter((d, i) => {
                            if (searchText == '') {
                                return d
                            }
                            else if (d.title.toLocaleLowerCase().startsWith((searchText.toLocaleLowerCase()))) {
                                return d
                            }
                        }).map((item: photos) => {
                            return (
                                <TouchableOpacity activeOpacity={0.5} key={item.id} onPress={() => console.log('Hola')}
                                    style={styles.card}>
                                    <View style={{ height: moderateScale(100), width: moderateScale(120) }}>
                                        <Image source={{ uri: item.thumbnailUrl }} style={{ height: '100%', width: '100%' }} resizeMode='contain' />
                                    </View>
                                    {/* <Text style={{ fontFamily: mediumFont, fontSize: mediumText }}>{i18n.t('name')}</Text> */}
                                    <Text style={{ fontFamily: mediumFont, fontSize: mediumText + 2 }} numberOfLines={1}>{item.title}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderTopWidth: 1.2,
        borderTopColor: '#C3CFC5',
    },
    card: {
        borderColor: danger,
        marginVertical: moderateScale(15),
        minHeight: moderateScale(150),
        borderRadius: moderateScale(6),
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: scale(10),
        width: '43%',
        marginHorizontal: moderateScale(12),
        paddingVertical: moderateScale(8),
        backgroundColor: '#fff',
        shadowColor: mainColor,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 3,
        borderWidth: 0.5,

    },
    searchBarContainer: { 
        height: moderateScale(100), 
        width: '100%', 
        alignSelf: "center",
        marginTop: moderateScale(15), 
    }
});
