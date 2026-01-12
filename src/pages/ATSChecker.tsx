import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Target,
  TrendingUp,
  Download,
  Eye,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ATSResult {
  overallScore: number;
  keywordMatch: number;
  formatScore: number;
  structureScore: number;
  issues: ATSIssue[];
  suggestions: string[];
  keywordAnalysis: KeywordAnalysis;
}

interface ATSIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  suggestion: string;
}

interface KeywordAnalysis {
  matched: string[];
  missing: string[];
  density: { [key: string]: number };
}

const sampleJobDescription = `Software Engineer - React Developer

We are looking for a skilled Software Engineer with expertise in React development to join our dynamic team.

Requirements:
- 3+ years of experience with React.js
- Strong knowledge of JavaScript, HTML, CSS
- Experience with Redux, TypeScript
- Familiarity with RESTful APIs
- Knowledge of Git version control
- Experience with testing frameworks (Jest, React Testing Library)
- Bachelor's degree in Computer Science or related field
- Strong problem-solving skills
- Excellent communication skills

Responsibilities:
- Develop and maintain React applications
- Collaborate with cross-functional teams
- Write clean, maintainable code
- Participate in code reviews
- Optimize applications for performance`;

const commonKeywords = [
  'JavaScript', 'React', 'TypeScript', 'HTML', 'CSS', 'Node.js', 'Git',
  'RESTful APIs', 'Redux', 'Jest', 'Testing', 'Agile', 'Scrum',
  'Problem-solving', 'Communication', 'Teamwork', 'Leadership'
];

