import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { openURL } from 'expo-linking';

import styles from './styles';
import backgroundYellow from '../../images/backgroundYellow.png';
import logoPref from '../../images/logoPref.png';

const VaccinationLocations: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <ImageBackground
        source={backgroundYellow}
        style={styles.container}
        imageStyle={{ resizeMode: 'repeat' }}
      >
        <View style={styles.logo}>
          <Image source={logoPref} style={styles.logoImg} />
        </View>

        <View style={styles.menu}>
          <View style={styles.pageTitle}>
            <Text style={styles.pageTitleText}>Locais de Vacinação</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.items}>
              <TouchableOpacity
                style={styles.item}
                activeOpacity={0.5}
                onPress={() =>
                  openURL('https://maps.app.goo.gl/j9jpJtnKJkoaihVR9')
                }
              >
                <Image
                  source={{
                    uri:
                      'https://lh5.googleusercontent.com/p/AF1QipNxRrauJHriyEjZBnLQEjyAF90ot5BP5TLRP8vW=w426-h240-k-no',
                  }}
                  style={styles.itemImg}
                />
                <View style={styles.itemTexts}>
                  <Text style={styles.itemTextUpper}>
                    Ginásio Francisco Carlos Jansen
                  </Text>
                  <Text style={styles.itemTextLower}>Drives-Thru</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.item}
                activeOpacity={0.5}
                onPress={() =>
                  openURL('https://maps.app.goo.gl/GYgwoBA7iftEYYxS6')
                }
              >
                <Image
                  source={{
                    uri:
                      'https://lh5.googleusercontent.com/p/AF1QipMyudKnN5aiYHhW8DjzwXhdP8o7izXvQJVawn09=w408-h250-k-no',
                  }}
                  style={styles.itemImg}
                />
                <View style={styles.itemTexts}>
                  <Text style={styles.itemTextUpper}>Fundação Cidadania</Text>
                  <Text style={styles.itemTextLower}>Ponto Fixo</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.item}
                activeOpacity={0.5}
                onPress={() =>
                  openURL('https://maps.app.goo.gl/YsLHNvqTLhPRz3Fs8')
                }
              >
                <Image
                  source={{
                    uri:
                      'https://lh5.googleusercontent.com/p/AF1QipNyimW4rG5MZEOyAszfkNtrSn2IUlRGixvx87rx=w478-h240-k-no',
                  }}
                  style={styles.itemImg}
                />
                <View style={styles.itemTexts}>
                  <Text style={styles.itemTextUpper}>Cocais Shopping</Text>
                  <Text style={styles.itemTextLower}>Drives-Thru</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.item}
                activeOpacity={0.5}
                onPress={() =>
                  openURL('https://maps.app.goo.gl/JivC1RbhFvzaiwRq7')
                }
              >
                <Image
                  source={{
                    uri:
                      'https://lh5.googleusercontent.com/p/AF1QipN0f6vDdaka-j9KCGUepnQ3BZTGDCuEjoYL5G3o=w408-h306-k-no',
                  }}
                  style={styles.itemImg}
                />
                <View style={styles.itemTexts}>
                  <Text style={styles.itemTextUpper}>
                    Projeto Educativo Mãos Dadas
                  </Text>
                  <Text style={styles.itemTextLower}>Ponto Fixo</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <TouchableOpacity
            style={styles.btnBack}
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.btnBackText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <StatusBar style="light" backgroundColor="#ffc816" />
    </>
  );
};

export default VaccinationLocations;
