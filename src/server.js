var express_1 = require('express');
var http_proxy_middleware_1 = require('http-proxy-middleware');
var app = express_1["default"]();
/** express proxy */
var verifySegAuth = function (req, res, next) {
    var logged = false;
    console.log(req.headers.referer);
    if (req.headers.referer) {
        // se o referer for do DASHBOARD ou do PRÓPRIO PROXY
        if (req.headers.referer === 'http://localhost:3000/' || req.headers.referer === 'http://localhost:3333/app/kibana') {
            logged = true;
        }
    }
    if (logged) {
        next();
    }
    else {
        // console.log(req.headers);
        res.send('nao permitido');
    }
};
// app.use(cors({origin: "http://acd", credentials: true,}))
app.use(verifySegAuth);
app.use('/', http_proxy_middleware_1.createProxyMiddleware({ target: 'http://127.0.0.1:5601', changeOrigin: true }), function (req, res) {
    res.send('alo');
});
// app.get('/restricted', (req,res)=>{
//   return res.send({ message: 'hello'});
// });
/* funcional */
// app.use('/', expressProxy(getHost, {
//   limit: '5mb'
// }));
// app.get('/', (req,res)=>{});
/** manual proxy */
// var proxy = httpProxy.createProxyServer(proxyOptions);
// proxy.on('proxyReq', function(proxyReq, req, res, options) {
//   proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
// });
// app.get('/', (req,res)=>{
//   // // return response.send({ message: 'hello'});
//   const logged = true;
//   if(logged){
//     proxy.web(req, res, { target: `http://127.0.0.1:5601/app/kibana#/dashboard/e8ac3ce0-04ac-11eb-9228-cd5f376b0201?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:teste-dashboard,viewMode:view)` });
//     // proxy.web(req, res, { target: 'http://127.0.0.1:5601/' });
//   } else {
//     return res.status(200).send({ message: 'acesso não autorizado'});
//   }
// });
// app.get('/bundles/app/kibana/bootstrap.js', (req,res)=>{
//   proxy.web(req, res, { target: `http://127.0.0.1:5601/bundles/app/kibana/bootstrap.js` });
//   // http://127.0.0.1:5601/bundles/app/kibana/bootstrap.js
// });
// app.get('/routed', (req,res)=>{
//   return res.send({ message: 'acesso autorizado'});
// });
// app.get('/:params', (req,res)=>{
//   // // return response.send({ message: 'hello'});
//   const logged = true;
//   console.log(req.params);
//   if(logged){
//     // proxy.web(req, res, { target: 'http://127.0.0.1:3333/routed' });
//     // proxy.web(req, res, { target: 'http://127.0.0.1:5601/login?next=%2F' });
//   } else {
//     return res.status(200).send({ message: 'acesso não autorizado'});
//   }
// });
app.get('/route/:url', async(request, response), {
    const: proxy_response = await, axios: .get('https://id.globo.com/auth/realms/globoi/.well-known/openid-configuration'),
    console: .log(proxy_response.data),
    return: response.send(JSON.stringify(proxy_response.data))
});
app.listen(3333, function () {
    console.log('server started');
});