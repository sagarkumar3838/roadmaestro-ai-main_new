import { createServer } from 'http';
import { URL } from 'url';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const server = createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host}`);
  const method = req.method;

  if (method === 'OPTIONS') {
    res.writeHead(200, corsHeaders);
    res.end('ok');
  } else if (method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', async () => {
      try {
        const { answers, isInitial, userName } = JSON.parse(body);

        // Use environment variables (secrets)
        const openAIApiKey = process.env.OPENAI_API_KEY;
        if (!openAIApiKey) {
          throw new Error('OPENAI_API_KEY secret not set in environment variables.');
        }

        // Your logic to call OpenAI and generate questions/results goes here.
        // This is a simplified example using fallback data.
        // Replace this with your actual OpenAI fetch call.
        const responsePayload = isInitial
          ? generateFallbackQuestions(userName)
          : generateFallbackResults(userName);

        // Return a response
        res.writeHead(200, { ...corsHeaders, 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responsePayload));
      } catch (error) {
        console.error('Error in career-mentor function:', error);
        res.writeHead(500, { ...corsHeaders, 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
    });
  }
});

server.listen(8080, () => {
  console.log('Server listening on port 8080');
});

// --- Helper Functions with Fallback Data ---

function generateFallbackQuestions(userName: string) {
  const timestamp = Date.now();
  return {
    questions: [
      {
        id: `debugging_approach_${timestamp}_1`,
        text: "When facing a technical challenge you've never encountered before, what's your first instinct?",
        type: 'multiple-choice',
        options: ['Break it down into smaller, manageable parts', 'Research similar problems online', 'Ask for help from colleagues', 'Experiment with different solutions']
      },
      {
        id: `learning_motivation_${timestamp}_2`,
        text: "What drives you most when learning a new technology?",
        type: 'multiple-choice',
        options: ['Solving real-world problems', 'Career advancement', 'Personal satisfaction', 'Staying relevant']
      }
    ],
    score: 0, courses: [], roadmap: [],
    profile: { name: userName, score: 0, globalRank: '', interests: [], recommendedCourses: [], shareableSummary: '' }
  };
}

function generateFallbackResults(userName: string) {
  const score = Math.floor(Math.random() * 40) + 60;
  const rank = score >= 90 ? "Top 5%" : "Top 15%";
  return {
    questions: [], score,
    courses: [{ courseTitle: "React - The Complete Guide", category: "Web Development", level: "Intermediate", url: "#" }],
    roadmap: ["Step 1: Master the fundamentals", "Step 2: Build portfolio projects"],
    profile: { name: userName, score, globalRank: rank, interests: ['Web Development'], recommendedCourses: ["React - The Complete Guide"], shareableSummary: `Scored ${score}/100!` }
  };
}
