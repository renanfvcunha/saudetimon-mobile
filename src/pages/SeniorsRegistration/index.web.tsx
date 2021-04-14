import React, { useState, createRef } from 'react';
import {
  ImageBackground,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import backgroundYellow from '../../images/backgroundYellow.png';
import logoPref from '../../images/logoPref.png';
import AttachmentField from './AttachmentField.web';
import masks from '../../utils/masks';

const SeniosRegistration: React.FC = () => {
  const navigation = useNavigation();
  const inputIdDocFrontRef = createRef<HTMLInputElement>();
  const inputIdDocVerseRef = createRef<HTMLInputElement>();
  const inputAddressProofRef = createRef<HTMLInputElement>();
  const inputPhotoRef = createRef<HTMLInputElement>();

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [susCard, setSusCard] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [reference, setReference] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [idDocFront, setIdDocFront] = useState<File>();
  const [idDocVerse, setIdDocVerse] = useState<File>();
  const [addressProof, setAddressProof] = useState<File>();
  const [photo, setPhoto] = useState<File>();

  return (
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
              onChange={e => setCpf(masks.cpfMask(e.nativeEvent.text))}
            />
          </View>

          <View style={styles.textInput}>
            <Text style={styles.inputName}>Nº Cartão SUS</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={susCard}
              onChange={e => setSusCard(masks.susCardMask(e.nativeEvent.text))}
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
              onChange={e => setPhone(masks.phoneMask(e.nativeEvent.text))}
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
              onChange={e => setNumber(masks.numberMask(e.nativeEvent.text))}
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
            ref={inputIdDocFrontRef}
            field={idDocFront}
            setField={setIdDocFront}
            refClick={() => inputIdDocFrontRef.current?.click()}
            fieldName="Documento de Identidade (Frente)"
            mandatory
          />

          <AttachmentField
            ref={inputIdDocVerseRef}
            field={idDocVerse}
            setField={setIdDocVerse}
            refClick={() => inputIdDocVerseRef.current?.click()}
            fieldName="Documento de Identidade (Verso)"
            mandatory
          />

          <AttachmentField
            ref={inputAddressProofRef}
            field={addressProof}
            setField={setAddressProof}
            refClick={() => inputAddressProofRef.current?.click()}
            fieldName="Comprovante de Endereço"
            mandatory
          />

          <AttachmentField
            ref={inputPhotoRef}
            field={photo}
            setField={setPhoto}
            refClick={() => inputPhotoRef.current?.click()}
            fieldName="Foto do(a) Paciente"
            mandatory
            filesAccepted="image/*"
          />
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
  );
};

export default SeniosRegistration;
