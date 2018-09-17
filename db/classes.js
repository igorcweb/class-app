var classes = [
  {
    name: 'Human Evolution: Biological and Social Beginnings of Humankind',
    code: 'ANT 241',
    semester: 'Spring 2019',
    availableSpaces: 8,
    description:
      'Topics include mutation, natural selection, primate origins, and the human fossil record. Also, ethical and moral issues of cloning, eugenics, and creationism.'
  },
  {
    name: 'Forensic Biology',
    code: 'BIO 506',
    semester: 'Spring 2019',
    availableSpaces: 5,
    description:
      'Specific titles vary but may include forensic entomology, forensic toxicology or forensic biology of the human skeleton.'
  },
  {
    name: "Tracing Darwin's Path",
    code: 'BIO 504',
    semester: 'Spring 2019',
    availableSpaces: 4,
    description:
      'Annual in-depth field course that explores sub-Antarctic biota, geography, history, cultures and ecosystems of the Cape Horn Biosphere Reserve, integrating ecological science and field environmental ethics approaches to the study and conservation of biocultural diversity.'
  },
  {
    name: 'Molecular Toxicology',
    code: 'BIO 537',
    semester: 'Spring 2019',
    availableSpaces: 8,
    description:
      'In-depth discussion of toxicology at the biochemical and molecular level to include a discussion of a variety of toxic modes of action, modern techniques used in molecular toxicology, and current toxilogical research literature. Includes the writing of a mock grant proposal.'
  },
  {
    name: 'Neurochemistry',
    code: 'BIO 654',
    semester: 'Spring 2019',
    availableSpaces: 3,
    description:
      'Chemistry of the nervous system and behavior; pharmacology, anatomy and physiology of neurotransmitter systems; current techniques in neurochemistry and neuropharmacology.'
  },
  {
    name: 'Networking and Telecommunications',
    code: 'BCS 562',
    semester: 'Spring 2019',
    availableSpaces: 10,
    description:
      'Examines strategic impact on the business organization of the convergence of telecommunications and computer topics. Includes the design and organizational restructuring issues associated with new technologies in telecommunications.'
  },
  {
    name: 'Administrative Strategy',
    code: 'BUS 519',
    semester: 'Spring 2019',
    availableSpaces: 5,
    description:
      'Capstone course providing the integration of functional areas of business administration. Requires students to determine policy at the general- or top-management level. Students address strategic organizational problems and the optimization of the total enterprise. Includes the use of lectures, case analysis and special topics.'
  },
  {
    name: 'General Chemistry',
    code: 'CHE 135',
    semester: 'Spring 2019',
    availableSpaces: 3,
    description:
      'Primarily for science majors, premed students, and engineering students. Introduces the fundamental principles and theories of chemistry, including stoichiometry, the structure of matter, energy relationships involved in the transformation of matter, the dynamics of such transformations, and some descriptive chemistry of the important elements.'
  },
  {
    name: 'Visual Rhetoric',
    code: 'COM 574',
    semester: 'Spring 2019',
    availableSpaces: 4,
    description:
      'Study of the effect and effectiveness of images in a number of contexts. An introduction to studies on visual culture, which includes topics such as iconography, memory studies, photojournalism and democracy, desire and the image, archiving, body politics, and spectatorship and the politics of viewing.'
  },
  {
    name: 'Principles of Computer Science',
    code: 'CSE 134',
    semester: 'Spring 2019',
    availableSpaces: 5,
    description:
      'Introduces the fundamental concepts of computer science and object-oriented design of reusable modules. Covers basic object-oriented concepts of composition, inheritance, polymorphism, and containers. First course for computer science and computer engineering majors and minors.'
  },
  {
    name: 'Data Structures',
    code: 'CSE 234',
    semester: 'Spring 2019',
    availableSpaces: 2,
    description:
      'Emphasizes the object-oriented implementation of data structures and associated algorithms, including sorting algorithms, linked lists, stacks, queues, binary trees, and priority queues. Introduces graphs and algorithm analysis, and covers object-oriented software engineering strategies and approaches to programming.'
  },
  {
    name: 'Fundamentals of Algorithms',
    code: 'CSE 335',
    semester: 'Spring 2019',
    availableSpaces: 1,
    description:
      'Introduces algorithm analysis; big-Oh, omega, and theta notation; and algorithm classification by efficiency. Also, basic algorithm design strategies and approaches to problem-solving (e.g., greedy, divide and conquer, and dynamic programming), an introduction to graph algorithms, and intractability.'
  },
  {
    name: 'Programming Languages',
    code: 'CSE 334',
    semester: 'Spring 2019',
    availableSpaces: 3,
    description:
      'Provides an understanding of how advances in hardware and networks have influenced the design and capabilities of programming languages from the 1950s to the present. Covers major programming paradigms (procedural, declarative, object-oriented, and functional) and requires problem-solving using a variety of languages. Topics include the history of programming languages, the Chomsky language hierarchy, the development of formal models for specifying languages, data structures for programming language implementation, and the ways different languages deal with problem of concurrency in a world of multicore and distributed computing.'
  },
  {
    name: 'Machine Learning',
    code: 'CSE 521',
    semester: 'Spring 2019',
    availableSpaces: 3,
    description:
      'Theory and practice of machine learning. Decision trees, neural network learning, statistical learning methods, genetic algorithms, Bayesian learning methods, rule-based learning and reinforcement learning. Improved learning through bagging, boosting and ensemble learning. Practical applications of machine learning algorithms.'
  },
  {
    name: 'Data Mining',
    code: 'CSE 538',
    semester: 'Spring 2019',
    availableSpaces: 5,
    description:
      'Introduction to data mining which includes main data mining tasks, e.g. classification, clustering, association rules, and outlier detection, and some of the latest developments, e.g. mining spatial data and web data.'
  },

  {
    name: 'Statistical Analysis',
    code: 'DSC 501',
    semester: 'Spring 2019',
    availableSpaces: 5,
    description:
      'Basic descriptive and inferential statistics; includes frequency distributions, averages, dispersions, index numbers, time-series analysis, probability, theoretical distributions, sampling distribution, estimation, tests of significance, chi-square, regression and correlation, analysis of variance and sample design'
  },
  {
    name: 'Model-Based Business Intelligence',
    code: 'DSC 521',
    semester: 'Spring 2019',
    availableSpaces: 5,
    description:
      'Explains how model-based business intelligence systems aid managerial decision processes. Attention is paid to how and why such models are used in a business intelligence systems environment. Topics include the use of mathematical, statistical and business models that are embedded in business intelligence decision systems for dealing with both structured and semi-structured decision problems. Students identify opportunities and problems for which the use of modeling will enhance a decision maker’s chance of success. Different type of models and decision structuring techniques will be compared and contrasted, and appropriate techniques are illustrated to analyze real-life situations.'
  },
  {
    name: 'Studies in Rhetorical Theory',
    code: 'ENG 531',
    semester: 'Spring 2019',
    availableSpaces: 2,
    description:
      'Detailed study of narrowly conceived topics exigent to contemporary rhetorical theory, history and practice.'
  },
  {
    name: 'Studies in Literary Genres',
    code: 'ENG 580',
    semester: 'Spring 2019',
    availableSpaces: 8,
    description:
      'Study of the historical development of one or more literary genres in American, English, continental or world literature, with attention to major practitioners in the genre and to the historical and literary influences on the form.'
  },
  {
    name: 'Creative Writing: Creative Nonfiction',
    code: 'ENG 516',
    semester: 'Spring 2019',
    availableSpaces: 8,
    description:
      'Workshop devoted to the writing, reading and analysis of creative nonfiction. Emphasis shifts each semester and may encompass the personal essay, memoir, nature writing, travel writing and the nonfiction short story.'
  },
  {
    name: 'Studies in Global Literature and Culture',
    code: 'ENG 568',
    semester: 'Spring 2019',
    availableSpaces: 2,
    description:
      'Examines world literatures written in English, or in translation, in a project aimed at establishing critical and theoretical paradigms for effective analysis. Primary readings (novels, poetry, films and other forms) typically deal with issues of transnationalism, migration, global and regionalist identities, and cosmopolitanism. Secondary readings establish a foundation in key disciplines such as, but not limited to, nationalism, postcolonialism, anthropology, cognitive sciences and globalization studies.'
  },
  {
    name: 'Screenwriting',
    code: 'ENG 582',
    semester: 'Spring 2019',
    availableSpaces: 1,
    description:
      'Study of the principles of dramatic composition as applied to writing for the motion picture or television screen.'
  },
  {
    name: 'American Drama',
    code: 'ENG 440',
    semester: 'Spring 2019',
    availableSpaces: 3,
    description:
      'Offered as a historical survey of American drama or as a study of major authors and schools. Authors may include O’Neill, Miller, Williams, Hansberry, Albee.'
  },
  {
    name: 'The Solar System',
    code: 'GEO 137',
    semester: 'Spring 2019',
    availableSpaces: 2,
    description:
      'A study of the formation and evolution of the solar system. Discussion of solar system materials, nebular processes, meteorites, the formation and evolution of the planets and their satellites, the origin of stars, and the evidence for the standard model of cosmology.'
  },
  {
    name: 'Earth and Life',
    code: 'GEO 138',
    semester: 'Spring 2019',
    availableSpaces: 4,
    description:
      'Covers the evolution of Earth from the origin of the universe, the evolution of life since its origin, and the relationships between the two, including issues of societal relevance such as energy resources and climate change. Unifying concepts are time and change on astronomical to human scales. Meets once per week at the Perot Museum, supplemented by a field trip to several locations of interest in the Dallas area. Students are responsible for their own transportation to and from the Perot Museum for each class.'
  },
  {
    name: 'Introduction to Linear Algebra',
    code: 'MAT 330',
    semester: 'Spring 2019',
    availableSpaces: 7,
    description:
      'Matrices and linear equations, Gaussian elimination, determinants, rank, geometrical notions, eigenvalue problems, coordinate transformations, norms, inner products, orthogonal projections, and Gram–Schmidt and least squares. Includes computational exercises related to these topics.'
  },
  {
    name: 'Calculus I',
    code: 'MAT 133',
    semester: 'Spring 2019',
    availableSpaces: 10,
    description:
      'Differential and integral calculus for algebraic, trigonometric functions, and other transcendental functions, with applications to curve sketching, velocity, maximum-minimum problems, area and volume.'
  }
];

module.exports = classes;
