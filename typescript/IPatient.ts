export interface IAttachment {
  uri: string;
  name: string;
  type: string;
}

export default interface IPatient {
  name: string;
  cpf: string;
  susCard?: string;
  phone: string;
  street: string;
  number: string;
  complement?: string;
  reference: string;
  neighborhood: string;
}
