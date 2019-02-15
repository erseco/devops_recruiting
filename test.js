var request = require('supertest'),
should = require('should'),
app = require('./app.js');

describe("APP ON", function(){
    it('Debería devolver 200.', function(done){
        request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
    it('Debería devolver status OK', function(done){
        request(app)
            .get('/')
            .expect('Content-Type',/json/)
            .expect(200)
            .end(function(error, resultado){
                if(error) return done(error);
                else { 
                    resultado.body.should.have.property('status', 'OK');
                    done(); 
                } 
            });
    });
    it('Hello status 200.', function(done){
        request(app)
            .post('/hello')
            .expect(200, done)
    });
    it('Hora status 200.', function(done){
        request(app)
            .get('/hour/japan')
            .expect(200, done)
    });
    it('Tiempo status 200.', function(done){
        request(app)
            .get('/weather/japan')
            .expect(200, done)
    });
});