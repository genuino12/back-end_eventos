import mysql from 'mysql2/promise';

export default async function conectar() {
    
    if (!global.poolConexões) {
        global.poolConexões = mysql.createPool({
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '',
            database: 'eventos_db',
            waitForConnections: true,
            connectionLimit: 10, 
            queueLimit: 0, 
            insecureAuth: true
        });
    }

    // Obtém uma conexão do pool
    const connection = await global.poolConexões.getConnection();

    return connection;
}
