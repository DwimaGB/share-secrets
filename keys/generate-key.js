
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const key = crypto.randomBytes(32).toString('hex');

fs.writeFileSync(path.join(__dirname, 'encryption.key'), key);
