const bcrypt = require('bcrypt');

const plainPassword = '4uslvzdo6';
const hashedPassword = await bcrypt.hash(plainPassword, 10);

// Сохраните hashedPassword в базе данных