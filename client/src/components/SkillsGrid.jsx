import { useState } from 'react';
import { Heart } from 'lucide-react';
import api from '../services/api';

const SkillsGrid = ({ skills, onEndorse }) => {
    const handleEndorse = async (skillName) => {
        // Optimistic update handled by parent or local state?
        // Let's call API and update parent via callback
        try {
            await api.post(`/skills/${encodeURIComponent(skillName)}/endorse`);
            onEndorse(skillName); // Trigger refetch or local update
        } catch (err) {
            console.error("Failed to endorse", err);
        }
    };

    if (!skills) return null;

    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                Skills & Endorsements
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition flex justify-between items-center group"
                    >
                        <span className="font-medium text-gray-800 dark:text-gray-200">{skill.name}</span>
                        <button
                            onClick={() => handleEndorse(skill.name)}
                            className="flex items-center gap-1.5 px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full hover:bg-red-100 dark:hover:bg-red-900/40 transition active:scale-95"
                            title="Endorse this skill"
                        >
                            <Heart size={14} className={skill.endorsements > 0 ? "fill-current" : ""} />
                            <span className="text-sm font-bold">{skill.endorsements}</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsGrid;
