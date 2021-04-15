import React, { useState, createContext } from 'react';
import { AxiosResponse } from 'axios';
import PropTypes from 'prop-types';

import api from '../services/api';
import IPatient, { IAttachment } from '../../typescript/IPatient';

interface PatientContextData {
  uploadProgress: number;
  createPatientCall: (
    groupSlug: string,
    patient: IPatient,
    idDocFront?: IAttachment | File,
    idDocVerse?: IAttachment | File,
    addressProof?: IAttachment | File,
    photo?: IAttachment | File
  ) => Promise<string>;
}

const PatientContext = createContext<PatientContextData>(
  {} as PatientContextData
);

export const PatientProvider: React.FC = ({ children }) => {
  const [uploadProgress, setUploadProgress] = useState(0);

  const createPatientCall = async (
    groupSlug: string,
    patient: IPatient,
    idDocFront?: IAttachment | File,
    idDocVerse?: IAttachment | File,
    addressProof?: IAttachment | File,
    photo?: IAttachment | File
  ) => {
    setUploadProgress(0);

    const data = new FormData();
    data.append('groupSlug', groupSlug);
    data.append('name', patient.name);
    data.append('cpf', patient.cpf);
    if (patient.susCard) {
      data.append('susCard', patient.susCard);
    }
    data.append('phone', patient.phone);
    data.append('street', patient.street);
    data.append('number', patient.number);
    if (patient.complement) {
      data.append('complement', patient.complement);
    }
    data.append('reference', patient.reference);
    data.append('neighborhood', patient.neighborhood);
    if (idDocFront && idDocVerse && addressProof && photo) {
      data.append('idDocFront', idDocFront as Blob);
      data.append('idDocVerse', idDocVerse as Blob);
      data.append('addressProof', addressProof as Blob);
      data.append('photo', photo as Blob);
    }

    const response: AxiosResponse<{ msg: string }> = await api.post(
      '/patients',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e: ProgressEvent) => {
          setUploadProgress((e.loaded * 100) / e.total);
        },
      }
    );

    return response.data.msg;
  };

  return (
    <PatientContext.Provider value={{ uploadProgress, createPatientCall }}>
      {children}
    </PatientContext.Provider>
  );
};

PatientProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PatientContext;
