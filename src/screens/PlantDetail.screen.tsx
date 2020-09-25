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
const recipePlant = 'SELECT * from  Recipe as R, Plant_to_Recipe as PR WHERE R.id = PR.recipeId AND PR.plantId = {{plantId}}';
const plantDetail = 'SELECT P.id, P.name, P.imageName, P.description, M.name as MedicalName from Plant as P INNER JOIN MedicalGroup as M on M.id = P.MedicalGroupId WHERE P.id = {{plantId}} LIMIT 1';

type Props = {
  navigation: any,
  route: any
  plantId: string
};

function RecipeCard({data, medicalGroup, openDetail}: {data: RecipeType, medicalGroup: string, openDetail: (id: string) => void}) {
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
  const {plantId} = route.params;
  const recipeQuery = recipePlant.replace('{{plantId}}', plantId)
  const plantQuery = plantDetail.replace('{{plantId}}', plantId)
  const [plant, setPlant] = useState<PlantType>();
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  useEffect(() => {
    DataBase.getQuery(recipeQuery).then(data => {
      setRecipes(data);
    });
    DataBase.getQuery(plantQuery).then(data => {
      setPlant(data[0]);
    });
  }, []);
  console.log('-->', recipes, plant)
  return (
    <View style={{ flex: 1, backgroundColor: color.white }}>
      <Text style={styles.headerName}>{plant?.name}</Text>
      <TQImage name={plant?.imageName as ImageName} fullsize height={210} />
      <View style={{padding: 16, borderBottomColor: color.cardBorder, borderBottomWidth: 1}}>
        <Text style={styles.detailedText}>{plant?.description}</Text>
      </View>
      <FlatList
        scrollEnabled={false}
        keyExtractor={(item) => item.id.toString()}
        data={recipes}
        renderItem={({item}) => 
          <RecipeCard data={item} medicalGroup={plant?.MedicalName as string} openDetail={() => {}} />
        }
      />
    </View>
  );
}
