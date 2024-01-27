import dotenv from 'dotenv';
dotenv.config();
const uri =
  process.env.NODE_ENV === 'development'
    ? 'mongodb://127.0.0.1:27017/health-tracker'
    : process.env.MONGO_URI;
if (!uri) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env.local'
  );
}
export const mongoConfig = {
  // MongoDB connection URI.
  // See 👉 https://mongoosejs.com/docs/connections.html#connection-uris
  uri,
  // MongoDB connection options.
  // See 👉 https://mongoosejs.com/docs/connections.html#options
};
