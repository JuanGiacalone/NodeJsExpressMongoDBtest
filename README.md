# NodeJsExpressMongoDBtest

API Rest con MongoDB - Mongoose y Express / Backend para sitio web turistico de faros.

## Endpoints
- *GET* /faros/ -> Devuelve todos los faros
- *GET* /faros/faro/$idFaro$ -> Devuelve el faro segun idFaro
- *GET* /faros/top - > Devuelve el top 5 faros con mayor impresiones
- *POST* /faros/ -> Crea un faro, usar el archivo FarosJson.json - Ademas, crea un documento comentario con el idFaro como clave secundaria.
- *PUT* /faros/$idFaro$ -> Registra una nueva impresion
- *DELETE* /faros/$idFaro$ -> Elimina el faro y su documento comentario relacionado. 
- *GET* /comentarios/ -> Devuelve todos los documentos de tipo comentario 
- *GET* /comentarios/$idFaro$ -> Devuelve los comentarios del faro especificado 
- *PUT* /comentarios/$idFaro$ -> Agrega comentarios al documento Comentario del faro indicado 
- *DELETE* /comentarios/$idFaro$&$idComentario$ -> Elimina un comentario segun idFaro y el idComentario 
## Configuracion local
1. Clonar
2. Crear archivo .env con el campo DB_CONNECTION con el valor de la connection string de la base MongoDB a utilizar
3. npm install
4. npm start
## Testear los endpoints
1. Usar los .js de la carpeta axios_requests
2. Correrlos con node NombreArchivo.js
3. Modificar parametros de entrada segun necesidad
