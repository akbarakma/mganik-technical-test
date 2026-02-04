# mganik-technical-test

This is a mGanik Technical Test

## Setup Instructions for mGanik Technical Test App

### Prerequisites
- node v20+
- create .env file based on .env-example in server folder

### 1. Clone the repository
```bash
git clone https://github.com/akbarakma/mganik-technical-test
cd mganik-technical-test/server
```

### 2. Install dependencies
Dont forget to create .env file in server root folder based on .env-example
and change your cred accordingly
```bash
npm install
```

### 3. Setup the database
```bash
npx sequelize-cli db:create

npx sequelize-cli db:migrate

npx sequelize-cli db:seed:all
```

### 4. Run the app
```bash
npm run swagger

npm run build

npm run start
```

You can access the swagger docs in http://localhost:3000/docs