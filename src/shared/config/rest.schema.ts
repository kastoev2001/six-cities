import convict from 'convict';
import validator from 'convict-format-with-validator';

export type RestSchema = {
    PORT: number;
    SALT: string;
    DB_HOST: string;
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
    }
});
