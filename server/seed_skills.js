const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const skillsToSeed = [
    { name: 'Python', endorsements: 0 },
    { name: 'JavaScript', endorsements: 0 },
    { name: 'HTML', endorsements: 0 },
    { name: 'CSS', endorsements: 0 },
    { name: 'React.js', endorsements: 0 },
    { name: 'Django', endorsements: 0 },
    { name: 'Node.js', endorsements: 0 },
    { name: 'Express.js', endorsements: 0 },
    { name: 'SQL', endorsements: 0 },
    { name: 'MongoDB', endorsements: 0 },
    { name: 'Git', endorsements: 0 },
    { name: 'GitHub', endorsements: 0 },
    { name: 'Bootstrap', endorsements: 0 },
    { name: 'Tailwind CSS', endorsements: 0 }
];

const seedSkills = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const user = await User.findOne({ username: 'default' });
        if (user) {
            // Filter out skills already present to avoid duplicates if needed, 
            // but user asked to "add these skills into it", so I will append or replace.
            // Replacing for clean start with the requested list.
            user.skills = skillsToSeed;
            await user.save();
            console.log('Skills seeded successfully');
        } else {
            console.log('User not found. Run the app first to create default user.');
        }

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding skills:', error);
        process.exit(1);
    }
};

seedSkills();
