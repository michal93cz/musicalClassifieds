'use strict';
import * as auth from '../../auth/auth.service';

var express = require('express');
var controller = require('./classified.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/owner/:id', controller.showOwner)
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
