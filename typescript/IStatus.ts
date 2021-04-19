export default interface IStatus {
  patient: {
    id: number;
    cpf: string;
    group: {
      id: number;
      group: string;
    };
    patientStatus: {
      message: string | null;
      status: {
        id: number;
        status: string;
        message: string;
      };
    };
  };
  position?: number;
  approveds?: number;
}