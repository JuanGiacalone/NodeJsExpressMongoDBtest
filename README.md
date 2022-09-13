# NodeJsExpressMongoDBtest

API Rest con MongoDB - Mongoose y Express / Backend para sitio web turistico de faros.

## Endpoints
- *GET* /faros/all -> Devuelve todos los faros
- *GET* /faros/$idFaro -> Devuelve el faro segun idFaro
- *POST* /faros/add -> Crea un faro, usar el archivo <FarosJson.json>
- *POST* /faros/addComment/$idFaro -> Agrega comentarios al documento del faro

## Configuracion local
1. Clonar
2. Crear archivo .env con el campo DB_CONNECTION con el valor de la connection string de la base MongoDB a utilizar
3. npm install
4. npm start
