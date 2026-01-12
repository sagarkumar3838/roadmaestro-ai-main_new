import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Tooltip from './Tooltip';

interface MarkdownRendererProps {
  content: string;
  descriptions?: Record<string, string>;
}

// Dynamic description service - can be extended to fetch from backend
const getDynamicDescription = (elementType: string, customDescriptions?: Record<string, string>, content?: string): string => {
  // Default descriptions - can be expanded
  const defaultDescriptions: Record<string, string> = {
    'li': 'List item - Click to interact or expand',
    'code': 'Click to copy this code snippet',
    'code-block': 'Code block - Hover to see language details',
    'blockquote': 'Blockquote - Important information or citation',
  };

  // Merge with custom descriptions if provided
  const allDescriptions = { ...defaultDescriptions, ...(customDescriptions || {}) };

  // You can extend this to make actual API calls
  return allDescriptions[elementType] || `Dynamic description for ${elementType}`;
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, descriptions }) => {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <ReactMarkdown
        components={{
          code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <Tooltip
                title={`Code Block - ${match[1].toUpperCase()}`}
                content={`Click to select this ${match[1]} code block. Language: ${match[1]}`}
              >
                <div className="cursor-pointer hover:opacity-80 transition-opacity">
                  <SyntaxHighlighter
                    style={oneDark as any}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-md"
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              </Tooltip>
            ) : (
              <Tooltip content="Click to copy this inline code">
                <code className="bg-muted px-1 py-0.5 rounded text-sm cursor-pointer hover:bg-muted/80 transition-colors" {...props}>
                  {children}
                </code>
              </Tooltip>
            );
          },
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mb-4 mt-8 first:mt-0">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold mb-3 mt-6">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold mb-2 mt-4">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mb-4 ml-6 list-disc space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 ml-6 list-decimal space-y-1">{children}</ol>
          ),
          li: ({ children }) => {
            const textContent = React.Children.toArray(children).join('').toLowerCase();
            const dynamicContent = getDynamicDescription('li', descriptions, textContent);
            return (
              <Tooltip content={dynamicContent}>
                <li className="leading-relaxed cursor-pointer hover:bg-muted/30 transition-colors p-1 rounded-md">{children}</li>
              </Tooltip>
            );
          },
          blockquote: ({ children }) => (
            <Tooltip content="Blockquote - Important information or citation">
              <blockquote className="border-l-4 border-teal-500 pl-4 italic my-4 text-muted-foreground cursor-pointer hover:bg-muted/30 transition-colors p-2 rounded-r-md">
                {children}
              </blockquote>
            </Tooltip>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border-collapse border border-border">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-border px-4 py-2 bg-muted font-semibold text-left">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-border px-4 py-2">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
