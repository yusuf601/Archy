export const projectArtifacts = [
    {
        id: 'svector',
        name: 'SVector',
        kind: 'container rebuild',
        statement: 'A source-level rebuild of std::vector with allocator control, capacity rules, iterator behavior, and API-compatible muscle memory',
        github: 'https://github.com/Build-X-From-Scratch/SVector',
        tech: ['C++20', 'Allocator', 'STL'],
        language: 'C++',
        focus: 'allocator control and container semantics',
        visibility: 'public',
    },
    {
        id: 'forward-list-scratch',
        name: 'forward_list_scratch',
        kind: 'linked primitive',
        statement: 'A forward-list implementation focused on splice, merge, sort, node ownership, and the real cost of pointer-shaped abstractions',
        github: 'https://github.com/Build-X-From-Scratch/forward_list_sratch',
        tech: ['C++20', 'Nodes', 'Algorithms'],
        language: 'C++',
        focus: 'node ownership and list algorithms',
        visibility: 'public',
    },
    {
        id: 'stack-queue',
        name: 'Stack / Queue',
        kind: 'linear adapters',
        statement: 'Small primitives rebuilt to expose the tradeoffs behind interface simplicity',
        github: 'https://github.com/Build-X-From-Scratch/Stack_Scratch',
        tech: ['Adapters', 'Buffer'],
        language: 'C++',
        focus: 'linear container adapters',
        visibility: 'public',
    },
    {
        id: 'trees-algorithms',
        name: 'Trees / Algorithms',
        kind: 'algorithmic internals',
        statement: 'Traversal, insertion, sorting, search, and the pieces hidden behind standard headers',
        github: null,
        tech: ['Trees', 'Sort', 'Search'],
        language: 'C++',
        focus: 'tree traversal, sorting, and search',
        visibility: 'private',
    },
    {
        id: 'research-notes',
        name: 'Research Notes',
        kind: 'systems to ML',
        statement: 'Academic and experimental notes connecting implementation details to computational models',
        github: 'https://github.com/yusuf601/my-paper',
        tech: ['Research', 'ML'],
        language: null,
        focus: 'computational models and implementation notes',
        visibility: 'public',
    },
]

export const defaultProjectId = 'svector'

export function findProject(id) {
    return projectArtifacts.find((project) => project.id === id)
}
