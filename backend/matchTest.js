// จำลองข้อมูลผู้ใช้
const users = [
    { id: 1, name: 'User1', preferences: ['cats', 'books', 'music'] },
    { id: 2, name: 'User2', preferences: ['dogs', 'travel', 'music'] },
    { id: 3, name: 'User3', preferences: ['cats', 'books', 'movies'] },
    { id: 4, name: 'User4', preferences: ['travel', 'books', 'movies'] },
    { id: 5, name: 'User5', preferences: ['cats', 'music', 'art'] },
  ];
  
  // ฟังก์ชันจับคู่ผู้ใช้ตามความชอบร่วม
  function findMatches(user, allUsers) {
    return allUsers
      .filter((u) => u.id !== user.id)
      .map((u) => ({
        user: u.name,
        score: user.preferences.filter((pref) => u.preferences.includes(pref)).length,
      }))
      .filter((match) => match.score > 0) // เลือกเฉพาะคนที่มีความชอบร่วม
      .sort((a, b) => b.score - a.score); // จัดเรียงตามคะแนนสูงสุด
  }
  
  // รันการทดสอบ 10 ครั้ง
  for (let i = 1; i <= 10; i++) {
    console.log(`\n=== Test Run ${i} ===`);
    users.forEach((user) => {
      const matches = findMatches(user, users);
      console.log(`Matches for ${user.name}:`, matches);
    });
  }
  