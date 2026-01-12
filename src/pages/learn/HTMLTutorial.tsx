import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ChevronLeft,
  ChevronRight,
  Home,
  BookOpen,
  Code,
  Play,
  Copy,
  Check
} from 'lucide-react';

const sidebarMenu = [
  { title: 'HTML HOME', path: '/learn/html' },
  { title: 'HTML Introduction', path: '/learn/html/intro' },
  { title: 'HTML Editors', path: '/learn/html/editors' },
  { title: 'HTML Basic', path: '/learn/html/basic' },
  { title: 'HTML Elements', path: '/learn/html/elements' },
  { title: 'HTML Attributes', path: '/learn/html/attributes' },
  { title: 'HTML Headings', path: '/learn/html/headings' },
  { title: 'HTML Paragraphs', path: '/learn/html/paragraphs' },
  { title: 'HTML Styles', path: '/learn/html/styles' },
  { title: 'HTML Formatting', path: '/learn/html/formatting' },
  { title: 'HTML Quotations', path: '/learn/html/quotations' },
  { title: 'HTML Comments', path: '/learn/html/comments' },
  { title: 'HTML Colors', path: '/learn/html/colors' },
  { title: 'HTML Links', path: '/learn/html/links' },
  { title: 'HTML Images', path: '/learn/html/images' },
  { title: 'HTML Tables', path: '/learn/html/tables' },
  { title: 'HTML Lists', path: '/learn/html/lists' },
  { title: 'HTML Forms', path: '/learn/html/forms' },
];

export default function HTMLTutorial() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exampleCode = `<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>

</body>
</html>`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/15 to-blue-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/15 to-pink-600/15 rounded-full blur-3xl"></div>
      </div>
      <Navbar user={user} />

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 bg-white/95 backdrop-blur-xl border-r border-gray-200/50 fixed left-0 top-16 bottom-0 overflow-y-auto shadow-xl z-10">
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">HTML Tutorial</h2>
            <nav className="space-y-1">
              {sidebarMenu.map((item, index) => (
                <button
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${
                    index === 0
                      ? 'bg-green-600 text-white font-medium'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <button onClick={() => navigate('/learn')} className="hover:text-green-600">
                <Home className="h-4 w-4" />
              </button>
              <ChevronRight className="h-4 w-4" />
              <span>HTML</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900 font-medium">Introduction</span>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mb-6">
              <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Content */}
            <article className="prose prose-lg max-w-none">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">HTML Introduction</h1>
              
              <p className="text-lg text-gray-700 mb-6">
                HTML is the standard markup language for creating Web pages.
              </p>

              <Card className="bg-green-50 border-l-4 border-green-600 p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">What is HTML?</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• HTML stands for Hyper Text Markup Language</li>
                  <li>• HTML is the standard markup language for creating Web pages</li>
                  <li>• HTML describes the structure of a Web page</li>
                  <li>• HTML consists of a series of elements</li>
                  <li>• HTML elements tell the browser how to display the content</li>
                </ul>
              </Card>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">A Simple HTML Document</h2>

              {/* Code Example */}
              <Card className="bg-gray-900 text-white p-6 mb-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-green-400" />
                    <span className="text-sm font-medium text-gray-300">Example</span>
                  </div>
                  <button
                    onClick={() => handleCopy(exampleCode)}
                    className="flex items-center gap-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-sm transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-green-400" />
                        <span className="text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="overflow-x-auto">
                  <code className="text-sm font-mono">{exampleCode}</code>
                </pre>
              </Card>

              <Button className="bg-green-600 hover:bg-green-700 text-white mb-8">
                <Play className="h-4 w-4 mr-2" />
                Try it Yourself
              </Button>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Example Explained</h2>
              
              <div className="space-y-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono text-red-600">&lt;!DOCTYPE html&gt;</code> declaration defines that this document is an HTML5 document
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono text-red-600">&lt;html&gt;</code> element is the root element of an HTML page
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono text-red-600">&lt;head&gt;</code> element contains meta information about the HTML page
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono text-red-600">&lt;title&gt;</code> element specifies a title for the HTML page
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono text-red-600">&lt;body&gt;</code> element defines the document's body
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono text-red-600">&lt;h1&gt;</code> element defines a large heading
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono text-red-600">&lt;p&gt;</code> element defines a paragraph
                  </p>
                </div>
              </div>

              <Card className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-2">💡 Note</h3>
                <p className="text-gray-700">
                  HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects such as interactive forms may be embedded into the rendered page.
                </p>
              </Card>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">What is an HTML Element?</h2>
              
              <p className="text-gray-700 mb-6">
                An HTML element is defined by a start tag, some content, and an end tag:
              </p>

              <Card className="bg-gray-50 p-6 mb-8">
                <code className="text-lg font-mono text-gray-900">
                  &lt;tagname&gt; Content goes here... &lt;/tagname&gt;
                </code>
              </Card>

              <p className="text-gray-700 mb-8">
                The HTML element is everything from the start tag to the end tag:
              </p>

              <div className="space-y-3 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                  <code className="text-red-600">&lt;h1&gt;</code>
                  <span className="text-gray-900">My First Heading</span>
                  <code className="text-red-600">&lt;/h1&gt;</code>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                  <code className="text-red-600">&lt;p&gt;</code>
                  <span className="text-gray-900">My first paragraph.</span>
                  <code className="text-red-600">&lt;/p&gt;</code>
                </div>
              </div>
            </article>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
              <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
