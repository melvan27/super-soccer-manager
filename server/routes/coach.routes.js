const CoachController = require('../controllers/coach.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
  app.post('/api/coaches/create', authenticate, CoachController.createCoach);
  // app.get('/api/coaches', authenticate, CoachController.getAllCoaches);
  // app.get('/api/coaches/:id', authenticate, CoachController.getCoach);
  // app.put('/api/coaches/:id', authenticate, CoachController.updateCoach);
  // app.delete('/api/coaches/:id', authenticate, CoachController.deleteCoach);
}