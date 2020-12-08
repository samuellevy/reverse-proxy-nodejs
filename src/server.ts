import express from 'express';
import axios from 'axios';

const app = express();

app.get('/', (request,response)=>{
  return response.send({ message: 'hello'});
});

app.get('/route/:url', async (request, response) => {
  const proxy_response = await axios.get('https://id.globo.com/auth/realms/globoi/.well-known/openid-configuration');
  console.log(proxy_response.data);
  return response.send(JSON.stringify(proxy_response.data));
});


app.listen(3333, ()=>{
  console.log('server started');
});