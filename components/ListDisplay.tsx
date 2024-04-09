import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { loadPharmacyData, globalPharmacyData, Pharmacy } from './PharSearch'; // loadPharmacyData 함수와 globalPharmacyData를 import
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListDisplay = () => {
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const [searchQuery, setSearchQuery] = useState(''); // 매개변수로 전달할 검색어
    const [favorites, setFavorites] = useState({});

    useEffect (() => {
        loadFavorites();
    }, []);


    const loadFavorites = async () => {
        const favs = await AsyncStorage.getItem('favorites');
        setFavorites(favs ? JSON.parse(favs) : {});
    };

    const handleSearch = async () => {
        setIsLoading(true); // 검색 시작 시 로딩 상태로 변경
        await loadPharmacyData(searchQuery); // 검색어를 매개변수로 전달하여 데이터 로딩
        setIsLoading(false); // 데이터 로딩 완료 후 로딩 상태 해제
    };

    const toggleFavorite = async (pharmacyId) => {
        const newFavorites = { ...favorites };
        if (newFavorites[pharmacyId]) {
            delete newFavorites[pharmacyId];
        } else {
            newFavorites[pharmacyId] = true;
        }
        setFavorites(newFavorites);
        await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    return (
        <View>
            <TextInput
                style={styles.search}
                placeholder="검색어를 입력하세요"
                value={searchQuery}
                onChangeText={setSearchQuery} // 사용자 입력에 따라 searchQuery 상태 업데이트
            />
            
            <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
                <Text style={styles.btnText}>검색</Text>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.container}>
                {globalPharmacyData.length === 0 ? (
                    <Text>검색 결과가 없습니다.</Text>
                ) : (
                    globalPharmacyData.map((pharmacy: Pharmacy) => (
                        <View key={pharmacy.id} style={styles.pharmacy}>
                            <View>
                                <Text style={styles.name}>{pharmacy.name}</Text>
                                <Text>전화번호: {pharmacy.phone.toString()}</Text>
                                <Text>주소: {pharmacy.address}</Text>
                                <Text>영업 시간: {pharmacy.dutyopen} ~ {pharmacy.dutyclose}</Text>
                                <Text style={pharmacy.isOpen ? styles.openStat : styles.closeStat}>
                                    {pharmacy.isOpen ? '영업 중' : '영업 종료'}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => toggleFavorite(pharmacy.id)}>
                                <Icon
                                    name={favorites[pharmacy.id] ? 'star' : 'star-outline'}
                                    size={24}
                                    color={favorites[pharmacy.id] ? 'gold' : 'grey'}
                                />
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    pharmacy: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        paddingBottom: 10,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    search: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        margin: 10,
        marginTop: 0,
    },
    searchBtn: {
        backgroundColor: '#C2C96D',
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 5,
    },
    btnText: {
        color: "#000000",
        fontWeight: "600",
        textAlign: "center",
        fontSize: 20,

    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    openStat: {
        marginTop: 5,
        fontSize: 16,
        color: 'green',
    },
    closeStat: {
        marginTop: 5,
        fontSize: 16,
        color: 'red'
    }
});

export default ListDisplay;
