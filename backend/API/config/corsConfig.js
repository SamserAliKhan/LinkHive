const allowedOrigins = (
  process.env.CORS_ALLOWED_ORIGINS || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim());

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (Postman, curl, mobile apps)
    if (!origin) return callback(null, true);

    // check if origin is in the whitelist
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    //reject everything else
    const msg = ` CORS blocked. Origin not allowed: ${origin}`;
    return callback(new Error(msg), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "X-Requested-With", "Authorization"],
};
export default corsOptions;