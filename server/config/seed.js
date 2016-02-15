/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Classified from '../api/classified/classified.model';

Classified.find({}).removeAsync()
  .then(() => {
    Classified.create({
      title: 'Development Tools',
      description: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
      'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
      'Stylus, Sass, and Less.',
      price: 22.45,
      address: {
        country: 'Poland',
        city: 'Poznan'
      },
      contact: {
        name: 'test',
        phone: '00 0000 000',
        mail: 'test@example.com'
      }
    }, {
      title: 'Server and Client integration',
      description: 'Built with a powerful and fun stack: MongoDB, Express, ' +
      'AngularJS, and Node.',
      price: 32.45,
      address: {
        country: 'Poland',
        city: 'Poznan'
      },
      contact: {
        name: 'test',
        phone: '00 0000 000',
        mail: 'test@example.com'
      }
    }, {
      title: 'Smart Build System',
      description: 'Build system ignores `spec` files, allowing you to keep ' +
      'tests alongside code. Automatic injection of scripts and ' +
      'styles into your index.html',
      price: 82.45,
      address: {
        country: 'Poland',
        city: 'Poznan'
      },
      contact: {
        name: 'test',
        phone: '00 0000 000',
        mail: 'test@example.com'
      }
    }, {
      title: 'Modular Structure',
      description: 'Best practice client and server structures allow for more ' +
      'code reusability and maximum scalability',
      price: 42.45,
      address: {
        country: 'Poland',
        city: 'Poznan'
      },
      contact: {
        name: 'test',
        phone: '00 0000 000',
        mail: 'test@example.com'
      }
    }, {
      title: 'Optimized Build',
      description: 'Build process packs up your templates as a single JavaScript ' +
      'payload, minifies your scripts/css/images, and rewrites asset ' +
      'names for caching.',
      price: 72.45,
      address: {
        country: 'Poland',
        city: 'Poznan'
      },
      contact: {
        name: 'test',
        phone: '00 0000 000',
        mail: 'test@example.com'
      }
    }, {
      title: 'Deployment Ready',
      description: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
      'and openshift subgenerators',
      price: 12.45,
      address: {
        country: 'Poland',
        city: 'Poznan'
      },
      contact: {
        name: 'test',
        phone: '00 0000 000',
        mail: 'test@example.com'
      }
    });
  });

User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test',
      address: {
        country: 'Poland',
        city: 'Poznan'
      },
      contact: {
        name: 'test',
        phone: '00 0000 000'
      }
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
