import { ITheme } from 'app/shared/model/theme.model';

export interface IUser {
  id?: any;
  login?: string;
  firstName?: string;
  lastName?: string;
  description?: string;
  birthday?: Date;
  theme?: ITheme;
  email?: string;
  activated?: boolean;
  langKey?: string;
  authorities?: any[];
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
  password?: string;
}

export const defaultValue: Readonly<IUser> = {
  id: '',
  login: '',
  firstName: '',
  lastName: '',
  description: '',
  birthday: null,
  theme: null,
  email: '',
  activated: false,
  langKey: '',
  authorities: [],
  createdBy: '',
  createdDate: null,
  lastModifiedBy: '',
  lastModifiedDate: null,
  password: ''
};
