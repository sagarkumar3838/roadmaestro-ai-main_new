export interface JavaModuleContent {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'advanced';
  estimatedTime: string;
  sections: ModuleSection[];
  quiz: QuizQuestion[];
  points: number;
}

export interface ModuleSection {
  id: string;
  title: string;
  content: string;
  codeExamples?: CodeExample[];
  keyPoints: string[];
}

export interface CodeExample {
  title: string;
  code: string;
  language: string;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

export const JAVA_MODULES: Record<string, JavaModuleContent> = {
  'java-basics': {
    id: 'java-basics',
    title: 'Java Fundamentals',
    description: 'Variables, data types, operators',
    difficulty: 'easy',
    estimatedTime: '2 hours',
    points: 10,
    sections: [
      {
        id: 'introduction',
        title: 'Introduction to Java',
        content: `
# Introduction to Java

Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible. It is a general-purpose programming language intended to let programmers write once, run anywhere (WORA).

## What is Java?

Java was originally developed by James Gosling at Sun Microsystems and released in May 1995. Java applications are typically compiled to bytecode that can run on any Java virtual machine (JVM) regardless of the underlying computer architecture.

## Key Features of Java:

- **Platform Independent**: Java code can run on multiple platforms without modification
- **Object-Oriented**: Everything in Java is an object which makes it easy to extend and maintain
- **Simple**: Java syntax is clean and easy to understand
- **Secure**: Java provides a secure environment for developing applications
- **Robust**: Java has strong memory management and exception handling
- **Multithreaded**: Java supports multithreaded programming
        `,
        keyPoints: [
          'Java is platform-independent',
          'Java follows "Write Once, Run Anywhere" principle',
          'Java is object-oriented programming language',
          'Java code is compiled to bytecode',
          'JVM executes Java bytecode'
        ]
      },
      {
        id: 'variables',
        title: 'Variables and Data Types',
        content: `
# Variables and Data Types

A variable is a container that holds data that can be changed during the execution of a program. In Java, every variable must be declared with a data type.

## Variable Declaration

To declare a variable in Java, you specify the data type followed by the variable name:

\`\`\`java
dataType variableName;
\`\`\`

## Primitive Data Types

Java has 8 primitive data types:

### Numeric Types:
- **byte**: 8-bit signed integer (-128 to 127)
- **short**: 16-bit signed integer (-32,768 to 32,767)
- **int**: 32-bit signed integer (-2^31 to 2^31-1)
- **long**: 64-bit signed integer (-2^63 to 2^63-1)
- **float**: 32-bit floating point
- **double**: 64-bit floating point

### Other Types:
- **boolean**: true or false
- **char**: 16-bit Unicode character

## Variable Initialization

You can initialize variables when declaring them:

\`\`\`java
int age = 25;
double salary = 50000.50;
boolean isActive = true;
char grade = 'A';
\`\`\`
        `,
        codeExamples: [
          {
            title: 'Variable Declaration and Initialization',
            language: 'java',
            code: `public class Variables {
    public static void main(String[] args) {
        // Integer variables
        int age = 25;
        long population = 7800000000L;
        
        // Floating point variables
        double price = 99.99;
        float temperature = 36.5f;
        
        // Boolean and character
        boolean isStudent = true;
        char grade = 'A';
        
        // Print variables
        System.out.println("Age: " + age);
        System.out.println("Population: " + population);
        System.out.println("Price: $" + price);
        System.out.println("Temperature: " + temperature + "°C");
        System.out.println("Is Student: " + isStudent);
        System.out.println("Grade: " + grade);
    }
}`,
            explanation: 'This example demonstrates how to declare and initialize different types of variables in Java.'
          }
        ],
        keyPoints: [
          'Variables must be declared with a data type',
          'Java has 8 primitive data types',
          'Variables can be initialized during declaration',
          'Use appropriate suffixes for long (L) and float (f)',
          'Variable names should follow camelCase convention'
        ]
      },
      {
        id: 'operators',
        title: 'Operators in Java',
        content: `
# Operators in Java

Operators are special symbols that perform specific operations on one, two, or three operands, and then return a result.

## Types of Operators

### 1. Arithmetic Operators
- **+** Addition
- **-** Subtraction
- ***** Multiplication
- **/** Division
- **%** Modulus (remainder)

### 2. Assignment Operators
- **=** Simple assignment
- **+=** Add and assign
- **-=** Subtract and assign
- ***=** Multiply and assign
- **/=** Divide and assign
- **%=** Modulus and assign

### 3. Comparison Operators
- **==** Equal to
- **!=** Not equal to
- **>** Greater than
- **<** Less than
- **>=** Greater than or equal to
- **<=** Less than or equal to

### 4. Logical Operators
- **&&** Logical AND
- **||** Logical OR
- **!** Logical NOT

### 5. Increment/Decrement Operators
- **++** Increment by 1
- **--** Decrement by 1
        `,
        codeExamples: [
          {
            title: 'Arithmetic Operations',
            language: 'java',
            code: `public class ArithmeticOperators {
    public static void main(String[] args) {
        int a = 10;
        int b = 3;
        
        System.out.println("a + b = " + (a + b)); // 13
        System.out.println("a - b = " + (a - b)); // 7
        System.out.println("a * b = " + (a * b)); // 30
        System.out.println("a / b = " + (a / b)); // 3
        System.out.println("a % b = " + (a % b)); // 1
    }
}`,
            explanation: 'Basic arithmetic operations in Java with integer operands.'
          },
          {
            title: 'Comparison and Logical Operations',
            language: 'java',
            code: `public class ComparisonOperators {
    public static void main(String[] args) {
        int x = 5;
        int y = 10;
        boolean isActive = true;
        
        // Comparison operators
        System.out.println("x == y: " + (x == y)); // false
        System.out.println("x < y: " + (x < y));   // true
        System.out.println("x >= y: " + (x >= y)); // false
        
        // Logical operators
        System.out.println("x < y && isActive: " + (x < y && isActive)); // true
        System.out.println("x > y || isActive: " + (x > y || isActive)); // true
        System.out.println("!isActive: " + (!isActive)); // false
    }
}`,
            explanation: 'Examples of comparison and logical operators in Java.'
          }
        ],
        keyPoints: [
          'Arithmetic operators perform mathematical calculations',
          'Assignment operators assign values to variables',
          'Comparison operators return boolean values',
          'Logical operators work with boolean operands',
          'Increment/decrement operators modify variable values by 1'
        ]
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Which of the following is NOT a primitive data type in Java?',
        options: ['int', 'String', 'boolean', 'char'],
        correctAnswer: 1,
        explanation: 'String is not a primitive data type in Java. It is a class that represents a sequence of characters.',
        points: 2
      },
      {
        id: 'q2',
        question: 'What is the size of an int data type in Java?',
        options: ['8 bits', '16 bits', '32 bits', '64 bits'],
        correctAnswer: 2,
        explanation: 'An int data type in Java is 32 bits (4 bytes) in size.',
        points: 2
      },
      {
        id: 'q3',
        question: 'What will be the result of 10 % 3 in Java?',
        options: ['3', '1', '0', '10'],
        correctAnswer: 1,
        explanation: 'The modulus operator (%) returns the remainder of division. 10 divided by 3 is 3 with remainder 1.',
        points: 2
      },
      {
        id: 'q4',
        question: 'Which operator is used for logical AND in Java?',
        options: ['&', '&&', '|', '||'],
        correctAnswer: 1,
        explanation: '&& is the logical AND operator in Java. It returns true only if both operands are true.',
        points: 2
      },
      {
        id: 'q5',
        question: 'What is the correct way to declare a variable in Java?',
        options: ['var age = 25;', 'int age = 25;', 'age = 25;', 'declare int age = 25;'],
        correctAnswer: 1,
        explanation: 'In Java, variables must be declared with their data type followed by the variable name: int age = 25;',
        points: 2
      }
    ]
  },
  
  'oop-basics': {
    id: 'oop-basics',
    title: 'OOP Concepts',
    description: 'Classes, objects, inheritance',
    difficulty: 'easy',
    estimatedTime: '3 hours',
    points: 10,
    sections: [
      {
        id: 'classes-objects',
        title: 'Classes and Objects',
        content: `
# Classes and Objects

Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects", which can contain data and code: data in the form of fields (often known as attributes or properties), and code, in the form of procedures (often known as methods).

## What is a Class?

A class is a blueprint or template for creating objects. It defines the properties (attributes) and behaviors (methods) that objects of that type will have.

## What is an Object?

An object is an instance of a class. When a class is defined, no memory is allocated until an object of that class is created.

## Class Syntax

\`\`\`java
public class ClassName {
    // Fields (attributes)
    dataType fieldName;
    
    // Constructor
    public ClassName() {
        // initialization code
    }
    
    // Methods
    public returnType methodName() {
        // method body
    }
}
\`\`\`
        `,
        codeExamples: [
          {
            title: 'Simple Class Example',
            language: 'java',
            code: `public class Student {
    // Fields
    private String name;
    private int age;
    private String studentId;
    
    // Constructor
    public Student(String name, int age, String studentId) {
        this.name = name;
        this.age = age;
        this.studentId = studentId;
    }
    
    // Methods
    public void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Student ID: " + studentId);
    }
    
    // Getter methods
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
}

// Using the class
public class Main {
    public static void main(String[] args) {
        // Creating objects
        Student student1 = new Student("John Doe", 20, "S001");
        Student student2 = new Student("Jane Smith", 19, "S002");
        
        // Using objects
        student1.displayInfo();
        student2.displayInfo();
    }
}`,
            explanation: 'This example shows how to create a class with fields, constructor, and methods, and how to create and use objects.'
          }
        ],
        keyPoints: [
          'A class is a blueprint for creating objects',
          'Objects are instances of classes',
          'Classes contain fields (data) and methods (behavior)',
          'Use constructors to initialize objects',
          'Access modifiers control visibility of class members'
        ]
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is a class in Java?',
        options: ['An object', 'A method', 'A blueprint for creating objects', 'A variable'],
        correctAnswer: 2,
        explanation: 'A class is a blueprint or template that defines the structure and behavior of objects.',
        points: 2
      },
      {
        id: 'q2',
        question: 'Which keyword is used to create an object in Java?',
        options: ['create', 'new', 'object', 'instance'],
        correctAnswer: 1,
        explanation: 'The "new" keyword is used to create objects in Java.',
        points: 2
      }
    ]
  }
};

export function getModuleById(moduleId: string): JavaModuleContent | undefined {
  return JAVA_MODULES[moduleId];
}

export function getAllModules(): JavaModuleContent[] {
  return Object.values(JAVA_MODULES);
}