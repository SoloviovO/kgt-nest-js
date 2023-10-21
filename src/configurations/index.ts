export default () => ({
  port: process.env.PORT,
  dbHost: process.env.DB_HOST,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpires: process.env.JWT_EXPIRES_IN_SECONDS,
});
