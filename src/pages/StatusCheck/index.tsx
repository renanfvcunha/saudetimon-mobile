import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import styles from './styles';
import backgroundYellow from '../../images/backgroundYellow.png';
import logoPref from '../../images/logoPref.png';
import masks from '../../utils/masks';
import IStatus from '../../../typescript/IStatus';
import PatientContext from '../../contexts/patientContext';
import catchHandler from '../../utils/catchHandler';

const StatusCheck: React.FC = () => {
  const { goBack } = useNavigation();
  const { getStatusCall } = useContext(PatientContext);

  const [cpf, setCpf] = useState('');
  const [status, setStatus] = useState<IStatus>();
  const [loading, setLoading] = useState(false);

  const getStatus = async () => {
    try {
      setLoading(true);

      const data = await getStatusCall(masks.numberMask(cpf));

      setStatus(data);
    } catch (err) {
      catchHandler(
        err,
        'Não foi possível checar o status. Tente novamente ou contate o suporte.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
                onSubmitEditing={getStatus}
              />
              <TouchableOpacity
                activeOpacity={0.5}
                style={{ position: 'absolute', right: 0 }}
                onPress={getStatus}
              >
                <AntDesign name="checkcircleo" size={20} color="green" />
              </TouchableOpacity>
            </View>
          </View>

          {loading && <ActivityIndicator color="#034f9a" size={32} />}

          {status && (
            <>
              <Text style={styles.status}>Status:</Text>
              <View style={styles.statusContainer}>
                <View
                  style={[
                    styles.statusBackground,
                    status.patient.patientStatus.status.id === 1 &&
                      styles.statusAnalysis,
                    status.patient.patientStatus.status.id === 2 &&
                      styles.statusApproved,
                    status.patient.patientStatus.status.id === 3 &&
                      styles.statusDenied,
                  ]}
                >
                  <Text style={styles.statusText}>
                    {status.patient.patientStatus.status.status}
                  </Text>
                  <Text style={styles.statusHelperText}>
                    {status.patient.patientStatus.status.message}
                  </Text>
                </View>
              </View>
              {status.position && (
                <Text style={styles.statusPosition}>
                  Posição na fila: {status.position}
                </Text>
              )}
              {status.patient.patientStatus.message && (
                <>
                  <Text style={styles.statusPosition}>
                    Motivo:{`\n${status.patient.patientStatus.message}`}
                  </Text>
                </>
              )}
            </>
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
      <StatusBar style="light" backgroundColor="#ffc816" />
    </>
  );
};

export default StatusCheck;
