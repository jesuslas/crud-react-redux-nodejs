process.env.NODE_ENV = 'testing'
const appStart = require('../www')
const request = require('supertest')


const credentials = {
  username: "admin",
  password: "mktxdatos"
}

before('Inicia aplicacion', function(done){
  this.timeout(1000 * 120)
  done()
})

describe('Autenticacion', function() {
  this.timeout(1000 * 120);
  it('Se ingresa como administrador', function(done){
    request(appStart).post('/api/auth/login').send(credentials).expect(200).end(function(err, res){
      if (err) {
        return done(err);
      }
      const response = JSON.parse(res.text)
      return done();
      
    })
  })
})

describe('Datos registrados', function(){
  this.timeout(1000 * 120);

})
