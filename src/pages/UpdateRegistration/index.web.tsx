import React, { useState, useContext, useEffect, createRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  ImageBackground,
  Image,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import PropTypes from 'prop-types';
import { Picker } from '@react-native-picker/picker';

import styles from './styles';
import IPatient from '../../../typescript/IPatient';
import backgroundYellow from '../../images/backgroundYellow.png';
import logoPref from '../../images/logoPref.png';
import AttachmentField from '../../components/AttachmentField/index.web';
import masks from '../../utils/masks';
import PatientContext from '../../contexts/patientContext';
import catchHandler from '../../utils/catchHandler';
import IComorbidity from '../../../typescript/IComorbidity';
import swAlert from '../../utils/alert';

interface Params {
  cpf: string;
  group: string;
}

interface Props {
  route: RouteProp<{ params: Params }, 'params'>;
}

const UpdateRegistration: React.FC<Props> = ({ route }) => {
  const { goBack, reset } = useNavigation();
  const { cpf, group } = route.params;
  const {
    getComorbiditiesCall,
    getPatientCall,
    updatePatientCall,
    uploadProgress,
  } = useContext(PatientContext);
  const inputIdDocFrontRef = createRef<HTMLInputElement>();
  const inputIdDocVerseRef = createRef<HTMLInputElement>();
  const inputAddressProofRef = createRef<HTMLInputElement>();
  const inputPhotoRef = createRef<HTMLInputElement>();
  const inputMedicalReportRef = createRef<HTMLInputElement>();
  const inputMedicalAuthorizationRef = createRef<HTMLInputElement>();
  const inputMedicalPrescriptionRef = createRef<HTMLInputElement>();

  const [patient, setPatient] = useState<IPatient>({} as IPatient);
  const [idDocFront, setIdDocFront] = useState<File>();
  const [idDocVerse, setIdDocVerse] = useState<File>();
  const [addressProof, setAddressProof] = useState<File>();
  const [photo, setPhoto] = useState<File>();
  const [medicalReport, setMedicalReport] = useState<File>();
  const [medicalAuthorization, setMedicalAuthorization] = useState<File>();
  const [medicalPrescription, setMedicalPrescription] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [editableFields, setEditableFields] = useState({
    name: false,
    cpf: false,
    susCard: false,
    phone: false,
    street: false,
    number: false,
    complement: false,
    reference: false,
    neighborhood: false,
  });
  const [comorbidities, setComorbidities] = useState<IComorbidity[]>();
  const [selectedComorbidity, setSelectedComorbidity] = useState('');

  const handleSubmit = async () => {
    setLoading(true);

    const patientParsed = {
      ...patient,
      cpf: masks.numberMask(patient.cpf),
      susCard: patient.susCard ? masks.numberMask(patient.susCard) : undefined,
      phone: masks.numberMask(patient.phone),
    };

    try {
      if (patient.id) {
        const msg = await updatePatientCall(
          patient.id.toString(),
          patientParsed,
          idDocFront,
          idDocVerse,
          addressProof,
          photo,
          selectedComorbidity,
          medicalReport,
          medicalAuthorization,
          medicalPrescription
        );

        swAlert('success', '', msg);
        reset({
          index: 0,
          routes: [
            {
              name: 'Home',
            },
          ],
        });
      }
    } catch (err) {
      catchHandler(
        err,
        'Não foi possível efetuar o cadastro. Tente novamente ou contate o suporte.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getPatient = async () => {
      try {
        const data = await getPatientCall(cpf);

        setPatient({
          ...data,
          cpf: masks.cpfMask(data.cpf),
          susCard: data.susCard ? masks.susCardMask(data.susCard) : undefined,
          phone: masks.phoneMask(data.phone),
          number: data.number.toString(),
        });
      } catch (err) {
        catchHandler(
          err,
          'Não foi possível listar os dados cadastrados. Tente novamente ou contate o suporte.'
        );
      }
    };

    getPatient();
  }, [cpf, getPatientCall]);

  useEffect(() => {
    const getComorbidities = async () => {
      try {
        const data = await getComorbiditiesCall();

        setComorbidities(data);
        setSelectedComorbidity(
          patient.idComorbidity
            ? patient.idComorbidity.toString()
            : data[0].id.toString()
        );
      } catch (err) {
        catchHandler(
          err,
          'Não foi possível listar as comorbidades. Tente novamente ou contate o suporte.'
        );
      }
    };

    if (patient.idComorbidity && group === 'comorbidades') {
      getComorbidities();
    }
  }, [getComorbiditiesCall, group, patient.idComorbidity]);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={backgroundYellow} style={styles.container}>
          <View style={styles.logo}>
            <Image source={logoPref} style={styles.logoImg} />
          </View>

          <View style={styles.menu}>
            <View style={styles.pageTitle}>
              <Text style={styles.pageTitleText}>Atualizar Cadastro</Text>
            </View>

            {group === 'comorbidades' && (
              <>
                <Text style={styles.fieldsCategory}>Comorbidade</Text>
                <View style={styles.fields}>
                  <Picker
                    selectedValue={selectedComorbidity}
                    onValueChange={itemValue =>
                      setSelectedComorbidity(itemValue as string)
                    }
                    style={{ width: '100%' }}
                  >
                    {comorbidities &&
                      comorbidities.map(comorbidity => (
                        <Picker.Item
                          key={comorbidity.id}
                          label={comorbidity.comorbidity}
                          value={comorbidity.id.toString()}
                        />
                      ))}
                  </Picker>
                  <Text style={styles.helperText}>
                    Se sua comorbidade não está na lista, então infelizmente
                    você não está elegível ao cadastro.
                  </Text>
                </View>
              </>
            )}

            <Text style={styles.fieldsCategory}>Dados Gerais</Text>
            <View style={styles.fields}>
              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  Nome Completo <Text style={styles.mandatory}>*</Text>
                </Text>
                <View>
                  <TextInput
                    style={styles.input}
                    value={patient.name}
                    onChange={e =>
                      setPatient({ ...patient, name: e.nativeEvent.text })
                    }
                    editable={editableFields.name}
                  />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.editButton}
                    onPress={() =>
                      setEditableFields({ ...editableFields, name: true })
                    }
                  >
                    <Feather name="edit" size={18} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  CPF <Text style={styles.mandatory}>*</Text>
                </Text>
                <View>
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
                    editable={editableFields.cpf}
                  />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.editButton}
                    onPress={() =>
                      setEditableFields({ ...editableFields, cpf: true })
                    }
                  >
                    <Feather name="edit" size={18} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>Nº Cartão SUS</Text>
                <View>
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
                    editable={editableFields.susCard}
                  />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.editButton}
                    onPress={() =>
                      setEditableFields({ ...editableFields, susCard: true })
                    }
                  >
                    <Feather name="edit" size={18} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  Telefone para Contato <Text style={styles.mandatory}>*</Text>
                </Text>
                <View>
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
                    editable={editableFields.phone}
                  />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.editButton}
                    onPress={() =>
                      setEditableFields({ ...editableFields, phone: true })
                    }
                  >
                    <Feather name="edit" size={18} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <Text style={styles.fieldsCategory}>Endereço</Text>
            <View style={styles.fields}>
              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  Rua <Text style={styles.mandatory}>*</Text>
                </Text>
                <View>
                  <TextInput
                    style={styles.input}
                    value={patient.street}
                    onChange={e =>
                      setPatient({ ...patient, street: e.nativeEvent.text })
                    }
                    editable={editableFields.street}
                  />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.editButton}
                    onPress={() =>
                      setEditableFields({ ...editableFields, street: true })
                    }
                  >
                    <Feather name="edit" size={18} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  Número <Text style={styles.mandatory}>*</Text>
                </Text>
                <View>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={patient.number as string}
                    onChange={e =>
                      setPatient({ ...patient, number: e.nativeEvent.text })
                    }
                    editable={editableFields.number}
                  />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.editButton}
                    onPress={() =>
                      setEditableFields({ ...editableFields, number: true })
                    }
                  >
                    <Feather name="edit" size={18} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>Complemento</Text>
                <View>
                  <TextInput
                    style={styles.input}
                    value={patient.complement}
                    onChange={e =>
                      setPatient({ ...patient, complement: e.nativeEvent.text })
                    }
                    editable={editableFields.complement}
                  />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.editButton}
                    onPress={() =>
                      setEditableFields({ ...editableFields, complement: true })
                    }
                  >
                    <Feather name="edit" size={18} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  Referência <Text style={styles.mandatory}>*</Text>
                </Text>
                <View>
                  <TextInput
                    style={styles.input}
                    value={patient.reference}
                    onChange={e =>
                      setPatient({ ...patient, reference: e.nativeEvent.text })
                    }
                    editable={editableFields.reference}
                  />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.editButton}
                    onPress={() =>
                      setEditableFields({ ...editableFields, reference: true })
                    }
                  >
                    <Feather name="edit" size={18} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  Bairro <Text style={styles.mandatory}>*</Text>
                </Text>
                <View>
                  <TextInput
                    style={styles.input}
                    value={patient.neighborhood}
                    onChange={e =>
                      setPatient({
                        ...patient,
                        neighborhood: e.nativeEvent.text,
                      })
                    }
                    editable={editableFields.neighborhood}
                  />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.editButton}
                    onPress={() =>
                      setEditableFields({
                        ...editableFields,
                        neighborhood: true,
                      })
                    }
                  >
                    <Feather name="edit" size={18} color="#000" />
                  </TouchableOpacity>
                </View>
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
              />

              <AttachmentField
                ref={inputIdDocVerseRef}
                field={idDocVerse}
                setField={setIdDocVerse}
                refClick={() => inputIdDocVerseRef.current?.click()}
                fieldName="Documento de Identidade (Verso)"
              />

              <AttachmentField
                ref={inputAddressProofRef}
                field={addressProof}
                setField={setAddressProof}
                refClick={() => inputAddressProofRef.current?.click()}
                fieldName="Comprovante de Endereço"
              />

              <AttachmentField
                ref={inputPhotoRef}
                field={photo}
                setField={setPhoto}
                refClick={() => inputPhotoRef.current?.click()}
                fieldName="Foto do(a) Paciente"
                filesAccepted="image/*"
              />

              {['paciente_oncologico', 'paciente_renal', 'comorbidades'].find(
                cmb => cmb === group
              ) && (
                <>
                  <AttachmentField
                    ref={inputMedicalReportRef}
                    field={medicalReport}
                    setField={setMedicalReport}
                    refClick={() => inputMedicalReportRef.current?.click()}
                    fieldName="Laudo Médico"
                  />

                  {group !== 'comorbidades' && (
                    <AttachmentField
                      ref={inputMedicalAuthorizationRef}
                      field={medicalAuthorization}
                      setField={setMedicalAuthorization}
                      refClick={() =>
                        inputMedicalAuthorizationRef.current?.click()
                      }
                      fieldName="Autorização Médica"
                    />
                  )}

                  {group === 'comorbidades' && (
                    <AttachmentField
                      ref={inputMedicalPrescriptionRef}
                      field={medicalPrescription}
                      setField={setMedicalPrescription}
                      refClick={() =>
                        inputMedicalPrescriptionRef.current?.click()
                      }
                      fieldName="Prescrição Médica"
                    />
                  )}
                </>
              )}
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

UpdateRegistration.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  route: PropTypes.any.isRequired,
};

export default UpdateRegistration;