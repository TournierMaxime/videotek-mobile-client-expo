import Constants from 'expo-constants';

const ENV = {
  dev: {
    VIDEOTEK_API: 'http://localhost:3610/api/v1/',
  },
  prod: {
    VIDEOTEK_API: 'http://localhost:3610/api/v1/',
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  } else if (env === 'prod') {
    return ENV.prod;
  }
};

export default getEnvVars;
