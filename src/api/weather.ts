import express from 'express';
export const weaterRouter = express.Router();

weaterRouter.get('/:city', (req, res) => {
  res.send('Birds home page'+req.params.city+process.env['WEATHER_API_KEY'])
});
