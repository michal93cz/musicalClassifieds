/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/classifieds              ->  index
 * POST    /api/classifieds              ->  create
 * GET     /api/classifieds/:id          ->  show
 * PUT     /api/classifieds/:id          ->  update
 * DELETE  /api/classifieds/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Classified = require('./classified.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Classifieds
export function index(req, res) {
  Classified.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Classifieds by owner id
export function showOwner(req, res) {
  Classified.find({'owner': req.params.id})
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Classified from the DB
export function show(req, res) {
  Classified.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Classified in the DB
export function create(req, res) {
  Classified.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Classified in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Classified.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Classified from the DB
export function destroy(req, res) {
  Classified.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
