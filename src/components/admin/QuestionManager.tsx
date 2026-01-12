import React, { useState } from 'react';
import { QuestionService } from '../../services/questionService';
import { Question, Skill, Difficulty } from '../../types/question';
import { convertToJSON, parseQuestionJSON, downloadJSON, readJSONFile, validateQuestions } from '../../utils/questionConverter';
import { Upload, Download, Plus, Trash2, Edit, Save, X } from 'lucide-react';

export const QuestionManager: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill>('html');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const skills: Skill[] = ['html', 'css', 'jquery', 'devtools', 'javascript'];
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'advanced'];

  // Load questions from Firebase
  const loadQuestions = async () => {
    setLoading(true);
    try {
      const loadedQuestions = await QuestionService.getQuestions(selectedSkill, selectedDifficulty);
      setQuestions(loadedQuestions);
      showMessage('success', `Loaded ${loadedQuestions.length} questions`);
    } catch (error) {
      showMessage('error', 'Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  // Export questions to JSON
  const handleExport = async () => {
    try {
      const jsonData = convertToJSON(questions, selectedSkill, selectedDifficulty);
      downloadJSON(jsonData, `${selectedSkill}-${selectedDifficulty}-questions.json`);
      showMessage('success', 'Questions exported successfully');
    } catch (error) {
      showMessage('error', 'Failed to export questions');
    }
  };

  // Import questions from JSON
  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const jsonString = await readJSONFile(file);
      const importedQuestions = parseQuestionJSON(jsonString);
      
      // Validate questions
      const validation = validateQuestions(importedQuestions);
      if (!validation.valid) {
        showMessage('error', `Validation failed: ${validation.errors.join(', ')}`);
        return;
      }

      // Upload to Firebase
      await QuestionService.addQuestionsBatch(importedQuestions);
      showMessage('success', `Imported ${importedQuestions.length} questions`);
      loadQuestions();
    } catch (error) {
      showMessage('error', 'Failed to import questions');
    } finally {
      setLoading(false);
    }
  };

  // Delete question
  const handleDelete = async (questionId: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return;

    try {
      await QuestionService.deleteQuestion(questionId);
      setQuestions(questions.filter(q => q.id !== questionId));
      showMessage('success', 'Question deleted');
    } catch (error) {
      showMessage('error', 'Failed to delete question');
    }
  };

  // Save edited question
  const handleSave = async () => {
    if (!editingQuestion) return;

    try {
      await QuestionService.updateQuestion(editingQuestion.id, editingQuestion);
      setQuestions(questions.map(q => q.id === editingQuestion.id ? editingQuestion : q));
      setEditingQuestion(null);
      showMessage('success', 'Question updated');
    } catch (error) {
      showMessage('error', 'Failed to update question');
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Question Manager</h1>

      {/* Message */}
      {message && (
        <div className={`mb-4 p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Skill</label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value as Skill)}
              className="w-full p-2 border rounded"
            >
              {skills.map(skill => (
                <option key={skill} value={skill}>{skill.toUpperCase()}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty)}
              className="w-full p-2 border rounded"
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff}>{diff.charAt(0).toUpperCase() + diff.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={loadQuestions}
              disabled={loading}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Load Questions'}
            </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleExport}
            disabled={questions.length === 0}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            <Download size={20} />
            Export to JSON
          </button>

          <label className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 cursor-pointer">
            <Upload size={20} />
            Import from JSON
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Questions List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">
            Questions ({questions.length})
          </h2>
        </div>

        <div className="divide-y">
          {questions.map((question) => (
            <div key={question.id} className="p-4">
              {editingQuestion?.id === question.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editingQuestion.text}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, text: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  
                  {editingQuestion.type === 'multiple-choice' && (
                    <div className="space-y-2">
                      {editingQuestion.options?.map((option, idx) => (
                        <input
                          key={idx}
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...(editingQuestion.options || [])];
                            newOptions[idx] = e.target.value;
                            setEditingQuestion({ ...editingQuestion, options: newOptions });
                          }}
                          className="w-full p-2 border rounded"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      <Save size={16} />
                      Save
                    </button>
                    <button
                      onClick={() => setEditingQuestion(null)}
                      className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="font-medium">{question.text}</p>
                      <p className="text-sm text-gray-500 mt-1">ID: {question.id}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingQuestion(question)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(question.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {question.type === 'multiple-choice' && question.options && (
                    <div className="mt-2 space-y-1">
                      {question.options.map((option, idx) => (
                        <div
                          key={idx}
                          className={`text-sm p-2 rounded ${idx === question.correctAnswer ? 'bg-green-50 text-green-800' : 'bg-gray-50'}`}
                        >
                          {idx + 1}. {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {questions.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No questions found. Load questions or import from JSON.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
