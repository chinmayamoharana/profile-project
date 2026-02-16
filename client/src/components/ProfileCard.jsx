import { MapPin, Briefcase, Link as LinkIcon, Github, Linkedin, Twitter, Globe, Edit2 } from 'lucide-react';

const ProfileCard = ({ user, onEdit }) => {
    if (!user) return <div className="animate-pulse h-64 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                <button
                    onClick={onEdit}
                    className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition text-white"
                >
                    <Edit2 size={18} />
                </button>
            </div>

            <div className="px-6 pb-6">
                <div className="relative -mt-16 mb-4 flex justify-between items-end">
                    <img
                        src={user.profileImage || '/profile_photo.jpeg'}
                        alt={user.name}
                        className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-md"
                    />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                <p className="text-blue-600 dark:text-blue-400 font-medium flex items-center gap-2 mt-1">
                    <Briefcase size={16} /> {user.title}
                </p>

                <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                    {user.bio}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                    {user.socialLinks?.github && (
                        <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition text-gray-700 dark:text-gray-300">
                            <Github size={20} />
                        </a>
                    )}
                    {user.socialLinks?.linkedin && (
                        <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition text-blue-700 dark:text-blue-400">
                            <Linkedin size={20} />
                        </a>
                    )}
                    {user.socialLinks?.twitter && (
                        <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition text-blue-400">
                            <Twitter size={20} />
                        </a>
                    )}
                    {user.socialLinks?.website && (
                        <a href={user.socialLinks.website} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition text-gray-700 dark:text-gray-300">
                            <Globe size={20} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
