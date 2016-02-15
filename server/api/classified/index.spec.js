'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var classifiedCtrlStub = {
  index: 'classifiedCtrl.index',
  show: 'classifiedCtrl.show',
  create: 'classifiedCtrl.create',
  update: 'classifiedCtrl.update',
  destroy: 'classifiedCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var classifiedIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './classified.controller': classifiedCtrlStub
});

describe('Classified API Router:', function() {

  it('should return an express router instance', function() {
    classifiedIndex.should.equal(routerStub);
  });

  describe('GET /api/classifieds', function() {

    it('should route to classified.controller.index', function() {
      routerStub.get
        .withArgs('/', 'classifiedCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/classifieds/:id', function() {

    it('should route to classified.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'classifiedCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/classifieds', function() {

    it('should route to classified.controller.create', function() {
      routerStub.post
        .withArgs('/', 'classifiedCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/classifieds/:id', function() {

    it('should route to classified.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'classifiedCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/classifieds/:id', function() {

    it('should route to classified.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'classifiedCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/classifieds/:id', function() {

    it('should route to classified.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'classifiedCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
