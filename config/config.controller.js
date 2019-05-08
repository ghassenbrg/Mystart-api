module.exports = (app) => {
    const config = require('./config.service.js');

      // Create config
    app.post('/api/config', config.create);

      // Fetch config
    app.get('/api/config', config.find);

      // Fetch menus config
    app.get('/api/config/menus', config.findMenus);

      // Update config
    app.put('/api/config', config.update);

      // Delete config
    app.delete('/api/config/:id', config.delete);

}