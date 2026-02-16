const axios = require('axios');

const testFullCycle = async () => {
    try {
        console.log('1. Fetching current profile...');
        const getRes = await axios.get('http://localhost:5000/api/profile');
        const user = getRes.data;
        console.log('Current skills count:', user.skills.length);

        console.log('2. Adding new skill "Go"...');
        const updatedSkills = [...user.skills, { name: 'Go', endorsements: 0 }];

        console.log('3. Sending PUT request...');
        const putRes = await axios.put('http://localhost:5000/api/profile', {
            ...user,
            skills: updatedSkills
        });

        console.log('4. Verification...');
        const verifyRes = await axios.get('http://localhost:5000/api/profile');
        const finalSkills = verifyRes.data.skills;
        console.log('Final skills count:', finalSkills.length);

        const hasGo = finalSkills.some(s => s.name === 'Go');
        if (hasGo) {
            console.log('SUCCESS: "Go" was added to the database.');
        } else {
            console.log('FAILURE: "Go" was NOT found in the database.');
        }

        // Cleanup: remove "Go"
        await axios.put('http://localhost:5000/api/profile', {
            ...user,
            skills: user.skills
        });
        console.log('Cleanup: Restored original skills.');

    } catch (e) {
        console.error('Test Failed:', e.response ? e.response.data : e.message);
    }
};

testFullCycle();
