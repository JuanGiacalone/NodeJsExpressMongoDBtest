# NodeJsExpressMongoDBtest

API Rest con MongoDB - Mongoose y Express / Backend para sitio web turistico de faros.

## Endpoints
- *GET* /faros/all -> Devuelve todos los faros
- *GET* /faros/all/sincom -> Devuelve todos los faros *sin* comentarios
- *GET* /faros/$idFaro$ -> Devuelve el faro segun idFaro *con* los comentarios
- *GET* /faros/$idFaro$/sincom -> Devuelve el faro segun idFaro *sin* los comentarios
- *GET* /faros/comentarios/$idFaro$ -> Devuelve todos los comentarios del faro, del mas antiguo al mas reciente   
- *POST* /faros/add -> Crea un faro, usar el archivo FarosJson.json
- *PUT* /faros/addComment/$idFaro -> Agrega comentarios al documento del faro, devuelve el ultimo comentario agregado

## Configuracion local
1. Clonar
2. Crear archivo .env con el campo DB_CONNECTION con el valor de la connection string de la base MongoDB a utilizar
3. npm install
4. npm start
