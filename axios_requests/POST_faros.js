import axios from "axios";

const PUERTO = process.env.APP_PUERTO || 3000;

const host = `http://localhost:${PUERTO}/`

const endpoint = 'faros/'  

const options = {
  method: 'POST',
  url: host + endpoint,
  headers: {'Content-Type': 'application/json; charset=utf-8'},
  data: '{"idFaro":21,"nombre":"testComm","coordenadas":{"coordinates":[52,52],"type":"Point"}}'
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});