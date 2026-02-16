const User = require('../models/User');

// Get Profile (Create default if not exists)
exports.getProfile = async (req, res) => {
    try {
        let user = await User.findOne({ username: 'default' });

        if (!user) {
            // Seed default user if not found
            user = new User({
                username: 'default',
                name: 'John Doe',
                title: 'Full Stack Developer',
                bio: 'Passionate about building scalable web applications.',
                socialLinks: {
                    linkedin: 'https://linkedin.com',
                    github: 'https://github.com',
                    twitter: 'https://twitter.com',
                    website: 'https://portfolio.com'
                },
                skills: [
                    { name: 'React', endorsements: 5 },
                    { name: 'Node.js', endorsements: 3 },
                    { name: 'MongoDB', endorsements: 4 }
                ],
                experience: [
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
                ]
            });
            await user.save();
        } else if (!user.experience || user.experience.length === 0) {
            // Auto-populate experience for existing user if empty (Quick Fix)
            user.experience = [
                {
                    role: "Senior Developer",
                    company: "Tech Corp",
                    duration: "2023 - Present",
                    description: "Leading the frontend team in building a scalable SaaS platform using React and GraphQL."
                },
                {
                    role: "Full Stack Engineer",
                    company: "Startup Inc",
                    duration: "2021 - 2023",
                    description: "Developed and maintained RESTful APIs and integrated third-party services."
                }
            ];
            await user.save();
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    console.log("Incoming update:", req.body);

    const updateData = {};

    if (req.body.name) updateData.name = req.body.name;
    if (req.body.title) updateData.title = req.body.title;
    if (req.body.bio) updateData.bio = req.body.bio;
    if (req.body.profileImage) updateData.profileImage = req.body.profileImage;
    if (req.body.socialLinks) updateData.socialLinks = req.body.socialLinks;
    if (req.body.experience) updateData.experience = req.body.experience;
    if (req.body.skills) updateData.skills = req.body.skills;

    const user = await User.findOneAndUpdate(
      { username: "default" },
      updateData,
      { new: true, runValidators: true }
    );

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


// Endorse Skill
exports.endorseSkill = async (req, res) => {
    try {
        const { skillName } = req.params;

        const user = await User.findOne({ username: 'default' });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const skillIndex = user.skills.findIndex(s => s.name === skillName);

        if (skillIndex > -1) {
            user.skills[skillIndex].endorsements += 1;
        } else {
            // Optional: Add skill if endorsed but doesn't exist? 
            // For now, let's assume skills are pre-defined or added via updateProfile
            // But requirement says "Innovation: Skill Endorsement System"
            // Maybe we allow adding new skills via endorsement? 
            // Let's stick to existing skills for now to keep it simple.
            return res.status(404).json({ message: 'Skill not found' });
        }

        await user.save();
        res.json(user.skills);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update Theme
exports.updateTheme = async (req, res) => {
    try {
        const { theme } = req.body;

        if (!['light', 'dark'].includes(theme)) {
            return res.status(400).json({ message: 'Invalid theme' });
        }

        const user = await User.findOneAndUpdate(
            { username: 'default' },
            { themePreference: theme },
            { new: true }
        );

        res.json({ theme: user.themePreference });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
