import { useState, useEffect } from 'react';
import api from './services/api';
import ThemeToggle from './components/ThemeToggle';
import ProfileCard from './components/ProfileCard';
import SkillsGrid from './components/SkillsGrid';
import ExperienceTimeline from './components/ExperienceTimeline';
import EditModal from './components/EditModal';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch data on mount
  const fetchProfile = async () => {
    try {
      const res = await api.get('/profile');
      setUser(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load profile", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleEndorse = (skillName) => {
    setUser(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.name === skillName
          ? { ...skill, endorsements: skill.endorsements + 1 }
          : skill
      )
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">P</div>
            <span className="text-xl font-bold dark:text-white">Profile.Dev</span>
          </div>
          <ThemeToggle />
        </header>

        <main className="space-y-6">
          <ProfileCard user={user} onEdit={() => setIsEditing(true)} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <ExperienceTimeline experience={user?.experience} />
              {!user?.experience?.length && (
                <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-center text-gray-500 mt-8">
                  No experience added yet.
                </div>
              )}
            </div>
            <div className="md:col-span-1">
              {/* Placeholder for future sidebar widgets */}
            </div>
          </div>

          <SkillsGrid skills={user?.skills} onEndorse={handleEndorse} />
        </main>

        <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm pb-8">
          <p>© {new Date().getFullYear()} Profile Project. Built with MERN Stack.</p>
        </footer>
      </div>

      {isEditing && (
        <EditModal
          user={user}
          onClose={() => setIsEditing(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default App;
