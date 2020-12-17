require('dotenv').config();
import express, {NextFunction, Request, Response} from 'express';
import axios from 'axios';
import httpProxy from 'http-proxy';
import expressProxy from 'express-http-proxy';
import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';
import cors from 'cors';

const app = express();
const {DM_PROXY_SELF, DM_PROXY_REFERER, DM_PROXY_TARGET, DM_PROXY_AUTH} = process.env;


/** express proxy */
var getAuthStatus = function (req: Request, res: Response, next: NextFunction) {
  let logged = false;
  console.log(req.headers.referer);

  if(req.headers.referer){
    // controle de referer
    if(req.headers.referer===`${DM_PROXY_REFERER}/` || req.headers.referer===`${DM_PROXY_SELF}/app/kibana`){
      logged = true;
    }
  }

  if(logged){
    next();
  } else {
    res.send('Acesso não permitido.');
    // res.send({req: req.headers});
  }
};

app.use('/', createProxyMiddleware({ target: `https://bff-siscob-hml.integracao.brmalls.com.br/`, changeOrigin: true }), (req,res)=>{
  res.send('alo');
});


app.get('/info', (req,res)=>{
  return res.send({ message: 'service ok'});
});

if(DM_PROXY_AUTH=='on'){
  app.use(getAuthStatus);
}

app.listen(3333, ()=>{
  console.log('server started');
});