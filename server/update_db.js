const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB connected for update...');

        try {
            const experienceData = [
                {
                    role: "Full Stack Web Development Intern",
                    company: "CODTECH IT SOLUTIONS",
                    duration: "Aug 2025 - Sep 2025",
                    description: "Completed a 4-week internship demonstrating outstanding dedication and technical proficiency. Showcased innovative problem-solving skills and deep understanding of full-stack development."
                },
                {
                    role: "Python Full-Stack Developer Intern",
                    company: "QSpiders",
                    duration: "Jan 2025 - June 2025",
                    description: "Developed a functional e-commerce web application using Django, HTML, CSS, and Bootstrap. Built features including user auth, product catalog, cart, checkout, and admin dashboard with a 4-member team."
                }
            ];

            const res = await User.findOneAndUpdate(
                { username: 'default' },
                { $set: { experience: experienceData } },
                { new: true }
            );

            console.log('Update Success:', res ? 'User updated' : 'User not found');
        } catch (err) {
            console.error('Update Failed:', err);
        } finally {
            mongoose.connection.close();
        }
    })
    .catch(err => console.log(err));
