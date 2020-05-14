export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default_test',
    expiresIn: '1d',
  },
};
