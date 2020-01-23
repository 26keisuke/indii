const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
    // {i2} api and auth/google must be changed in the future 
    app.use(proxy(['/api', '/auth/google'], { target: 'http://localhost:5000' }));
}

// {i2} Will be needed in the future !!!!!!