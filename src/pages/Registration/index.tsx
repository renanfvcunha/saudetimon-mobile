import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import backgroundYellow from '../../images/backgroundYellow.png';
import logoPref from '../../images/logoPref.png';
import seniors from '../../images/seniors.png';
import comorbidity from '../../images/comorbidity.png';
import check from '../../images/check.png';
import vacLoc from '../../images/vacLoc.png';

const Registration: React.FC = () => {
  const { navigate, goBack } = useNavigation();

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={backgroundYellow} style={styles.container}>
          <View style={styles.logo}>
            <Image source={logoPref} style={styles.logoImg} />
          </View>

          <View style={styles.menu}>
            <View style={styles.pageTitle}>
              <Text style={styles.pageTitleText}>Cadastro</Text>
            </View>

            <View style={styles.items}>
              <TouchableOpacity
                style={styles.item}
                activeOpacity={0.5}
                onPress={() => navigate('BedRidden')}
              >
                <Image source={seniors} style={styles.itemImg} />
                <View style={styles.itemTexts}>
                  <Text style={styles.itemTextUpper}>Pacientes Acamados</Text>
                  <Text style={styles.itemTextLower}>
                    De acordo com a faixa etária da vacinação
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.item}
                activeOpacity={0.5}
                onPress={() => navigate('ComorbidityRegistration')}
              >
                <Image source={comorbidity} style={styles.itemImg} />
                <View style={styles.itemTexts}>
                  <Text style={styles.itemTextUpper}>Comorbidades</Text>
                  <Text style={styles.itemTextLower}>Nomes de Doenças</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.item}
                activeOpacity={0.5}
                onPress={() => navigate('StatusCheck')}
              >
                <Image source={check} style={styles.itemImg} />
                <View style={styles.itemTexts}>
                  <Text style={styles.itemTextUpper}>Checagem</Text>
                  <Text style={styles.itemTextLower}>
                    Verifique o status da sua solicitação
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.item}
                activeOpacity={0.5}
                onPress={() => navigate('VaccinationLocations')}
              >
                <Image source={vacLoc} style={styles.itemImg} />
                <View style={styles.itemTexts}>
                  <Text style={styles.itemTextUpper}>Locais de Vacinação</Text>
                  <Text style={styles.itemTextLower}>
                    Clique para visualizar o local no mapa
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.btnBack}
              activeOpacity={0.5}
              onPress={goBack}
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

export default Registration;
