// Projects data for portfolio
export const projects = [
    // STL Implementations
    {
        id: 'svector',
        name: 'SVector',
        category: 'STL Implementation',
        description: 'Personal project to develop Vector from scratch with purpose to learn memory management, continuous allocation and low-level programming. Features unique challenges with continuous allocation and memory fragmentation.',
        longDescription: 'A complete reimplementation of C++ STL\'s std::vector container, built from the ground up to understand dynamic array internals, memory management, and iterator design patterns.',
        tech: ['C++17/20/23', 'Memory Management', 'Templates', 'CMake'],
        features: [
            'Continuous memory allocation',
            'Dynamic array with automatic resizing',
            'STL-compliant interface',
            'Custom allocator support',
            'Memory fragmentation handling'
        ],
        status: 'ongoing',
        visibility: 'public',
        github: 'https://github.com/Build-X-From-Scratch/SVector',
        stars: null, // Will be updated
        language: 'C++',
        topics: ['stl', 'vector', 'memory-management', 'low-level']
    },
    {
        id: 'forward-list',
        name: 'forward_list_scratch',
        category: 'STL Implementation',
        description: 'Custom implementation of the C++ STL forward_list. Understanding how STL containers work internally by building from scratch, including member functions, iterators, and algorithms.',
        longDescription: 'From-scratch implementation of std::forward_list, exploring singly-linked list data structures and STL container design principles with complete algorithm support.',
        tech: ['C++', 'STL', 'Linked Lists', 'Templates', 'CMake'],
        features: [
            'Singly-linked list implementation',
            'STL-compliant forward iterators',
            'Sort, merge, and reverse algorithms',
            'Memory-efficient design',
            'Constant-time insertion/deletion'
        ],
        status: 'completed',
        visibility: 'public',
        github: 'https://github.com/Build-X-From-Scratch/forward_list_sratch',
        stars: null,
        language: 'C++',
        topics: ['stl', 'forward-list', 'linked-list', 'algorithms']
    },
    {
        id: 'algo-stl',
        name: 'algo-stl',
        category: 'STL Implementation',
        description: 'Ongoing project reimplementing C++ STL algorithms (sort, find, transform, etc.) to deeply understand algorithm design, complexity analysis, and generic programming.',
        longDescription: 'Comprehensive reimplementation of C++ Standard Template Library algorithms from first principles, focusing on understanding algorithm design patterns, time complexity, and generic programming techniques.',
        tech: ['C++', 'Algorithms', 'Templates', 'Generic Programming'],
        features: [
            'Sorting algorithms (quicksort, mergesort, heapsort)',
            'Searching algorithms (binary search, lower_bound)',
            'Transformation algorithms (map, filter, reduce)',
            'Iterator-based generic design',
            'Performance optimizations'
        ],
        status: 'ongoing',
        visibility: 'private',
        github: null,
        stars: null,
        language: 'C++',
        topics: ['algorithms', 'stl', 'generic-programming', 'competitive-programming']
    },

    // Data Structures
    {
        id: 'stack',
        name: 'Stack_Scratch',
        category: 'Data Structure',
        description: 'Build Stack Data Structure implementation from scratch. Custom implementation demonstrating fundamental DSA concepts and adapter pattern usage.',
        longDescription: 'Complete stack (LIFO) data structure implementation from first principles, exploring adapter patterns, template programming, and exception-safe design.',
        tech: ['C++', 'Data Structures', 'Templates', 'CMake'],
        features: [
            'LIFO operations (push, pop, top)',
            'Template-based generic implementation',
            'Adapter pattern over underlying container',
            'Exception-safe operations',
            'Comprehensive unit tests'
        ],
        status: 'completed',
        visibility: 'public',
        github: 'https://github.com/Build-X-From-Scratch/Stack_Scratch',
        stars: null,
        language: 'C++',
        topics: ['data-structures', 'stack', 'adapter-pattern']
    },
    {
        id: 'queue',
        name: 'Queue_Scratch',
        category: 'Data Structure',
        description: 'Build Queue data structure from scratch using array and linked list. Implementation exploring circular buffer optimization and STL adapter patterns.',
        longDescription: 'Queue (FIFO) data structure built from scratch with both array-based and linked-list implementations, demonstrating circular buffer techniques and generic programming.',
        tech: ['C++', 'Data Structures', 'Templates', 'Arrays', 'Linked Lists'],
        features: [
            'FIFO operations (enqueue, dequeue)',
            'Array and linked-list implementations',
            'Circular buffer optimization',
            'Generic template implementation',
            'Efficient memory usage'
        ],
        status: 'completed',
        visibility: 'public',
        github: 'https://github.com/Build-X-From-Scratch/Queue-Sratch',
        stars: null,
        language: 'C++',
        topics: ['data-structures', 'queue', 'circular-buffer']
    },
    {
        id: 'supreme-chainsaw',
        name: 'supreme-chainsaw',
        category: 'Data Structure',
        description: 'Binary Search Tree library with advanced features including AVL balancing, red-black tree variants, and performance optimizations for competitive programming.',
        longDescription: 'Comprehensive BST library featuring self-balancing algorithms, range queries, persistent data structures, and competitive programming optimizations.',
        tech: ['C++', 'Binary Trees', 'Algorithms', 'Data Structures'],
        features: [
            'Self-balancing BST (AVL, Red-Black)',
            'Range query support',
            'Persistent data structure variants',
            'Optimized for competitive programming',
            'Advanced tree operations'
        ],
        status: 'ongoing',
        visibility: 'private',
        github: null,
        stars: null,
        language: 'C++',
        topics: ['binary-tree', 'avl-tree', 'red-black-tree', 'competitive-programming']
    }
];

// Helper functions
export const getProjectsByCategory = (category) => {
    return projects.filter(p => p.category === category);
};

export const getPublicProjects = () => {
    return projects.filter(p => p.visibility === 'public');
};

export const getPrivateProjects = () => {
    return projects.filter(p => p.visibility === 'private');
};

export const getProjectById = (id) => {
    return projects.find(p => p.id === id);
};
