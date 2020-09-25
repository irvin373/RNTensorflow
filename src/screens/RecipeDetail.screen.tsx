import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity, FlatList
} from 'react-native';
import DataBase from '../utils/DataBase';
import styles from '../utils/styles';
import {PlantType, RecipeType} from '../types';
import ArrowContainer from '../components/ArrowContainer.component';
import TQImage, {ImageName} from '../components/TQImage';
import color from '../utils/color';
const plantsQuery = 'SELECT P.id, P.name, P.imageName, M.name as MedicalName from MedicalGroup as M, Plant as P, Plant_to_Recipe as PR WHERE P.id = PR.plantId AND PR.recipeId = {{recipeId}} AND M.id = P.MedicalGroupId';
const recipeDetail = 'SELECT * from Recipe as R WHERE R.id = {{recipeId}} LIMIT 1';

type Props = {
  navigation: any,
  route: any
};

function PlantCard({data, medicalGroup, openDetail}: {data: PlantType, medicalGroup: string, openDetail: (id: string) => void}) {
  return (
    <ArrowContainer>
      <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => { openDetail(data.id.toString()); }}>
        <TQImage iconSize={60} name={data.imageName} />
        <View style={{padding: 8}}>
          <Text style={styles.textHeader}>{data.name}</Text>
          <Text style={{...styles.detailedText, marginTop: 4}}>{medicalGroup}</Text>
        </View>
      </TouchableOpacity>
    </ArrowContainer>
  )
}

export default function PlantDetails({ navigation, route }: Props) {
  const {recipeId} = route.params;
  const recipeQuery = recipeDetail.replace('{{recipeId}}', recipeId)
  const plantQuery = plantsQuery.replace('{{recipeId}}', recipeId)
  const [plants, setPlant] = useState<PlantType[]>([]);
  const [recipe, setRecipes] = useState<RecipeType>();
  useEffect(() => {
    navigation.setOptions({title: ''});
    DataBase.getQuery(recipeQuery).then(data => {
      setRecipes(data[0]);
    });
    DataBase.getQuery(plantQuery).then(data => {
      setPlant(data);
    });
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: color.white }}>
      <Text style={styles.headerName}>{recipe?.name}</Text>
      <TQImage name={recipe?.imageName as ImageName} fullsize height={210} />
      <View style={{padding: 16, borderBottomColor: color.cardBorder, borderBottomWidth: 1}}>
        <Text style={styles.detailedText}>{recipe?.preparation}</Text>
      </View>
      <FlatList
        scrollEnabled={false}
        keyExtractor={(item) => item.id.toString()}
        data={plants}
        renderItem={({item}) => 
          <PlantCard data={item} medicalGroup={item.MedicalName as string}
            openDetail={() => {
              navigation.popToTop();
              navigation.navigate('Plantas');
              navigation.push('PlantDetail', {
                plantId: item.id
              });
            }} />
        }
      />
    </View>
  );
}
