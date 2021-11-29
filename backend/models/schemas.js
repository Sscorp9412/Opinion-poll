const mongoose = require("mongoose");

// ** user schema
exports.userSchema = new mongoose.Schema(
   [
      {
         firstName: String,
         lastName: String,
         username: String,
         email: String,
         password: String,
         isVerified: { type: Boolean, default: false }
      }
   ],
   {
      timestamps: { createdAt: true, updatedAt: true }
   }
);

// ** issue schema
exports.issueSchema = new mongoose.Schema(
    [
        {
            title: String,
            content: String,
            creator: String
        }
    ],
    {
        timestamps: { createdAt: true, updatedAt: true}
    }
)

// ** polls schema
exports.pollSchema = new mongoose.Schema(
    [
        {
            issueId: String,
            opinions: [
                {
                    userId: String,
                    opinion: String
                }
            ]
        }
    ],
    {
        timestamps: { createdAt: true, updatedAt: true}
    }
)