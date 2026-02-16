const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const debug = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        // 1. Check current state
        let user = await User.findOne({ username: 'default' });
        console.log('Current skills in DB:', user.skills.map(s => s.name));

        // 2. Perform update
        const newSkills = [...user.skills, { name: 'Rust', endorsements: 0 }];
        console.log('Updating with:', newSkills.map(s => s.name));

        const updated = await User.findOneAndUpdate(
            { username: 'default' },
            { $set: { skills: newSkills } },
            { new: true }
        );

        console.log('Updated skills in DB:', updated.skills.map(s => s.name));

        if (updated.skills.some(s => s.name === 'Rust')) {
            console.log('VERIFICATION: SUCCESS');
        } else {
            console.log('VERIFICATION: FAILED');
        }

        mongoose.connection.close();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

debug();
