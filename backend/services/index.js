const authService = require('./authService');
const taskService = require('./taskService');
const userService = require('./userService');
const validationService = require('./validationService');
const errorService = require('./errorService');
const databaseService = require('./databaseService');

module.exports = {
  authService,
  taskService,
  userService,
  validationService,
  errorService,
  databaseService
};
