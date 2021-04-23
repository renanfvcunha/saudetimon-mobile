import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import styles from './styles';
import logo from '../../images/logo.png';
import backgroundBlue from '../../images/backgroundBlue.png';
import hand from '../../images/hand.png';

const Home: React.FC = () => {
  const { navigate } = useNavigation();
  const [modalPhones, setModalPhones] = useState(false);

  return (
    <>
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
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigate('Registration')}
            >
              <LinearGradient
                colors={['#2265ac', '#034f9a']}
                style={styles.btnStart}
              >
                <Text style={styles.btnStartTxt}>Começar Cadastro</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnDoubts}
              activeOpacity={0.5}
              onPress={() => navigate('FrequentDoubts')}
            >
              <Text style={styles.btnDoubtsTxt}>Dúvidas Frequentes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnPhones}
              activeOpacity={0.5}
              onPress={() => setModalPhones(true)}
            >
              <Text style={styles.btnPhonesTxt}>Telefones</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      <Modal
        animationType="slide"
        transparent
        visible={modalPhones}
        onRequestClose={() => setModalPhones(!modalPhones)}
      >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Telefones</Text>
            <TouchableOpacity>
              <FontAwesome name="whatsapp" size={24} color="green" />
              <Text>Disk Saúde</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalPhones(!modalPhones)}
              style={styles.closeModal}
            >
              <Text>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <StatusBar style="light" />
    </>
  );
};

export default Home;
