import React, { useState, useMemo } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, StatusBar, ActivityIndicator, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import { GigColors } from '../constants/colors';
import { DefaultHeader } from '../components/Header/DefaultHeader';
import { GET_All_CATEGORIES } from '../lib/category';


export default function CategoriesScreen(props: any) {

  const { data: catData, error: catError, loading: catLoading } = useQuery(GET_All_CATEGORIES);
  
  const [ categories, setCategories] = useState();

  useMemo(() => {
    if (catData && catData?.getAllCategories){
      setCategories(catData?.getAllCategories);
    }
}, [catData]);

  const renderItem = ({ item } : any ) => (
    <View style={styles.categoryWrapper}>
      <TouchableOpacity 
        style={styles.item} 
        onPress={() => props.navigation.navigate('Skills', {
          categoryName: item['name'], skills: item['categorySkills'], isConsumer: props.isConsumer
        })} 
      >
        <Text style={styles.title}>{item['name']} </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <DefaultHeader title={'Categories'} navigation={props.navigation} goBack={true} isConsumer={props.isConsumer}/>
      </View> 
      {catLoading &&  <ActivityIndicator size="large" color={GigColors.Blue} style={{alignItems:'center', justifyContent:'center'}}/>}
      <ScrollView>
        {categories && categories.length > 0 && <>
          <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
          />
        </>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: GigColors.Blue
  },
  item: {
    backgroundColor: GigColors.White,
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoriesWrapper: {
    flexDirection: 'row',
  },
  categoryWrapper: {
    width: '50%',
    height: 150
  }
});
