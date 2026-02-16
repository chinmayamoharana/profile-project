import { Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const ExperienceTimeline = ({ experience }) => {
    if (!experience || experience.length === 0) return null;

    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                Work History
            </h2>
            <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-3 space-y-8">
                {experience.map((job, index) => (
                    <div key={index} className="relative pl-8">
                        <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-blue-500 border-4 border-white dark:border-gray-900"></span>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
                        >
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{job.role}</h3>
                            <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{job.company}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 block mb-2">{job.duration}</span>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{job.description}</p>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExperienceTimeline;
