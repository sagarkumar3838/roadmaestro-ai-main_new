
export type CodingQuestion = {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
};

const codingPool: CodingQuestion[] = [
  {
    id: "q1",
    title: "Reverse a String",
    description: "Write a function that reverses a given string.",
    starterCode: `function reverseString(str) {
      // your code here
    }`,
    category: "web-development",
    difficulty: "beginner"
  },
  {
    id: "q2",
    title: "Find Max in Array",
    description: "Write a function to find the maximum number in an array.",
    starterCode: `function findMax(arr) {
      // your code here
    }`,
    category: "web-development",
    difficulty: "beginner"
  }
];

export async function getRandomCodingQuestion(
  category: string,
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): Promise<CodingQuestion> {
  const filtered = codingPool.filter(
    (q) => q.category === category && q.difficulty === difficulty
  );
  return filtered[Math.floor(Math.random() * filtered.length)];
}