import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  ImageBackground,
  Image,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  launchCameraAsync,
  MediaTypeOptions,
  launchImageLibraryAsync,
} from 'expo-image-picker';
import { getDocumentAsync } from 'expo-document-picker';
import { MaterialIcons as MdIcon, AntDesign } from '@expo/vector-icons';

import styles from './styles';
import backgroundYellow from '../../images/backgroundYellow.png';
import logoPref from '../../images/logoPref.png';

interface IAttachment {
  uri: string;
  name: string;
  type: string;
}

const SeniosRegistration: React.FC = () => {
  const navigation = useNavigation();

  const [idDocFront, setIdDocFront] = useState<IAttachment>();
  const [idDocVerse, setIdDocVerse] = useState<IAttachment>();
  const [addressProof, setAddressProof] = useState<IAttachment>();
  const [photo, setPhoto] = useState<IAttachment>();

  const setAttachments = (
    field: number,
    uri: string,
    name: string,
    type: string
  ) => {
    switch (field) {
      case 0:
        setIdDocFront({ uri, name: String(name), type });
        break;
      case 1:
        setIdDocVerse({ uri, name: String(name), type });
        break;
      case 2:
        setAddressProof({ uri, name: String(name), type });
        break;
      case 3:
        setPhoto({ uri, name: String(name), type });
        break;
      default:
        break;
    }
  };

  const pickImageFromCamera = async (field: number) => {
    const result = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      const { uri } = result;
      const name = String(uri.split('/').pop());
      const type = `image/${uri.split('.').pop()}`;

      setAttachments(field, uri, name, type);
    }
  };

  const pickImageFromGallery = async (field: number) => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      const { uri } = result;
      const name = String(uri.split('/').pop());
      const type = `image/${uri.split('.').pop()}`;

      setAttachments(field, uri, name, type);
    }
  };

  const pickDocument = async (field: number) => {
    const result = await getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: false,
    });

    if (result.type === 'success') {
      const { uri } = result;
      const { name } = result;
      const type = 'application/pdf';

      setAttachments(field, uri, name, type);
    }
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={backgroundYellow} style={styles.container}>
          <View style={styles.logo}>
            <Image source={logoPref} style={styles.logoImg} />
          </View>

          <View style={styles.menu}>
            <View style={styles.pageTitle}>
              <Text style={styles.pageTitleText}>Idosos Acamados</Text>
            </View>

            <Text style={styles.fieldsCategory}>Dados Gerais</Text>
            <View style={styles.fields}>
              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  Nome Completo <Text style={styles.mandatory}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  /* value={formValues[i].value}
                onChange={e => handleChangeValue(i, e)} */
                />
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  CPF <Text style={styles.mandatory}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  /* value={formValues[i].value}
                onChange={e => handleChangeValue(i, e)} */
                />
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>Nº Cartão SUS</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  /* value={formValues[i].value}
                onChange={e => handleChangeValue(i, e)} */
                />
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  Telefone para Contato <Text style={styles.mandatory}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="(00) 00000-0000"
                  /* value={formValues[i].value}
                onChange={e => handleChangeValue(i, e)} */
                />
              </View>
            </View>

            <Text style={styles.fieldsCategory}>Endereço</Text>
            <View style={styles.fields}>
              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  Rua <Text style={styles.mandatory}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  /* value={formValues[i].value}
                onChange={e => handleChangeValue(i, e)} */
                />
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  Número <Text style={styles.mandatory}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  /* value={formValues[i].value}
                onChange={e => handleChangeValue(i, e)} */
                />
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>Complemento</Text>
                <TextInput
                  style={styles.input}
                  /* value={formValues[i].value}
                onChange={e => handleChangeValue(i, e)} */
                />
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  Referência <Text style={styles.mandatory}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  /* value={formValues[i].value}
                onChange={e => handleChangeValue(i, e)} */
                />
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  Bairro <Text style={styles.mandatory}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  /* value={formValues[i].value}
                onChange={e => handleChangeValue(i, e)} */
                />
              </View>
            </View>

            <Text style={styles.fieldsCategory}>Anexos</Text>
            <View style={styles.fields}>
              <View style={styles.textInput}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() =>
                    Alert.alert(
                      'Tipo de Arquivo',
                      undefined,
                      [
                        {
                          text: 'Documento (PDF)',
                          style: 'default',
                          onPress: () => pickDocument(0),
                        },
                        {
                          text: 'Imagem',
                          style: 'default',
                          onPress: () =>
                            Alert.alert(
                              'Adicionar Imagem...',
                              undefined,
                              [
                                {
                                  text: 'Da Galeria',
                                  style: 'default',
                                  onPress: () => pickImageFromGallery(0),
                                },
                                {
                                  text: 'Da Câmera',
                                  style: 'default',
                                  onPress: () => pickImageFromCamera(0),
                                },
                              ],
                              { cancelable: true }
                            ),
                        },
                      ],
                      { cancelable: true }
                    )
                  }
                >
                  <Text style={styles.inputName}>
                    Documento de Identidade - Frente{' '}
                    <Text style={styles.mandatory}>*</Text>
                  </Text>
                </TouchableOpacity>
                {idDocFront && idDocFront.type === 'application/pdf' && (
                  <View style={styles.pdf}>
                    <View style={{ top: -10 }}>
                      <TouchableOpacity
                        onPress={() =>
                          Alert.alert(
                            'Deseja apagar este arquivo?',
                            undefined,
                            [
                              {
                                style: 'cancel',
                                text: 'Cancelar',
                              },
                              {
                                style: 'destructive',
                                text: 'Apagar',
                                onPress: () => setIdDocFront(undefined),
                              },
                            ]
                          )
                        }
                      >
                        <MdIcon name="cancel" color="#f44336" size={16} />
                      </TouchableOpacity>
                    </View>
                    <AntDesign name="pdffile1" size={24} color="#000" />
                    <Text style={styles.pdfName}>{idDocFront.name}</Text>
                  </View>
                )}
                {idDocFront && idDocFront.type !== 'application/pdf' && (
                  <View style={styles.img}>
                    <Image
                      source={{ uri: idDocFront.uri }}
                      style={styles.imgSelected}
                    />
                    <View style={{ position: 'absolute', right: 0 }}>
                      <TouchableOpacity
                        onPress={() =>
                          Alert.alert('Deseja apagar esta imagem?', undefined, [
                            {
                              style: 'cancel',
                              text: 'Cancelar',
                            },
                            {
                              style: 'destructive',
                              text: 'Apagar',
                              onPress: () => setIdDocFront(undefined),
                            },
                          ])
                        }
                      >
                        <MdIcon name="cancel" color="#f44336" size={16} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>

              <View style={styles.textInput}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() =>
                    Alert.alert(
                      'Tipo de Arquivo',
                      undefined,
                      [
                        {
                          text: 'Documento (PDF)',
                          style: 'default',
                          onPress: () => pickDocument(1),
                        },
                        {
                          text: 'Imagem',
                          style: 'default',
                          onPress: () =>
                            Alert.alert(
                              'Adicionar Imagem...',
                              undefined,
                              [
                                {
                                  text: 'Da Galeria',
                                  style: 'default',
                                  onPress: () => pickImageFromGallery(1),
                                },
                                {
                                  text: 'Da Câmera',
                                  style: 'default',
                                  onPress: () => pickImageFromCamera(1),
                                },
                              ],
                              { cancelable: true }
                            ),
                        },
                      ],
                      { cancelable: true }
                    )
                  }
                >
                  <Text style={styles.inputName}>
                    Documento de Identidade - Verso{' '}
                    <Text style={styles.mandatory}>*</Text>
                  </Text>
                </TouchableOpacity>
                {idDocVerse && idDocVerse.type === 'application/pdf' && (
                  <View style={styles.pdf}>
                    <View style={{ top: -10 }}>
                      <TouchableOpacity
                        onPress={() =>
                          Alert.alert(
                            'Deseja apagar este arquivo?',
                            undefined,
                            [
                              {
                                style: 'cancel',
                                text: 'Cancelar',
                              },
                              {
                                style: 'destructive',
                                text: 'Apagar',
                                onPress: () => setIdDocVerse(undefined),
                              },
                            ]
                          )
                        }
                      >
                        <MdIcon name="cancel" color="#f44336" size={16} />
                      </TouchableOpacity>
                    </View>
                    <AntDesign name="pdffile1" size={24} color="#000" />
                    <Text style={styles.pdfName}>{idDocVerse.name}</Text>
                  </View>
                )}
                {idDocVerse && idDocVerse.type !== 'application/pdf' && (
                  <View style={styles.img}>
                    <Image
                      source={{ uri: idDocVerse.uri }}
                      style={styles.imgSelected}
                    />
                    <View style={{ position: 'absolute', right: 0 }}>
                      <TouchableOpacity
                        onPress={() =>
                          Alert.alert('Deseja apagar esta imagem?', undefined, [
                            {
                              style: 'cancel',
                              text: 'Cancelar',
                            },
                            {
                              style: 'destructive',
                              text: 'Apagar',
                              onPress: () => setIdDocVerse(undefined),
                            },
                          ])
                        }
                      >
                        <MdIcon name="cancel" color="#f44336" size={16} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>

              <View style={styles.textInput}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() =>
                    Alert.alert(
                      'Tipo de Arquivo',
                      undefined,
                      [
                        {
                          text: 'Documento (PDF)',
                          style: 'default',
                          onPress: () => pickDocument(2),
                        },
                        {
                          text: 'Imagem',
                          style: 'default',
                          onPress: () =>
                            Alert.alert(
                              'Adicionar Imagem...',
                              undefined,
                              [
                                {
                                  text: 'Da Galeria',
                                  style: 'default',
                                  onPress: () => pickImageFromGallery(2),
                                },
                                {
                                  text: 'Da Câmera',
                                  style: 'default',
                                  onPress: () => pickImageFromCamera(2),
                                },
                              ],
                              { cancelable: true }
                            ),
                        },
                      ],
                      { cancelable: true }
                    )
                  }
                >
                  <Text style={styles.inputName}>
                    Comprovante de Endereço{' '}
                    <Text style={styles.mandatory}>*</Text>
                  </Text>
                </TouchableOpacity>
                {addressProof && addressProof.type === 'application/pdf' && (
                  <View style={styles.pdf}>
                    <View style={{ top: -10 }}>
                      <TouchableOpacity
                        onPress={() =>
                          Alert.alert(
                            'Deseja apagar este arquivo?',
                            undefined,
                            [
                              {
                                style: 'cancel',
                                text: 'Cancelar',
                              },
                              {
                                style: 'destructive',
                                text: 'Apagar',
                                onPress: () => setAddressProof(undefined),
                              },
                            ]
                          )
                        }
                      >
                        <MdIcon name="cancel" color="#f44336" size={16} />
                      </TouchableOpacity>
                    </View>
                    <AntDesign name="pdffile1" size={24} color="#000" />
                    <Text style={styles.pdfName}>{addressProof.name}</Text>
                  </View>
                )}
                {addressProof && addressProof.type !== 'application/pdf' && (
                  <View style={styles.img}>
                    <Image
                      source={{ uri: addressProof.uri }}
                      style={styles.imgSelected}
                    />
                    <View style={{ position: 'absolute', right: 0 }}>
                      <TouchableOpacity
                        onPress={() =>
                          Alert.alert('Deseja apagar esta imagem?', undefined, [
                            {
                              style: 'cancel',
                              text: 'Cancelar',
                            },
                            {
                              style: 'destructive',
                              text: 'Apagar',
                              onPress: () => setAddressProof(undefined),
                            },
                          ])
                        }
                      >
                        <MdIcon name="cancel" color="#f44336" size={16} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>

              <View style={styles.textInput}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => pickImageFromCamera(3)}
                >
                  <Text style={styles.inputName}>
                    Foto do(a) Paciente <Text style={styles.mandatory}>*</Text>
                  </Text>
                </TouchableOpacity>
                {photo && (
                  <View style={styles.img}>
                    <Image
                      source={{ uri: photo.uri }}
                      style={styles.imgSelected}
                    />
                    <View style={{ position: 'absolute', right: 0 }}>
                      <TouchableOpacity
                        onPress={() =>
                          Alert.alert('Deseja apagar esta imagem?', undefined, [
                            {
                              style: 'cancel',
                              text: 'Cancelar',
                            },
                            {
                              style: 'destructive',
                              text: 'Apagar',
                              onPress: () => setPhoto(undefined),
                            },
                          ])
                        }
                      >
                        <MdIcon name="cancel" color="#f44336" size={16} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>

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

export default SeniosRegistration;
