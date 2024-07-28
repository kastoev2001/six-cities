import convict from 'convict';
import validator from 'convict-format-with-validator';

export type RestSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: string;
}

convict.addFormats(validator);

export const configRestSchama = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: null
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null,
  },
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: null,
  },
  DB_USER: {
    doc: '',
    format: String,
    env: 'DB_USER',
    default: null,
  },
  DB_PASSWORD: {
    doc: '',
    format: String,
    env: 'DB_PASSWORD',
    default: null,
  },
  DB_NAME: {
    doc: '',
    format: String,
    env: 'DB_NAME',
    default: null,
  },
  DB_PORT: {
    doc: '',
    format: 'port',
    env: 'DB_PORT',
    default: '27017',
  }
});
