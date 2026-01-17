DELETE FROM profiles;
DELETE FROM skills;
DELETE FROM projects;

INSERT INTO profiles (id, name, email, education, work, github, linkedin, portfolio)
VALUES (
  1,
  'Saurav Singh',
  'sauravsingh@1216gmail.com',
  'Bachelors of Technology | National Institute of Technology, Delhi | 2023-2027',
  'Software Engineer',
  'https://github.com/YOUR_GITHUB',
  'https://linkedin.com/in/YOUR_LINKEDIN',
  'https://YOUR_PORTFOLIO'
);

-- ✅ SKILLS
INSERT INTO skills (profile_id, skill) VALUES (1, 'Java');
INSERT INTO skills (profile_id, skill) VALUES (1, 'DSA');
INSERT INTO skills (profile_id, skill) VALUES (1, 'SQL');
INSERT INTO skills (profile_id, skill) VALUES (1, 'Node.js');
INSERT INTO skills (profile_id, skill) VALUES (1, 'Express.js');
INSERT INTO skills (profile_id, skill) VALUES (1, 'SQLite');
INSERT INTO skills (profile_id, skill) VALUES (1, 'Git');
INSERT INTO skills (profile_id, skill) VALUES (1, 'REST API');

-- ✅ PROJECTS
INSERT INTO projects (profile_id, title, description, links)
VALUES (
  1,
  'Candidate Profile Playground (Me-API)',
  'A backend API + database that stores my profile and supports query endpoints (projects by skill, global search, top skills).',
  'https://github.com/YOUR_GITHUB/candidate-playground'
);

INSERT INTO projects (profile_id, title, description, links)
VALUES (
  1,
  'Spider Agri Robot',
  'Integrated pesticide sprayer + grass cutter project for agricultural automation.',
  'https://github.com/YOUR_GITHUB/spider-agri-robot'
);

INSERT INTO projects (profile_id, title, description, links)
VALUES (
  1,
  'Automated Vegetable Transplanter',
  'College project for national competition: automation-focused mechanical + design contribution.',
  'https://github.com/YOUR_GITHUB/vegetable-transplanter'
);
