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
import { MaterialIcons as MdIcon } from '@expo/vector-icons';

import styles from './styles';
import backgroundYellow from '../../images/backgroundYellow.png';
import logoPref from '../../images/logoPref.png';
import AttachmentField from './AttachmentField';

interface IAttachment {
  uri: string;
  name: string;
  type: string;
}

const SeniosRegistration: React.FC = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [susCard, setSusCard] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [reference, setReference] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [idDocFront, setIdDocFront] = useState<IAttachment>();
  const [idDocVerse, setIdDocVerse] = useState<IAttachment>();
  const [addressProof, setAddressProof] = useState<IAttachment>();
  const [photo, setPhoto] = useState<IAttachment>();

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
                  value={name}
                  onChange={e => setName(e.nativeEvent.text)}
                />
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  CPF <Text style={styles.mandatory}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={cpf}
                  onChange={e => setCpf(e.nativeEvent.text)}
                />
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>Nº Cartão SUS</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={susCard}
                  onChange={e => setSusCard(e.nativeEvent.text)}
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
                  value={phone}
                  onChange={e => setPhone(e.nativeEvent.text)}
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
                  value={street}
                  onChange={e => setStreet(e.nativeEvent.text)}
                />
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  Número <Text style={styles.mandatory}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={number}
                  onChange={e => setNumber(e.nativeEvent.text)}
                />
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>Complemento</Text>
                <TextInput
                  style={styles.input}
                  value={complement}
                  onChange={e => setComplement(e.nativeEvent.text)}
                />
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  Referência <Text style={styles.mandatory}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={reference}
                  onChange={e => setReference(e.nativeEvent.text)}
                />
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  Bairro <Text style={styles.mandatory}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={neighborhood}
                  onChange={e => setNeighborhood(e.nativeEvent.text)}
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
