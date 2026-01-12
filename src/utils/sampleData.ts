import { CheatSheetService } from '@/services/cheatsheetService';

export const addSampleCheatSheets = async () => {
  const sampleCheatSheets = [
    {
      title: 'JavaScript Array Methods',
      category: 'Programming',
      content: `# JavaScript Array Methods Cheat Sheet

## Array Creation
\`\`\`javascript
const arr = [1, 2, 3, 4, 5];
const arr2 = new Array(5); // [empty × 5]
const arr3 = Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']
\`\`\`

## Common Methods

### Adding/Removing Elements
- \`push()\` - Add to end
- \`pop()\` - Remove from end
- \`unshift()\` - Add to beginning
- \`shift()\` - Remove from beginning
- \`splice()\` - Add/remove at specific index

### Searching
- \`indexOf()\` - Find index of element
- \`includes()\` - Check if element exists
- \`find()\` - Find first element matching condition
- \`findIndex()\` - Find index of first matching element

### Transformation
- \`map()\` - Transform each element
- \`filter()\` - Filter elements
- \`reduce()\` - Reduce to single value
- \`sort()\` - Sort elements
- \`reverse()\` - Reverse order

### Iteration
- \`forEach()\` - Execute function for each element
- \`some()\` - Test if at least one element passes test
- \`every()\` - Test if all elements pass test

## Examples

### Map
\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]
\`\`\`

### Filter
\`\`\`javascript
const numbers = [1, 2, 3, 4, 5, 6];
const even = numbers.filter(n => n % 2 === 0); // [2, 4, 6]
\`\`\`

### Reduce
\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, curr) => acc + curr, 0); // 15
\`\`\`
`,
      tags: ['javascript', 'arrays', 'methods', 'programming'],
      authorId: 'sample-user-1',
      authorName: 'JavaScript Expert',
      likes: 15,
      views: 120,
    },
    {
      title: 'React Hooks Guide',
      category: 'Web Development',
      content: `# React Hooks Cheat Sheet

## Basic Hooks

### useState
\`\`\`javascript
const [state, setState] = useState(initialValue);

// Example
const [count, setCount] = useState(0);
const [user, setUser] = useState({ name: '', email: '' });
\`\`\`

### useEffect
\`\`\`javascript
useEffect(() => {
  // Effect logic
  return () => {
    // Cleanup (optional)
  };
}, [dependencies]); // Empty array = run once, no array = run every render
\`\`\`

### useContext
\`\`\`javascript
const value = useContext(MyContext);
\`\`\`

## Additional Hooks

### useReducer
\`\`\`javascript
const [state, dispatch] = useReducer(reducer, initialState);

// Example
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
};
\`\`\`

### useMemo
\`\`\`javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
\`\`\`

### useCallback
\`\`\`javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
\`\`\`

### useRef
\`\`\`javascript
const ref = useRef(initialValue);
// Access DOM: ref.current
\`\`\`

## Custom Hooks

### Creating Custom Hooks
\`\`\`javascript
function useCustomHook(param) {
  const [state, setState] = useState(param);

  useEffect(() => {
    // Custom logic
  }, [param]);

  return [state, setState];
}
\`\`\`

### Common Custom Hooks
- \`useLocalStorage\`
- \`useFetch\`
- \`useDebounce\`
- \`useWindowSize\`

## Rules of Hooks
1. Only call hooks at the top level
2. Only call hooks from React functions
3. Hooks must be called in the same order every time
`,
      tags: ['react', 'hooks', 'javascript', 'frontend'],
      authorId: 'sample-user-2',
      authorName: 'React Developer',
      likes: 28,
      views: 200,
    },
    {
      title: 'Git Commands',
      category: 'DevOps',
      content: `# Git Commands Cheat Sheet

## Getting Started
\`\`\`bash
git init                    # Initialize repository
git clone <url>            # Clone repository
git status                 # Check status
git log                    # View commit history
\`\`\`

## Staging & Committing
\`\`\`bash
git add <file>             # Stage specific file
git add .                  # Stage all changes
git add -A                 # Stage all changes (including deleted)
git commit -m "message"    # Commit staged changes
git commit -am "message"   # Add & commit tracked files
\`\`\`

## Branching
\`\`\`bash
git branch                 # List branches
git branch <name>          # Create branch
git checkout <branch>      # Switch branch
git checkout -b <branch>   # Create & switch
git merge <branch>         # Merge branch
git branch -d <branch>     # Delete branch
\`\`\`

## Remote Repositories
\`\`\`bash
git remote -v              # List remotes
git remote add origin <url> # Add remote
git push origin <branch>   # Push branch
git pull origin <branch>   # Pull & merge
git fetch origin           # Fetch changes
\`\`\`

## Undoing Changes
\`\`\`bash
git reset HEAD <file>      # Unstage file
git reset --soft HEAD~1    # Undo last commit (keep changes)
git reset --hard HEAD~1    # Undo last commit (discard changes)
git revert <commit>        # Create new commit that undoes changes
\`\`\`

## Stashing
\`\`\`bash
git stash                  # Stash changes
git stash list             # List stashes
git stash pop              # Apply & remove latest stash
git stash drop             # Remove latest stash
\`\`\`

## Advanced Commands
\`\`\`bash
git rebase <branch>        # Rebase current branch
git cherry-pick <commit>   # Apply specific commit
git bisect                 # Binary search for bugs
git reflog                 # Show reference logs
\`\`\`
`,
      tags: ['git', 'version-control', 'devops', 'commands'],
      authorId: 'sample-user-3',
      authorName: 'DevOps Engineer',
      likes: 42,
      views: 350,
    },
    {
      title: 'Python List Comprehensions',
      category: 'Programming',
      content: `# Python List Comprehensions

## Basic Syntax
\`\`\`python
[expression for item in iterable]
\`\`\`

## Examples

### Simple Comprehension
\`\`\`python
# Traditional approach
squares = []
for x in range(10):
    squares.append(x**2)

# List comprehension
squares = [x**2 for x in range(10)]
\`\`\`

### With Condition
\`\`\`python
# Even numbers only
evens = [x for x in range(20) if x % 2 == 0]

# Filter and transform
words = ['hello', 'world', 'python', 'code']
upper_words = [word.upper() for word in words if len(word) > 4]
\`\`\`

### Nested Comprehensions
\`\`\`python
# Matrix transpose
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
transpose = [[row[i] for row in matrix] for i in range(3)]

# Flatten nested list
nested = [[1, 2, 3], [4, 5], [6, 7, 8, 9]]
flat = [item for sublist in nested for item in sublist]
\`\`\`

## Dictionary Comprehensions
\`\`\`python
# Create dict from list
numbers = [1, 2, 3, 4, 5]
squares_dict = {x: x**2 for x in numbers}

# Filter dict
original = {'a': 1, 'b': 2, 'c': 3, 'd': 4}
filtered = {k: v for k, v in original.items() if v > 2}
\`\`\`

## Set Comprehensions
\`\`\`python
# Create set
numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
unique_squares = {x**2 for x in numbers}
\`\`\`

## Generator Expressions
\`\`\`python
# Memory efficient for large datasets
sum_squares = sum(x**2 for x in range(1000000))

# File processing
with open('large_file.txt') as f:
    lines_with_python = (line for line in f if 'python' in line.lower())
\`\`\`

## Performance Tips
- Use list comprehensions for simple transformations
- Consider readability - complex comprehensions can be hard to understand
- For very large datasets, use generator expressions
- Nested comprehensions can be less readable than loops

## Common Patterns
\`\`\`python
# Extract values from dict list
users = [{'name': 'Alice', 'age': 25}, {'name': 'Bob', 'age': 30}]
names = [user['name'] for user in users]

# Create tuples
pairs = [(x, y) for x in range(3) for y in range(3) if x != y]

# Conditional expressions
results = [x if x > 0 else 0 for x in numbers]
\`\`\`
`,
      tags: ['python', 'list-comprehension', 'programming', 'syntax'],
      authorId: 'sample-user-4',
      authorName: 'Python Developer',
      likes: 19,
      views: 180,
    },
    {
      title: 'CSS Flexbox Guide',
      category: 'Web Development',
      content: `# CSS Flexbox Cheat Sheet

## Container Properties

### display
\`\`\`css
.container {
  display: flex;        /* Block-level flex container */
  display: inline-flex; /* Inline-level flex container */
}
\`\`\`

### flex-direction
\`\`\`css
.container {
  flex-direction: row;            /* Default: left to right */
  flex-direction: row-reverse;    /* Right to left */
  flex-direction: column;         /* Top to bottom */
  flex-direction: column-reverse; /* Bottom to top */
}
\`\`\`

### flex-wrap
\`\`\`css
.container {
  flex-wrap: nowrap;     /* Default: single line */
  flex-wrap: wrap;       /* Multi-line, top to bottom */
  flex-wrap: wrap-reverse; /* Multi-line, bottom to top */
}
\`\`\`

### justify-content
\`\`\`css
.container {
  justify-content: flex-start;    /* Default: items at start */
  justify-content: flex-end;      /* Items at end */
  justify-content: center;        /* Items centered */
  justify-content: space-between; /* Equal space between items */
  justify-content: space-around;  /* Equal space around items */
  justify-content: space-evenly;  /* Equal space between and around */
}
\`\`\`

### align-items
\`\`\`css
.container {
  align-items: stretch;     /* Default: stretch to fill */
  align-items: flex-start;  /* Align to start */
  align-items: flex-end;    /* Align to end */
  align-items: center;      /* Center alignment */
  align-items: baseline;    /* Align baselines */
}
\`\`\`

### align-content
\`\`\`css
.container {
  align-content: stretch;        /* Default */
  align-content: flex-start;
  align-content: flex-end;
  align-content: center;
  align-content: space-between;
  align-content: space-around;
}
\`\`\`

## Item Properties

### flex-grow
\`\`\`css
.item {
  flex-grow: 0; /* Default: don't grow */
  flex-grow: 1; /* Grow to fill available space */
  flex-grow: 2; /* Grow twice as much as flex-grow: 1 */
}
\`\`\`

### flex-shrink
\`\`\`css
.item {
  flex-shrink: 1; /* Default: shrink if needed */
  flex-shrink: 0; /* Don't shrink */
}
\`\`\`

### flex-basis
\`\`\`css
.item {
  flex-basis: auto;    /* Default: size based on content */
  flex-basis: 200px;   /* Fixed basis */
  flex-basis: 50%;     /* Percentage basis */
}
\`\`\`

### flex (shorthand)
\`\`\`css
.item {
  flex: 1 1 auto;     /* flex-grow flex-shrink flex-basis */
  flex: 1;            /* flex: 1 1 0% */
  flex: 2;            /* flex: 2 1 0% */
  flex: none;         /* flex: 0 0 auto */
}
\`\`\`

### align-self
\`\`\`css
.item {
  align-self: auto;       /* Default: inherit from parent */
  align-self: flex-start;
  align-self: flex-end;
  align-self: center;
  align-self: baseline;
  align-self: stretch;
}
\`\`\`

## Common Layouts

### Holy Grail Layout
\`\`\`css
.container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  flex: 0 0 200px;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
}

.footer {
  flex: 0 0 50px;
}
\`\`\`

### Card Grid
\`\`\`css
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex: 1 1 300px;
}
\`\`\`

### Navigation Bar
\`\`\`css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
}
\`\`\`

## Browser Support
- Chrome 29+
- Firefox 28+
- Safari 9+
- Edge 12+
- IE 11+ (partial)

## Tips
- Flexbox is one-dimensional (row or column)
- Use \`flex-basis\` for initial size, \`flex-grow\` for growth
- Order matters: justify-content for main axis, align-items for cross axis
- Flex items are equal height by default
- Use \`flex-wrap\` for responsive layouts
`,
      tags: ['css', 'flexbox', 'layout', 'web-development'],
      authorId: 'sample-user-5',
      authorName: 'CSS Expert',
      likes: 31,
      views: 275,
    }
  ];

  try {
    for (const sheet of sampleCheatSheets) {
      await CheatSheetService.createCheatSheet(sheet);
      console.log(`Added cheat sheet: ${sheet.title}`);
    }
    console.log('Sample data added successfully!');
  } catch (error) {
    console.error('Error adding sample data:', error);
  }
};
