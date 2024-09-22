import mysql from 'mysql2/promise';
export default async function conectar() {
    if (global.poolConexões) {
        return await global.poolConexões.getConnection();
    }
    else {
        const connection = await mysql.createConnection({
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '',
            database: 'eventos_db',
            insecureAuth: true
        });
        connection.connect();
        return connection;
    }
}