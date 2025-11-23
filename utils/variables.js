require("dotenv").config();

const config = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_VgyaZKUN6k5r@ep-polished-hall-a4vm36sl-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  JWT_SECRET:
    process.env.JWT_SECRET ||
    "954f21bc7d7b0090450ab51a1490b5cb83c1cfffac45303d2776a716b71e8a0a",
  RESEND_API_KEY:
    process.env.RESEND_API_KEY || "re_2GbCFT6L_G1wxNrx5219MfeCivtmjfmLC",
  SECRET_KEY: process.env.SECRET_KEY || "parasdai",
  RECEIVER_EMAIL: process.env.RECEIVER_EMAIL || "onboarding@resend.dev",
  OFFICIAL_VIEWERS_CC:
    process.env.OFFICIAL_VIEWERS_CC ||
    "spoudel646@gmail.com,spoudel646@gmail.com",
  OFFICIAL_VIEWERS_BCC: process.env.OFFICIAL_VIEWERS_BCC || "",
  IS_LOCAL: process.env.IS_LOCAL || "http://localhost:3000/api",
};

module.exports = config;
