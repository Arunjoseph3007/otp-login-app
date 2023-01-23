# OTP Login App

The app is built using Express as backend, MongoDB for Database and NextJS in frontend

Once you enter your mobile number a random OTP is generated (this will be valid for 5 minutes) encrypted using bcrypt and stored in DB. After that one can use that to Verify the account.

## Start the project

```bash
git clone https://github.com/Arunjoseph3007/otp-login-app.git .

# Frontend
cd frontend
# Install dependencies
yarn
# Start server
yarn dev

# Backend
cd backend
# Install dependencies
yarn
# Start server
yarn dev
```

