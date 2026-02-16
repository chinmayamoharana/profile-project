import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import api from '../services/api';

const EditModal = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...user });
    const [loading, setLoading] = useState(false);
    const [newSkillName, setNewSkillName] = useState('');

    useEffect(() => {
        setFormData({ ...user });
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Handle nested socialLinks
        if (name.startsWith('social_')) {
            const socialKey = name.replace('social_', '');
            setFormData(prev => ({
                ...prev,
                socialLinks: {
                    ...prev.socialLinks,
                    [socialKey]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Remove MongoDB _id from nested arrays
            const cleanSkills = formData.skills.map(s => ({
                name: s.name,
                endorsements: s.endorsements || 0
            }));

            const cleanExperience = formData.experience.map(e => ({
                role: e.role,
                company: e.company,
                duration: e.duration,
                description: e.description
            }));

            const payload = {
                name: formData.name,
                title: formData.title,
                bio: formData.bio,
                profileImage: formData.profileImage,
                socialLinks: formData.socialLinks,
                skills: cleanSkills,
                experience: cleanExperience
            };

            const res = await api.put("/profile", payload);
            onSave(res.data);
            onClose();
        } catch (err) {
            console.error("Failed to update profile", err);
            alert("Save failed");
        } finally {
            setLoading(false);
        }
    };


    console.log(formData)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-bold dark:text-white">Edit Profile</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition">
                        <X size={20} className="dark:text-white" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                        <textarea name="bio" value={formData.bio} onChange={handleChange} rows="3" className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Profile Image URL</label>
                        <input type="text" name="profileImage" value={formData.profileImage} onChange={handleChange} className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>

                    <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <h3 className="font-semibold dark:text-white">Social Links</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" name="social_github" placeholder="GitHub URL" value={formData.socialLinks?.github || ''} onChange={handleChange} className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            <input type="text" name="social_linkedin" placeholder="LinkedIn URL" value={formData.socialLinks?.linkedin || ''} onChange={handleChange} className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            <input type="text" name="social_twitter" placeholder="Twitter URL" value={formData.socialLinks?.twitter || ''} onChange={handleChange} className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            <input type="text" name="social_website" placeholder="Website URL" value={formData.socialLinks?.website || ''} onChange={handleChange} className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <h3 className="font-semibold dark:text-white">Skills</h3>

                        {/* List existing skills */}
                        <div className="flex flex-wrap gap-2">
                            {formData.skills?.map((skill, index) => (
                                <div key={index} className="flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                                    <span>{skill.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newSkills = [...formData.skills];
                                            newSkills.splice(index, 1);
                                            setFormData(prev => ({ ...prev, skills: newSkills }));
                                        }}
                                        className="hover:text-blue-800 dark:hover:text-blue-200 transition"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Add new skill */}
                        <div className="flex gap-2">
                            <input
                                placeholder="Add a skill (e.g. Docker)"
                                value={newSkillName}
                                onChange={(e) => setNewSkillName(e.target.value)}
                                className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        if (newSkillName && !formData.skills?.some(s => s.name === newSkillName)) {
                                            setFormData(prev => ({
                                                ...prev,
                                                skills: [...(prev.skills || []), { name: newSkillName, endorsements: 0 }]
                                            }));
                                            setNewSkillName('');
                                        }
                                    }
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    if (newSkillName && !formData.skills?.some(s => s.name === newSkillName)) {
                                        setFormData(prev => ({
                                            ...prev,
                                            skills: [...(prev.skills || []), { name: newSkillName, endorsements: 0 }]
                                        }));
                                        setNewSkillName('');
                                    }
                                }}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <h3 className="font-semibold dark:text-white">Experience</h3>

                        {/* List existing experience */}
                        <div className="space-y-3">
                            {formData.experience?.map((exp, index) => (
                                <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex justify-between items-start">
                                    <div>
                                        <h4 className="font-medium dark:text-white">{exp.role}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-300">{exp.company} • {exp.duration}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newExp = [...formData.experience];
                                            newExp.splice(index, 1);
                                            setFormData(prev => ({ ...prev, experience: newExp }));
                                        }}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Add new experience */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                            <input
                                placeholder="Role (e.g. Frontend Dev)"
                                id="new_role"
                                className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            <input
                                placeholder="Company"
                                id="new_company"
                                className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            <input
                                placeholder="Duration (e.g. 2020 - Present)"
                                id="new_duration"
                                className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const role = document.getElementById('new_role').value;
                                    const company = document.getElementById('new_company').value;
                                    const duration = document.getElementById('new_duration').value;
                                    if (role && company) {
                                        setFormData(prev => ({
                                            ...prev,
                                            experience: [...(prev.experience || []), { role, company, duration, description: '' }]
                                        }));
                                        // Clear inputs
                                        document.getElementById('new_role').value = '';
                                        document.getElementById('new_company').value = '';
                                        document.getElementById('new_duration').value = '';
                                    }
                                }}
                                className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
                            >
                                Add Position
                            </button>
                        </div>
                    </div>

                    <div className="pt-6 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">Cancel</button>
                        <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2">
                            {loading ? 'Saving...' : <><Save size={18} /> Save Changes</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
