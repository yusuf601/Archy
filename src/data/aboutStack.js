import archLinuxIcon from '../assets/icons/archlinux.svg'
import cIcon from '../assets/icons/c.svg'
import cmakeIcon from '../assets/icons/cmake.svg'
import cppIcon from '../assets/icons/cplusplus.svg'
import gitIcon from '../assets/icons/git.svg'
import githubIcon from '../assets/icons/github.svg'
import numpyIcon from '../assets/icons/numpy.svg'
import pandasIcon from '../assets/icons/pandas.svg'
import polarsIcon from '../assets/icons/polars.svg'
import pythonIcon from '../assets/icons/python.svg'
import scikitLearnIcon from '../assets/icons/scikitlearn.svg'

const csharpIcon = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg'
const gccIcon = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gcc/gcc-original.svg'

export const aboutStack = Object.freeze([
    {
        name: 'Languages',
        items: [
            { name: 'C++', icon: cppIcon },
            { name: 'Python', icon: pythonIcon },
            { name: 'C#', icon: csharpIcon },
            { name: 'C', icon: cIcon },
        ],
    },
    {
        name: 'Systems',
        items: [
            { name: 'Arch Linux', icon: archLinuxIcon },
            { name: 'CMake', icon: cmakeIcon },
            { name: 'GCC', icon: gccIcon },
        ],
    },
    {
        name: 'Data / ML',
        items: [
            { name: 'Polars', icon: polarsIcon, featured: true },
            { name: 'NumPy', icon: numpyIcon },
            { name: 'pandas', icon: pandasIcon },
            { name: 'scikit-learn', icon: scikitLearnIcon },
        ],
    },
    {
        name: 'Workflow',
        items: [
            { name: 'Git', icon: gitIcon },
            { name: 'GitHub', icon: githubIcon },
        ],
    },
])
