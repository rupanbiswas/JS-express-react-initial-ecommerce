import bcrypt from 'bcryptjs';
const users = [
    { name: 'admin user', email: 'admin@gmail.com', password: bcrypt.hashSync('123456', 10), isAdmin: true },
    {
        name: 'rupan user',
        email: 'rupan@gmail.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'rupa user',
        email: 'rupa@gmail.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'rup user',
        email: 'rup@gmail.com',
        password: bcrypt.hashSync('123456', 10)
    },

]
export default users