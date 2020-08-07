import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

const Favorites: React.FC = () =>  {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  
  useFocusEffect(() => {
    AsyncStorage.getItem('favorites')
      .then(response => {
        if(response) {
          setTeachers(JSON.parse(response));
        }
      });
  });
  
  return (
    <View style={styles.container}>
        <PageHeader title="Meus proffys favoritos" />

        <ScrollView
          style={styles.teacherList}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 16,
          }}
        >
          {teachers.map(teacher => (
            <TeacherItem key={teacher.id} teacher={teacher} favorited />
          ))}
        </ScrollView>
    </View>
  )}
  ;

export default Favorites;