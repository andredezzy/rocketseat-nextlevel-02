import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-community/async-storage'
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

const TeacherList: React.FC = () =>  {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const loadFavorites = useCallback(() => {
    AsyncStorage.getItem('favorites')
      .then(response => {
        if (response) {
          const parsedFavoriteTeachers: Teacher[] = JSON.parse(response);
          const favoriteTeachersIds = parsedFavoriteTeachers.map(teacher => teacher.id);
          
          setFavorites(favoriteTeachersIds);
        }
      });
  }, []);
  
  const handleToggleFiltersVisible = useCallback(() => {
    setIsFiltersVisible(state => !state);
  }, []);

  const handleFiltersSubmit = useCallback(async () => {
    loadFavorites();

    const response = await api.get('classes', { 
      params: { 
        subject, 
        week_day, 
        time,
      },
    });

    setIsFiltersVisible(false);
    setTeachers(response.data);
  }, [subject, week_day, time]);

  return (
    <View style={styles.container}>
        <PageHeader 
          title="Proffys disponíveis"
          headerRight={(
            <BorderlessButton onPress={handleToggleFiltersVisible}>
              <Feather name="filter" size={20} color="#FFF" />
            </BorderlessButton>
          )}
        >
          { isFiltersVisible && (
            <View style={styles.searchForm}>
              <Text style={styles.label}>Matéria</Text>
              <TextInput
                style={styles.input}
                placeholder="Qual a matéria?"
                placeholderTextColor="#C1BCCC"
                value={subject}
                onChangeText={text => setSubject(text)}
              />

              <View style={styles.inputGroup}>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Dia da semana</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Qual o dia?"
                    placeholderTextColor="#C1BCCC"
                    value={week_day}
                    onChangeText={text => setWeekDay(text)}
                  />
                </View>

                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Horário</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Qual horário?"
                    placeholderTextColor="#C1BCCC"
                    value={time}
                    onChangeText={text => setTime(text)}
                  />
                </View>
              </View>

              <RectButton 
                style={styles.submitButton}
                onPress={handleFiltersSubmit}
              >
                <Text style={styles.submitButtonText}>Filtrar</Text>
              </RectButton>
            </View>
          )}
        </PageHeader>

        <ScrollView
          style={styles.teacherList}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 16,
          }}
        >
          {teachers.map(teacher => (
            <TeacherItem 
              key={teacher.id}
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          ))}
        </ScrollView>
    </View>
  )
};

export default TeacherList;