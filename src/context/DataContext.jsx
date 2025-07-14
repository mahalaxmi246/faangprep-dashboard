import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveToLocalStorage, getFromLocalStorage, STORAGE_KEYS } from '../utils/localStorage';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  // DSA Topics State
  const [dsaTopics, setDsaTopics] = useState([]);
  
  // System Design Topics State
  const [systemDesignTopics, setSystemDesignTopics] = useState([]);
  
  // Resume Checklist State
  const [resumeChecklist, setResumeChecklist] = useState([]);
  
  // Mock Interviews State
  const [mockInterviews, setMockInterviews] = useState([]);
  
  // Roadmap State
  const [roadmapData, setRoadmapData] = useState([]);
  
  // System Design Roadmap State
  const [systemDesignRoadmap, setSystemDesignRoadmap] = useState([]);

  // Initialize default data
  const initializeDefaultData = () => {
    const defaultDsaTopics = [
      {
        id: 1,
        name: 'Arrays',
        icon: '📊',
        subtopics: [
          { id: 1, name: 'Two Sum', completed: false, difficulty: 'Easy' },
          { id: 2, name: 'Best Time to Buy and Sell Stock', completed: false, difficulty: 'Easy' },
          { id: 3, name: 'Contains Duplicate', completed: false, difficulty: 'Easy' },
          { id: 4, name: 'Maximum Subarray', completed: false, difficulty: 'Medium' },
          { id: 5, name: 'Product of Array Except Self', completed: false, difficulty: 'Medium' },
          { id: 6, name: 'Trapping Rain Water', completed: false, difficulty: 'Hard' },
        ],
      },
      {
        id: 2,
        name: 'Linked Lists',
        icon: '🔗',
        subtopics: [
          { id: 7, name: 'Reverse Linked List', completed: false, difficulty: 'Easy' },
          { id: 8, name: 'Merge Two Sorted Lists', completed: false, difficulty: 'Easy' },
          { id: 9, name: 'Linked List Cycle', completed: false, difficulty: 'Easy' },
          { id: 10, name: 'Remove Nth Node From End', completed: false, difficulty: 'Medium' },
          { id: 11, name: 'Copy List with Random Pointer', completed: false, difficulty: 'Medium' },
        ],
      },
      {
        id: 3,
        name: 'Trees',
        icon: '🌳',
        subtopics: [
          { id: 12, name: 'Binary Tree Inorder Traversal', completed: false, difficulty: 'Easy' },
          { id: 13, name: 'Maximum Depth of Binary Tree', completed: false, difficulty: 'Easy' },
          { id: 14, name: 'Validate Binary Search Tree', completed: false, difficulty: 'Medium' },
          { id: 15, name: 'Binary Tree Level Order Traversal', completed: false, difficulty: 'Medium' },
          { id: 16, name: 'Serialize and Deserialize Binary Tree', completed: false, difficulty: 'Hard' },
        ],
      },
      {
        id: 4,
        name: 'Dynamic Programming',
        icon: '🧠',
        subtopics: [
          { id: 17, name: 'Climbing Stairs', completed: false, difficulty: 'Easy' },
          { id: 18, name: 'House Robber', completed: false, difficulty: 'Medium' },
          { id: 19, name: 'Coin Change', completed: false, difficulty: 'Medium' },
          { id: 20, name: 'Longest Increasing Subsequence', completed: false, difficulty: 'Medium' },
          { id: 21, name: 'Edit Distance', completed: false, difficulty: 'Hard' },
        ],
      },
      {
        id: 5,
        name: 'Graphs',
        icon: '🌐',
        subtopics: [
          { id: 22, name: 'Number of Islands', completed: false, difficulty: 'Medium' },
          { id: 23, name: 'Course Schedule', completed: false, difficulty: 'Medium' },
          { id: 24, name: 'Clone Graph', completed: false, difficulty: 'Medium' },
          { id: 25, name: 'Word Ladder', completed: false, difficulty: 'Hard' },
        ],
      },
    ];

    const defaultSystemDesignTopics = [
      {
        id: 1,
        title: 'Scalability Fundamentals',
        description: 'Understanding horizontal vs vertical scaling, load balancing basics',
        completed: false,
        difficulty: 'Beginner',
        notes: '',
        category: 'Fundamentals',
      },
      {
        id: 2,
        title: 'Database Design & Selection',
        description: 'SQL vs NoSQL, ACID properties, CAP theorem',
        completed: false,
        difficulty: 'Intermediate',
        notes: '',
        category: 'Databases',
      },
      {
        id: 3,
        title: 'Caching Strategies',
        description: 'Redis, Memcached, cache patterns, cache invalidation',
        completed: false,
        difficulty: 'Intermediate',
        notes: '',
        category: 'Caching',
      },
      {
        id: 4,
        title: 'Message Queues & Pub/Sub',
        description: 'Kafka, RabbitMQ, async processing patterns',
        completed: false,
        difficulty: 'Intermediate',
        notes: '',
        category: 'Messaging',
      },
      {
        id: 5,
        title: 'Microservices Architecture',
        description: 'Service decomposition, API gateways, service discovery',
        completed: false,
        difficulty: 'Advanced',
        notes: '',
        category: 'Architecture',
      },
      {
        id: 6,
        title: 'Design a Chat System',
        description: 'Real-time messaging, WebSockets, message delivery guarantees',
        completed: false,
        difficulty: 'Advanced',
        notes: '',
        category: 'Case Studies',
      },
      {
        id: 7,
        title: 'Design a URL Shortener',
        description: 'Like bit.ly or tinyurl, custom short URLs, analytics',
        completed: false,
        difficulty: 'Intermediate',
        notes: '',
        category: 'Case Studies',
      },
      {
        id: 8,
        title: 'Design a Social Media Feed',
        description: 'Timeline generation, fanout strategies, content ranking',
        completed: false,
        difficulty: 'Advanced',
        notes: '',
        category: 'Case Studies',
      },
      {
        id: 9,
        title: 'Monitoring & Observability',
        description: 'Metrics, logging, tracing, alerting systems',
        completed: false,
        difficulty: 'Intermediate',
        notes: '',
        category: 'Operations',
      },
    ];

    const defaultResumeChecklist = [
      {
        id: 1,
        category: 'Format & Structure',
        task: 'One-page resume format',
        description: 'Keep resume to exactly one page for optimal ATS parsing',
        completed: false,
        priority: 'High',
      },
      {
        id: 2,
        category: 'Format & Structure',
        task: 'Professional email address',
        description: 'Use firstname.lastname@domain.com format',
        completed: false,
        priority: 'High',
      },
      {
        id: 3,
        category: 'Format & Structure',
        task: 'LinkedIn profile URL',
        description: 'Include customized LinkedIn URL',
        completed: false,
        priority: 'Medium',
      },
      {
        id: 4,
        category: 'Format & Structure',
        task: 'GitHub profile link',
        description: 'Include active GitHub profile with pinned repositories',
        completed: false,
        priority: 'High',
      },
      {
        id: 5,
        category: 'Content',
        task: 'Technical skills section',
        description: 'List programming languages, frameworks, tools, and technologies',
        completed: false,
        priority: 'High',
      },
      {
        id: 6,
        category: 'Content',
        task: 'Project descriptions with impact',
        description: 'Include 2-3 impactful projects with technologies and results',
        completed: false,
        priority: 'High',
      },
      {
        id: 7,
        category: 'Content',
        task: 'Quantified achievements',
        description: 'Use numbers and metrics wherever possible (performance improvements, user impact)',
        completed: false,
        priority: 'High',
      },
      {
        id: 8,
        category: 'Content',
        task: 'Action verbs',
        description: 'Start bullet points with strong action verbs (Built, Designed, Implemented)',
        completed: false,
        priority: 'Medium',
      },
      {
        id: 9,
        category: 'ATS Optimization',
        task: 'Keyword optimization',
        description: 'Include relevant keywords from job descriptions',
        completed: false,
        priority: 'High',
      },
      {
        id: 10,
        category: 'ATS Optimization',
        task: 'Standard section headers',
        description: 'Use conventional headers like "Experience", "Education", "Skills"',
        completed: false,
        priority: 'Medium',
      },
      {
        id: 11,
        category: 'ATS Optimization',
        task: 'Simple formatting',
        description: 'Avoid complex formatting, tables, images, or graphics',
        completed: false,
        priority: 'High',
      },
      {
        id: 12,
        category: 'ATS Optimization',
        task: 'Standard font',
        description: 'Use ATS-friendly fonts like Arial, Calibri, or Times New Roman',
        completed: false,
        priority: 'Medium',
      },
      {
        id: 13,
        category: 'Review & Polish',
        task: 'Spelling and grammar check',
        description: 'Proofread multiple times and use tools like Grammarly',
        completed: false,
        priority: 'High',
      },
      {
        id: 14,
        category: 'Review & Polish',
        task: 'Peer review',
        description: 'Get feedback from experienced professionals or career counselors',
        completed: false,
        priority: 'Medium',
      },
      {
        id: 15,
        category: 'Review & Polish',
        task: 'ATS score testing',
        description: 'Test resume with ATS tools like Jobscan or Resume Worded',
        completed: false,
        priority: 'High',
      },
      {
        id: 16,
        category: 'Review & Polish',
        task: 'Multiple format versions',
        description: 'Save in PDF, DOC, and plain text formats',
        completed: false,
        priority: 'Low',
      },
    ];

    const defaultRoadmapData = [
      {
        week: 1,
        title: 'Foundation & Setup',
        topics: ['Setup coding environment', 'Choose programming language', 'Basic DS review', 'LeetCode account setup'],
        completed: false,
        phase: 'Foundation',
      },
      {
        week: 2,
        title: 'Arrays & Strings',
        topics: ['Array fundamentals', 'Two pointers technique', 'Sliding window', 'String manipulation'],
        completed: false,
        phase: 'Foundation',
      },
      {
        week: 3,
        title: 'Linked Lists',
        topics: ['Singly/Doubly linked lists', 'Reverse operations', 'Cycle detection', 'Merge operations'],
        completed: false,
        phase: 'Foundation',
      },
      {
        week: 4,
        title: 'Stacks & Queues',
        topics: ['Stack operations', 'Queue operations', 'Monotonic stack', 'Deque applications'],
        completed: false,
        phase: 'Foundation',
      },
      {
        week: 5,
        title: 'Hash Tables & Sets',
        topics: ['HashMap operations', 'HashSet usage', 'Frequency counting', 'Two sum variations'],
        completed: false,
        phase: 'Foundation',
      },
      {
        week: 6,
        title: 'Binary Trees Basics',
        topics: ['Tree traversals', 'Tree construction', 'Path problems', 'Tree properties'],
        completed: false,
        phase: 'Intermediate',
      },
      {
        week: 7,
        title: 'Binary Search Trees',
        topics: ['BST operations', 'BST validation', 'Inorder successor', 'BST to sorted array'],
        completed: false,
        phase: 'Intermediate',
      },
      {
        week: 8,
        title: 'Heaps & Priority Queues',
        topics: ['Min/Max heap', 'Heap operations', 'Top K problems', 'Merge K sorted'],
        completed: false,
        phase: 'Intermediate',
      },
      {
        week: 9,
        title: 'Graphs - BFS/DFS',
        topics: ['Graph representation', 'BFS implementation', 'DFS implementation', 'Connected components'],
        completed: false,
        phase: 'Intermediate',
      },
      {
        week: 10,
        title: 'Advanced Graph Algorithms',
        topics: ['Topological sort', 'Dijkstra\'s algorithm', 'Union Find', 'Minimum spanning tree'],
        completed: false,
        phase: 'Advanced',
      },
      {
        week: 11,
        title: 'Dynamic Programming - 1D',
        topics: ['Basic DP concepts', 'Fibonacci variations', 'House robber', 'Climbing stairs'],
        completed: false,
        phase: 'Advanced',
      },
      {
        week: 12,
        title: 'Dynamic Programming - 2D',
        topics: ['Grid DP', 'Longest common subsequence', 'Edit distance', 'Knapsack problem'],
        completed: false,
        phase: 'Advanced',
      },
    ];

    const defaultSystemDesignRoadmap = [
      {
        week: 1,
        title: 'System Design Fundamentals',
        topics: ['Scalability basics', 'Load balancing', 'CDN concepts', 'Caching strategies'],
        phase: 'Foundation',
        completed: false,
      },
      {
        week: 2,
        title: 'Database Design',
        topics: ['SQL vs NoSQL', 'ACID properties', 'CAP theorem', 'Database sharding'],
        phase: 'Foundation',
        completed: false,
      },
      {
        week: 3,
        title: 'Microservices & APIs',
        topics: ['Microservices architecture', 'API design', 'Service discovery', 'API gateways'],
        phase: 'Intermediate',
        completed: false,
      },
      {
        week: 4,
        title: 'Message Queues & Streams',
        topics: ['Kafka basics', 'RabbitMQ', 'Pub/Sub patterns', 'Event-driven architecture'],
        phase: 'Intermediate',
        completed: false,
      },
      {
        week: 5,
        title: 'Case Study - URL Shortener',
        topics: ['Requirements gathering', 'Database design', 'API design', 'Scaling strategies'],
        phase: 'Practice',
        completed: false,
      },
      {
        week: 6,
        title: 'Case Study - Chat System',
        topics: ['WebSocket design', 'Message delivery', 'Online presence', 'Push notifications'],
        phase: 'Practice',
        completed: false,
      },
    ];

    return {
      dsaTopics: defaultDsaTopics,
      systemDesignTopics: defaultSystemDesignTopics,
      resumeChecklist: defaultResumeChecklist,
      mockInterviews: [],
      roadmapData: defaultRoadmapData,
      systemDesignRoadmap: defaultSystemDesignRoadmap
    };
  };

  // Load data from localStorage on component mount
  useEffect(() => {
    const defaultData = initializeDefaultData();
    
    setDsaTopics(getFromLocalStorage(STORAGE_KEYS.DSA_PROGRESS, defaultData.dsaTopics));
    setSystemDesignTopics(getFromLocalStorage(STORAGE_KEYS.SYSTEM_DESIGN_PROGRESS, defaultData.systemDesignTopics));
    setResumeChecklist(getFromLocalStorage(STORAGE_KEYS.RESUME_CHECKLIST, defaultData.resumeChecklist));
    setMockInterviews(getFromLocalStorage(STORAGE_KEYS.MOCK_INTERVIEWS, defaultData.mockInterviews));
    setRoadmapData(getFromLocalStorage(STORAGE_KEYS.ROADMAP_PROGRESS, defaultData.roadmapData));
    setSystemDesignRoadmap(getFromLocalStorage(STORAGE_KEYS.SYSTEM_DESIGN_ROADMAP, defaultData.systemDesignRoadmap));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (dsaTopics.length > 0) {
      saveToLocalStorage(STORAGE_KEYS.DSA_PROGRESS, dsaTopics);
    }
  }, [dsaTopics]);

  useEffect(() => {
    if (systemDesignTopics.length > 0) {
      saveToLocalStorage(STORAGE_KEYS.SYSTEM_DESIGN_PROGRESS, systemDesignTopics);
    }
  }, [systemDesignTopics]);

  useEffect(() => {
    if (resumeChecklist.length > 0) {
      saveToLocalStorage(STORAGE_KEYS.RESUME_CHECKLIST, resumeChecklist);
    }
  }, [resumeChecklist]);

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.MOCK_INTERVIEWS, mockInterviews);
  }, [mockInterviews]);

  useEffect(() => {
    if (roadmapData.length > 0) {
      saveToLocalStorage(STORAGE_KEYS.ROADMAP_PROGRESS, roadmapData);
    }
  }, [roadmapData]);

  useEffect(() => {
    if (systemDesignRoadmap.length > 0) {
      saveToLocalStorage(STORAGE_KEYS.SYSTEM_DESIGN_ROADMAP, systemDesignRoadmap);
    }
  }, [systemDesignRoadmap]);

  // Calculate dynamic progress
  const getDSAProgress = () => {
    const totalSubtopics = dsaTopics.reduce((acc, topic) => acc + topic.subtopics.length, 0);
    const completedSubtopics = dsaTopics.reduce(
      (acc, topic) => acc + topic.subtopics.filter(sub => sub.completed).length,
      0
    );
    return totalSubtopics > 0 ? Math.round((completedSubtopics / totalSubtopics) * 100) : 0;
  };

  const getSystemDesignProgress = () => {
    const completed = systemDesignTopics.filter(topic => topic.completed).length;
    return systemDesignTopics.length > 0 ? Math.round((completed / systemDesignTopics.length) * 100) : 0;
  };

  const getResumeProgress = () => {
    const completed = resumeChecklist.filter(item => item.completed).length;
    return resumeChecklist.length > 0 ? Math.round((completed / resumeChecklist.length) * 100) : 0;
  };

  const getMockInterviewProgress = () => {
    // Calculate based on number of interviews and average rating
    if (mockInterviews.length === 0) return 0;
    const averageRating = mockInterviews.reduce((sum, interview) => sum + interview.rating, 0) / mockInterviews.length;
    const interviewCount = Math.min(mockInterviews.length, 20); // Cap at 20 interviews
    return Math.round(((averageRating / 10) * 0.7 + (interviewCount / 20) * 0.3) * 100);
  };

  // Calculate total problems solved
  const getTotalProblemsSolved = () => {
    return dsaTopics.reduce((acc, topic) => acc + topic.subtopics.filter(sub => sub.completed).length, 0);
  };

  // Calculate weekly study hours based on completed activities
  const getWeeklyStudyHours = () => {
    const dsaHours = getTotalProblemsSolved() * 0.5; // 30 minutes per problem
    const systemDesignHours = systemDesignTopics.filter(topic => topic.completed).length * 2; // 2 hours per topic
    const resumeHours = resumeChecklist.filter(item => item.completed).length * 0.25; // 15 minutes per task
    const interviewHours = mockInterviews.length * 1; // 1 hour per interview
    return Math.round(dsaHours + systemDesignHours + resumeHours + interviewHours);
  };
  const value = {
    // DSA
    dsaTopics,
    setDsaTopics,
    getDSAProgress,
    getTotalProblemsSolved,
    
    // System Design
    systemDesignTopics,
    setSystemDesignTopics,
    getSystemDesignProgress,
    
    // Resume
    resumeChecklist,
    setResumeChecklist,
    getResumeProgress,
    
    // Mock Interviews
    mockInterviews,
    setMockInterviews,
    getMockInterviewProgress,
    getWeeklyStudyHours,
    
    // Roadmap
    roadmapData,
    setRoadmapData,
    systemDesignRoadmap,
    setSystemDesignRoadmap,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};