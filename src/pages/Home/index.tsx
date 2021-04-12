import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';
import logo from '../../images/logo.png';
import backgroundBlue from '../../images/backgroundBlue.png';
import hand from '../../images/hand.png';

const Home: React.FC = () => (
  <ImageBackground source={backgroundBlue} style={styles.container}>
    <View style={styles.rectanglesTop}>
      <View style={styles.rectangle1} />
      <View style={styles.rectangle2} />
      <View style={styles.rectangle3} />
      <View style={styles.rectangle4} />
      <Text />
    </View>

    <View style={styles.logo}>
      <Image source={logo} style={styles.logoImg} />
    </View>

    <View style={styles.mainContent}>
      <Image source={hand} style={styles.hand} />

      <View style={styles.buttons}>
        <LinearGradient colors={['#2265ac', '#034f9a']} style={styles.btnStart}>
          <TouchableOpacity>
            <Text style={styles.btnStartTxt}>Começar Cadastro</Text>
          </TouchableOpacity>
        </LinearGradient>

        <TouchableOpacity style={styles.btnDoubts} activeOpacity={0.6}>
          <Text style={styles.btnDoubtsTxt}>Dúvidas Frequentes</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ImageBackground>
);

export default Home;
