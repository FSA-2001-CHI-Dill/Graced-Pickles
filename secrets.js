const stripeKey = 'sk_test_iIitunOGygrusize5ChoeZtA00VeZ6BYll'

const googleClientId =
  '310451184796-oofbcjct3fefkcegm2cbllu4clf3blsc.apps.googleusercontent.com'

const googleClientSecret = 'W-GCO9CmEzj5imHejElEjO4-'

const googleCallback = 'http://localhost:8080/auth/google/callback'

process.env.STRIPEKEY = stripeKey
process.env.GOOGLE_CLIENT_ID = googleClientId
process.env.GOOGLE_CLIENT_SECRET = googleClientSecret
process.env.GOOGLE_CALLBACK = googleCallback

module.exports = {stripeKey}
