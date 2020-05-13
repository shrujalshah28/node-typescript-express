import app from './app';
import logger from './services/logger';

app.listen(app.get('port'), (): void => {
  logger.info(`🌏 Express server started at http://localhost:${app.get('port')}`);
});

// Close any open connection, when receiving SIGINT
process.on('SIGINT', () => {
  logger.info('Gracefully shutting down');
  process.exit(0);
});
