import React, { useState, useContext } from 'react';
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
import { MaterialIcons as MdIcon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import styles from './styles';
import IPatient, { IAttachment } from '../../../typescript/IPatient';
import backgroundYellow from '../../images/backgroundYellow.png';
import logoPref from '../../images/logoPref.png';
import AttachmentField from './AttachmentField';
import masks from '../../utils/masks';
import PatientContext from '../../contexts/patientContext';
import catchHandler from '../../utils/catchHandler';

const SeniorsRegistration: React.FC = () => {
  const navigation = useNavigation();
  const { uploadProgress, createPatientCall } = useContext(PatientContext);

  const [patient, setPatient] = useState<IPatient>({} as IPatient);
  const [idDocFront, setIdDocFront] = useState<IAttachment>();
  const [idDocVerse, setIdDocVerse] = useState<IAttachment>();
  const [addressProof, setAddressProof] = useState<IAttachment>();
  const [photo, setPhoto] = useState<IAttachment>();
  const [loading, setLoading] = useState(false);

  const setAttachments = (
    field: number,
    uri: string,
    fileName: string,
    type: string
  ) => {
    switch (field) {
      case 0:
        setIdDocFront({ uri, name: String(fileName), type });
        break;
      case 1:
        setIdDocVerse({ uri, name: String(fileName), type });
        break;
      case 2:
        setAddressProof({ uri, name: String(fileName), type });
        break;
      case 3:
        setPhoto({ uri, name: String(fileName), type });
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
      const fileName = String(uri.split('/').pop());
      const type = `image/${uri.split('.').pop()}`;

      setAttachments(field, uri, fileName, type);
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
      const fileName = String(uri.split('/').pop());
      const type = `image/${uri.split('.').pop()}`;

      setAttachments(field, uri, fileName, type);
    }
  };

  const pickDocument = async (field: number) => {
    const result = await getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: false,
    });

    if (result.type === 'success') {
      const { uri } = result;
      const fileName = result.name;
      const type = 'application/pdf';

      setAttachments(field, uri, fileName, type);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const patientParsed = {
      ...patient,
      cpf: masks.numberMask(patient.cpf),
      susCard: `${patient.susCard && masks.numberMask(patient.susCard)}`,
      phone: masks.numberMask(patient.phone),
    };

    try {
      const msg = await createPatientCall(
        'idosos_acamados',
        patientParsed,
        idDocFront,
        idDocVerse,
        addressProof,
        photo
      );

      Alert.alert('', msg);
    } catch (err) {
      catchHandler(
        err,
        'Não foi possível efetuar o cadastro. Tente novamente ou contate o suporte.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Tratar opcionais e obrigatórios

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
                  value={patient.name}
                  onChange={e =>
                    setPatient({ ...patient, name: e.nativeEvent.text })
                  }
                />
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  CPF <Text style={styles.mandatory}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={patient.cpf}
                  onChange={e =>
                    setPatient({
                      ...patient,
                      cpf: masks.cpfMask(e.nativeEvent.text),
                    })
                  }
                />
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>Nº Cartão SUS</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={patient.susCard}
                  onChange={e =>
                    setPatient({
                      ...patient,
                      susCard: masks.susCardMask(e.nativeEvent.text),
                    })
                  }
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
                  value={patient.phone}
                  onChange={e =>
                    setPatient({
                      ...patient,
                      phone: masks.phoneMask(e.nativeEvent.text),
                    })
                  }
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
                  value={patient.street}
                  onChange={e =>
                    setPatient({ ...patient, street: e.nativeEvent.text })
                  }
                />
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  Número <Text style={styles.mandatory}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={patient.number}
                  onChange={e =>
                    setPatient({ ...patient, number: e.nativeEvent.text })
                  }
                />
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>Complemento</Text>
                <TextInput
                  style={styles.input}
                  value={patient.complement}
                  onChange={e =>
                    setPatient({ ...patient, complement: e.nativeEvent.text })
                  }
                />
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  Referência <Text style={styles.mandatory}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={patient.reference}
                  onChange={e =>
                    setPatient({ ...patient, reference: e.nativeEvent.text })
                  }
                />
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  Bairro <Text style={styles.mandatory}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={patient.neighborhood}
                  onChange={e =>
                    setPatient({ ...patient, neighborhood: e.nativeEvent.text })
                  }
                />
              </View>
            </View>

            <Text style={styles.fieldsCategory}>Anexos</Text>
            <View style={styles.fields}>
              <AttachmentField
                field={idDocFront}
                setField={setIdDocFront}
                fieldNumber={0}
                fieldName="Documento de Identidade - Frente"
                mandatory
                pickDocument={pickDocument}
                pickImageFromGallery={pickImageFromGallery}
                pickImageFromCamera={pickImageFromCamera}
              />

              <AttachmentField
                field={idDocVerse}
                setField={setIdDocVerse}
                fieldNumber={1}
                fieldName="Documento de Identidade - Verso"
                mandatory
                pickDocument={pickDocument}
                pickImageFromGallery={pickImageFromGallery}
                pickImageFromCamera={pickImageFromCamera}
              />

              <AttachmentField
                field={addressProof}
                setField={setAddressProof}
                fieldNumber={2}
                fieldName="Comprovante de Endereço"
                mandatory
                pickDocument={pickDocument}
                pickImageFromGallery={pickImageFromGallery}
                pickImageFromCamera={pickImageFromCamera}
              />

              <View style={styles.textInput}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() =>
                    Alert.alert(
                      'Adicionar Imagem...',
                      undefined,
                      [
                        {
                          text: 'Da Galeria',
                          style: 'default',
                          onPress: () => pickImageFromGallery(3),
                        },
                        {
                          text: 'Da Câmera',
                          style: 'default',
                          onPress: () => pickImageFromCamera(3),
                        },
                      ],
                      { cancelable: true }
                    )
                  }
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

            <TouchableOpacity activeOpacity={0.5} onPress={handleSubmit}>
              <LinearGradient
                colors={['#2265ac', '#034f9a']}
                style={styles.submit}
              >
                <Text style={styles.submitTxt}>Enviar</Text>
              </LinearGradient>
            </TouchableOpacity>

            {loading && (
              <AnimatedCircularProgress
                size={80}
                width={12}
                fill={uploadProgress}
                tintColor="#00e0ff"
                backgroundColor="#3d5875"
                style={{ alignSelf: 'center' }}
              />
            )}

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

export default SeniorsRegistration;
