import mysql from 'mysql2/promise';

export default async function conectar() {
    if (global.poolConexões) {
        return await global.poolConexões.getConnection();
    } else {
    
        global.poolConexões = mysql.createPool({
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '',
            database: 'eventos_db',
            insecureAuth: true,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        
        return await global.poolConexões.getConnection();
    }
}
