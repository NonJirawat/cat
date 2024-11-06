const users = [
    { id: 1, name: 'User1', preferences: { breed: 'Persia', color: 'white', gender: 'female', ageRange: [1, 3] } },
    { id: 2, name: 'User2', preferences: { breed: 'Siamese', color: 'black', gender: 'male', ageRange: [2, 5] } },
    { id: 3, name: 'User3', preferences: { breed: 'Bengal', color: 'brown', gender: 'female', ageRange: [1, 4] } },
    { id: 4, name: 'User4', preferences: { breed: 'Persia', color: 'gray', gender: 'male', ageRange: [3, 6] } },
    { id: 5, name: 'User5', preferences: { breed: 'Maine Coon', color: 'white', gender: 'female', ageRange: [2, 5] } },
    { id: 6, name: 'User6', preferences: { breed: 'Siamese', color: 'cream', gender: 'female', ageRange: [1, 3] } },
    { id: 7, name: 'User7', preferences: { breed: 'Bengal', color: 'brown', gender: 'male', ageRange: [2, 4] } },
    { id: 8, name: 'User8', preferences: { breed: 'Persia', color: 'white', gender: 'male', ageRange: [1, 5] } },
    { id: 9, name: 'User9', preferences: { breed: 'Sphynx', color: 'pink', gender: 'female', ageRange: [1, 2] } },
    { id: 10, name: 'User10', preferences: { breed: 'British Shorthair', color: 'blue', gender: 'male', ageRange: [2, 5] } },
];

const cats = [
    { id: 1, name: 'Milo', breed: 'Persia', color: 'white', gender: 'female', age: 2 },
    { id: 2, name: 'Leo', breed: 'Siamese', color: 'black', gender: 'male', age: 3 },
    { id: 3, name: 'Bella', breed: 'Bengal', color: 'brown', gender: 'female', age: 4 },
    { id: 4, name: 'Charlie', breed: 'Maine Coon', color: 'gray', gender: 'male', age: 3 },
    { id: 5, name: 'Luna', breed: 'Sphynx', color: 'pink', gender: 'female', age: 1 },
    { id: 6, name: 'Max', breed: 'British Shorthair', color: 'blue', gender: 'male', age: 5 },
    { id: 7, name: 'Oliver', breed: 'Bengal', color: 'brown', gender: 'male', age: 3 },
    { id: 8, name: 'Lucy', breed: 'Siamese', color: 'cream', gender: 'female', age: 2 },
    { id: 9, name: 'Coco', breed: 'Persia', color: 'gray', gender: 'female', age: 4 },
    { id: 10, name: 'Lily', breed: 'Persia', color: 'white', gender: 'male', age: 3 }
];

function findCatMatches(user, cats) {
    return cats.map((cat) => {
        let score = 0;
        if (user.preferences.breed === cat.breed) score += 2;
        if (user.preferences.color === cat.color) score += 1;
        if (user.preferences.gender === cat.gender) score += 1;
        if (cat.age >= user.preferences.ageRange[0] && cat.age <= user.preferences.ageRange[1]) score += 2;

        return { catName: cat.name, matchScore: score }; // เปลี่ยนเป็นชื่อแมวแทน ID
    })
    .filter(match => match.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);
}

// ทดสอบและแสดงผลลัพธ์เป็นชื่อ
users.forEach(user => {
    const matches = findCatMatches(user, cats);
    console.log(`\nแนะนำแมวสำหรับ ${user.name}:`);
    matches.forEach(match => {
        console.log(`- ชื่อแมว: ${match.catName}, คะแนนจับคู่: ${match.matchScore}`);
    });
});