export default function ATSChecker() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState(sampleJobDescription);
  const [atsResult, setAtsResult] = useState<ATSResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const analyzeResume = async () => {
    if (!resumeText.trim()) {
      toast({
        title: "Error",
        description: "Please paste your resume text to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      const result = performATSAnalysis(resumeText, jobDescription);
      setAtsResult(result);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Your resume scored ${result.overallScore}/100`,
      });
    }, 2000);
  };

  const performATSAnalysis = (resume: string, jobDesc: string): ATSResult => {
    const resumeLower = resume.toLowerCase();
    const jobDescLower = jobDesc.toLowerCase();
    
    // Extract keywords from job description
    const jobKeywords = extractKeywords(jobDesc);
    const resumeKeywords = extractKeywords(resume);
    
    // Calculate keyword match
    const matchedKeywords = jobKeywords.filter(keyword => 
      resumeLower.includes(keyword.toLowerCase())
    );
    const keywordMatch = (matchedKeywords.length / jobKeywords.length) * 100;
    
    // Calculate format score
    const formatScore = calculateFormatScore(resume);
    
    // Calculate structure score
    const structureScore = calculateStructureScore(resume);
    
    // Overall score
    const overallScore = Math.round((keywordMatch * 0.4 + formatScore * 0.3 + structureScore * 0.3));
    
    // Generate issues and suggestions
    const issues = generateIssues(resume, jobKeywords, matchedKeywords);
    const suggestions = generateSuggestions(resume, jobKeywords, matchedKeywords);
    
    // Keyword analysis
    const keywordAnalysis: KeywordAnalysis = {
      matched: matchedKeywords,
      missing: jobKeywords.filter(k => !matchedKeywords.includes(k)),
      density: calculateKeywordDensity(resume, jobKeywords)
    };
    
    return {
      overallScore,
      keywordMatch: Math.round(keywordMatch),
      formatScore,
      structureScore,
      issues,
      suggestions,
      keywordAnalysis
    };
  };

  const extractKeywords = (text: string): string[] => {
    const keywords: string[] = [];
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    
    // Add common technical terms
    commonKeywords.forEach(keyword => {
      if (text.toLowerCase().includes(keyword.toLowerCase())) {
        keywords.push(keyword);
      }
    });
    
    // Add job-specific terms
    const jobTerms = ['experience', 'skills', 'education', 'certification', 'project', 'achievement'];
    jobTerms.forEach(term => {
      if (text.toLowerCase().includes(term)) {
        keywords.push(term);
      }
    });
    
    return [...new Set(keywords)];
  };

  const calculateFormatScore = (resume: string): number => {
    let score = 0;
    
    // Check for proper sections
    const sections = ['experience', 'education', 'skills', 'summary', 'objective'];
    const foundSections = sections.filter(section => 
      resume.toLowerCase().includes(section)
    );
    score += (foundSections.length / sections.length) * 30;
    
    // Check for bullet points
    if (resume.includes('•') || resume.includes('-') || resume.includes('*')) {
      score += 20;
    }
    
    // Check for consistent formatting
    const lines = resume.split('\n');
    const formattedLines = lines.filter(line => 
      line.trim().length > 0 && (line.startsWith('•') || line.startsWith('-') || line.startsWith('*') || line.match(/^[A-Z]/))
    );
    score += (formattedLines.length / lines.length) * 30;
    
    // Check for contact information
    const hasEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(resume);
    const hasPhone = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/.test(resume);
    if (hasEmail) score += 10;
    if (hasPhone) score += 10;
    
    return Math.min(100, Math.round(score));
  };

  const calculateStructureScore = (resume: string): number => {
    let score = 0;
    
    // Check for proper length (1-2 pages)
    const wordCount = resume.split(/\s+/).length;
    if (wordCount >= 200 && wordCount <= 500) {
      score += 30;
    } else if (wordCount >= 100 && wordCount <= 800) {
      score += 20;
    }
    
    // Check for action verbs
    const actionVerbs = ['developed', 'created', 'implemented', 'managed', 'led', 'designed', 'built', 'improved', 'increased', 'reduced'];
    const hasActionVerbs = actionVerbs.some(verb => 
      resume.toLowerCase().includes(verb)
    );
    if (hasActionVerbs) score += 25;
    
    // Check for quantifiable achievements
    const hasNumbers = /\d+/.test(resume);
    if (hasNumbers) score += 25;
    
    // Check for professional language
    const professionalTerms = ['collaborated', 'optimized', 'streamlined', 'delivered', 'achieved', 'exceeded'];
    const hasProfessionalTerms = professionalTerms.some(term => 
      resume.toLowerCase().includes(term)
    );
    if (hasProfessionalTerms) score += 20;
    
    return Math.min(100, score);
  };

  const generateIssues = (resume: string, jobKeywords: string[], matchedKeywords: string[]): ATSIssue[] => {
    const issues: ATSIssue[] = [];
    
    // Missing keywords
    const missingKeywords = jobKeywords.filter(k => !matchedKeywords.includes(k));
    if (missingKeywords.length > 0) {
      issues.push({
        type: 'warning',
        message: `Missing ${missingKeywords.length} important keywords`,
        suggestion: `Consider adding: ${missingKeywords.slice(0, 5).join(', ')}`
      });
    }
    
    // Format issues
    if (!resume.includes('•') && !resume.includes('-') && !resume.includes('*')) {
      issues.push({
        type: 'warning',
        message: 'No bullet points found',
        suggestion: 'Use bullet points to make your resume more scannable'
      });
    }
    
    // Length issues
    const wordCount = resume.split(/\s+/).length;
    if (wordCount < 200) {
      issues.push({
        type: 'error',
        message: 'Resume is too short',
        suggestion: 'Add more details about your experience and achievements'
      });
    } else if (wordCount > 800) {
      issues.push({
        type: 'warning',
        message: 'Resume might be too long',
        suggestion: 'Consider condensing to 1-2 pages'
      });
    }
    
    // Contact information
    if (!/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(resume)) {
      issues.push({
        type: 'error',
        message: 'No email address found',
        suggestion: 'Add your email address for contact'
      });
    }
    
    return issues;
  };

  const generateSuggestions = (resume: string, jobKeywords: string[], matchedKeywords: string[]): string[] => {
    const suggestions: string[] = [];
    
    if (matchedKeywords.length < jobKeywords.length * 0.6) {
      suggestions.push('Include more relevant keywords from the job description');
    }
    
    if (!resume.toLowerCase().includes('achievement') && !resume.toLowerCase().includes('accomplished')) {
      suggestions.push('Add quantifiable achievements and accomplishments');
    }
    
    if (!resume.toLowerCase().includes('summary') && !resume.toLowerCase().includes('objective')) {
      suggestions.push('Add a professional summary or objective statement');
    }
    
    if (!resume.toLowerCase().includes('skills')) {
      suggestions.push('Include a dedicated skills section');
    }
    
    return suggestions;
  };

  const calculateKeywordDensity = (resume: string, keywords: string[]): { [key: string]: number } => {
    const density: { [key: string]: number } = {};
    const totalWords = resume.split(/\s+/).length;
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'gi');
      const matches = resume.match(regex);
      const count = matches ? matches.length : 0;
      density[keyword] = Math.round((count / totalWords) * 100 * 100) / 100;
    });
    
    return density;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ATS Resume Checker</h1>
          <p className="text-gray-600 mt-2">Analyze your resume's compatibility with Applicant Tracking Systems</p>
        </div>
        <Button variant="outline" onClick={() => setAtsResult(null)}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Resume Text
            </h2>
            <Textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text here..."
              className="min-h-[300px]"
            />
            <div className="mt-4">
              <Button 
                onClick={analyzeResume} 
                disabled={isAnalyzing || !resumeText.trim()}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Target className="h-4 w-4 mr-2" />
                    Analyze Resume
                  </>
                )}
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              Job Description
            </h2>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="min-h-[200px]"
            />
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {atsResult ? (
            <>
              {/* Overall Score */}
              <Card className="p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">
                    <span className={getScoreColor(atsResult.overallScore)}>
                      {atsResult.overallScore}
                    </span>
                    <span className="text-gray-500">/100</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Overall ATS Score</h3>
                  <Progress value={atsResult.overallScore} className="h-2 mb-4" />
                  <Badge className={getScoreBadgeColor(atsResult.overallScore)}>
                    {atsResult.overallScore >= 80 ? 'Excellent' : 
                     atsResult.overallScore >= 60 ? 'Good' : 'Needs Improvement'}
                  </Badge>
                </div>
              </Card>

              {/* Detailed Scores */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Breakdown</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Keyword Match</span>
                      <span className={`text-sm font-bold ${getScoreColor(atsResult.keywordMatch)}`}>
                        {atsResult.keywordMatch}%
                      </span>
                    </div>
                    <Progress value={atsResult.keywordMatch} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Format Score</span>
                      <span className={`text-sm font-bold ${getScoreColor(atsResult.formatScore)}`}>
                        {atsResult.formatScore}%
                      </span>
                    </div>
                    <Progress value={atsResult.formatScore} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Structure Score</span>
                      <span className={`text-sm font-bold ${getScoreColor(atsResult.structureScore)}`}>
                        {atsResult.structureScore}%
                      </span>
                    </div>
                    <Progress value={atsResult.structureScore} className="h-2" />
                  </div>
                </div>
              </Card>

              {/* Issues */}
              {atsResult.issues.length > 0 && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Issues Found
                  </h3>
                  <div className="space-y-3">
                    {atsResult.issues.map((issue, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                        {issue.type === 'error' ? (
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                        ) : issue.type === 'warning' ? (
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900">{issue.message}</p>
                          <p className="text-sm text-gray-600">{issue.suggestion}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Suggestions */}
              {atsResult.suggestions.length > 0 && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Suggestions
                  </h3>
                  <ul className="space-y-2">
                    {atsResult.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                        <span className="text-sm text-gray-700">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Keyword Analysis */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Keyword Analysis</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Matched Keywords ({atsResult.keywordAnalysis.matched.length})</h4>
                    <div className="flex flex-wrap gap-2">
                      {atsResult.keywordAnalysis.matched.map((keyword, index) => (
                        <Badge key={index} variant="default" className="bg-green-100 text-green-800">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Missing Keywords ({atsResult.keywordAnalysis.missing.length})</h4>
                    <div className="flex flex-wrap gap-2">
                      {atsResult.keywordAnalysis.missing.slice(0, 10).map((keyword, index) => (
                        <Badge key={index} variant="outline" className="border-red-200 text-red-700">
                          {keyword}
                        </Badge>
                      ))}
                      {atsResult.keywordAnalysis.missing.length > 10 && (
                        <Badge variant="outline" className="border-gray-200 text-gray-500">
                          +{atsResult.keywordAnalysis.missing.length - 10} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </>
          ) : (
            <Card className="p-6">
              <div className="text-center py-12">
                <Target className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Analyze</h3>
                <p className="text-gray-500">Paste your resume text and click "Analyze Resume" to get started.</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
