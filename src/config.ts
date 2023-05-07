import 'dotenv/config';

const maxAgeOneMonth = 30 * 24 * 60 * 60 * 1000;
const maxAgeSevenDays = 7 * 24 * 60 * 60 * 1000;

export default {
  port: process.env.PORT,
  host: process.env.DB_URL || '',
  access_key: process.env.JWT_ACCESS_SECRET,
  refresh_key: process.env.JWT_REFRESH_SECRET,

  bcryptSalt: 10,

  REFRESH_PARAMETR: {
    maxAge: maxAgeOneMonth,
    httpOnly: true,
  },

  ACCESS_PARAMETR: {
    maxAge: maxAgeSevenDays,
    httpOnly: true,
  },

  pathToFile: process.env.PATH_TO_FILES,

  hostClient: process.env.CLIENT_API,

  defaultLimitPagination: 20,

  defaultPagePagination: 1,
};
