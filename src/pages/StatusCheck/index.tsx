import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';
import backgroundYellow from '../../images/backgroundYellow.png';
import logoPref from '../../images/logoPref.png';
import masks from '../../utils/masks';

const StatusCheck: React.FC = () => {
  const navigation = useNavigation();

  const [cpf, setCpf] = useState('');

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={backgroundYellow} style={styles.container}>
          <View style={styles.logo}>
            <Image source={logoPref} style={styles.logoImg} />
          </View>

          <View style={styles.menu}>
            <View style={styles.pageTitle}>
              <Text style={styles.pageTitleText}>Checagem</Text>
            </View>

            <View style={styles.items}>
              <View style={styles.textInput}>
                <TextInput
                  placeholder="CPF"
                  keyboardType="numeric"
                  style={styles.input}
                  value={cpf}
                  onChange={e => setCpf(masks.cpfMask(e.nativeEvent.text))}
                  returnKeyType="send"
                />
              </View>
            </View>

            <TouchableOpacity activeOpacity={0.5}>
              <LinearGradient
                colors={['#2265ac', '#034f9a']}
                style={styles.submit}
              >
                <Text style={styles.submitTxt}>Checar</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnBack}
              activeOpacity={0.5}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.btnBackText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#ffc816" />
    </>
  );
};

export default StatusCheck;
