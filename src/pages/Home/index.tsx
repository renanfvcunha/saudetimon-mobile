import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Platform,
} from 'react-native';
import ModalWeb from 'modal-react-native-web';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { openURL } from 'expo-linking';

import styles from './styles';
import logo from '../../images/logo.png';
import backgroundBlue from '../../images/backgroundBlue.png';
import hand from '../../images/hand.png';

const Home: React.FC = () => {
  const { navigate } = useNavigation();
  const [modalPhones, setModalPhones] = useState(false);

  return (
    <>
      <ImageBackground
        source={backgroundBlue}
        style={styles.container}
        imageStyle={{ resizeMode: 'repeat' }}
      >
        <View style={{ flex: 1 }}>
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
                onPress={() => navigate('Menu')}
              >
                <LinearGradient
                  colors={['#2265ac', '#034f9a']}
                  style={styles.btnStart}
                >
                  <Text style={styles.btnStartTxt}>Menu</Text>
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
                <Text style={styles.btnPhonesTxt}>Fale Conosco</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>

      {Platform.OS !== 'web' ? (
        <Modal
          animationType="slide"
          transparent
          visible={modalPhones}
          onRequestClose={() => setModalPhones(!modalPhones)}
        >
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Fale Conosco</Text>
              <TouchableOpacity
                style={styles.phone}
                activeOpacity={0.5}
                onPress={() => openURL('https://wa.me/559996474456')}
              >
                <FontAwesome name="whatsapp" size={24} color="#2dD366" />
                <Text style={[styles.phoneTxt, styles.bgSuccess]}>
                  Disk Saúde - COVID
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.phone}
                activeOpacity={0.5}
                onPress={() => openURL('https://wa.me/559988352919')}
              >
                <FontAwesome name="whatsapp" size={24} color="#25d366" />
                <Text style={[styles.phoneTxt, styles.bgInfo]}>Disk Saúde</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.phone}
                activeOpacity={0.5}
                onPress={() => openURL('https://wa.me/5586998159221')}
              >
                <FontAwesome name="whatsapp" size={24} color="#25d366" />
                <Text style={[styles.phoneTxt, styles.bgWarning]}>
                  Alô Psicólogo 1
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.phone}
                activeOpacity={0.5}
                onPress={() => openURL('https://wa.me/5586998163425')}
              >
                <FontAwesome name="whatsapp" size={24} color="#25d366" />
                <Text style={[styles.phoneTxt, styles.bgError]}>
                  Alô Psicólogo 2
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalPhones(!modalPhones)}
                style={styles.closeModal}
                activeOpacity={0.5}
              >
                <Text style={styles.closeModalTxt}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : (
        <ModalWeb
          animationType="slide"
          transparent
          visible={modalPhones}
          onRequestClose={() => setModalPhones(!modalPhones)}
        >
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Fale Conosco</Text>
              <TouchableOpacity
                style={styles.phone}
                activeOpacity={0.5}
                onPress={() => openURL('https://wa.me/559996474456')}
              >
                <FontAwesome name="whatsapp" size={24} color="#2dD366" />
                <Text style={[styles.phoneTxt, styles.bgSuccess]}>
                  Disk Saúde - COVID
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.phone}
                activeOpacity={0.5}
                onPress={() => openURL('https://wa.me/559988352919')}
              >
                <FontAwesome name="whatsapp" size={24} color="#25d366" />
                <Text style={[styles.phoneTxt, styles.bgInfo]}>Disk Saúde</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.phone}
                activeOpacity={0.5}
                onPress={() => openURL('https://wa.me/5586998159221')}
              >
                <FontAwesome name="whatsapp" size={24} color="#25d366" />
                <Text style={[styles.phoneTxt, styles.bgWarning]}>
                  Alô Psicólogo 1
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.phone}
                activeOpacity={0.5}
                onPress={() => openURL('https://wa.me/5586998163425')}
              >
                <FontAwesome name="whatsapp" size={24} color="#25d366" />
                <Text style={[styles.phoneTxt, styles.bgError]}>
                  Alô Psicólogo 2
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalPhones(!modalPhones)}
                style={styles.closeModal}
                activeOpacity={0.5}
              >
                <Text style={styles.closeModalTxt}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ModalWeb>
      )}

      <StatusBar style="light" />
    </>
  );
};

export default Home;
