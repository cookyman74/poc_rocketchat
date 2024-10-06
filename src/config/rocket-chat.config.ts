export default () => ({
  rocketChat: {
    baseUrl: process.env.ROCKET_CHAT_BASE_URL || 'http://localhost:3000/api/v1',
    authToken: process.env.ROCKET_CHAT_AUTH_TOKEN,
    userId: process.env.ROCKET_CHAT_USER_ID,
  },
});
