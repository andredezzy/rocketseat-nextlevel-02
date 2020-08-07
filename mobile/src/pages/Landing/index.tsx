import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import landingImg from '../../assets/images/landing.png';

import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

import styles from './styles';

interface ConnectionsResponse {
  total: number;
}

const Landing: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0);
  
  const { navigate } = useNavigation();

  useEffect(() => {
    api.get<ConnectionsResponse>('connections').then(response => {
      const { total } = response.data;

      setTotalConnections(total);
    });
  }, []);

  const handleNavigateToGiveClassesPage = useCallback(() => {
    navigate('GiveClasses')
  }, []);

  const handleNavigateToStudyPages = useCallback(() => {
    navigate('Study')
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.banner} source={landingImg} />

      <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton 
          style={[styles.button, styles.buttonPrimary]}
          onPress={handleNavigateToStudyPages}
        >
          <Image source={studyIcon} />
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton 
          style={[styles.button, styles.buttonSecondary]} 
          onPress={handleNavigateToGiveClassesPage}
        >
          <Image source={giveClassesIcon} />
          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de {totalConnections} conexões já realizadas {' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  )
};

export default Landing;