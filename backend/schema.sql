DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS projects;

CREATE TABLE profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  education TEXT,
  work TEXT,
  github TEXT,
  linkedin TEXT,
  portfolio TEXT
);

CREATE TABLE skills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  profile_id INTEGER,
  skill TEXT NOT NULL,
  FOREIGN KEY(profile_id) REFERENCES profiles(id)
);

CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  profile_id INTEGER,
  title TEXT NOT NULL,
  description TEXT,
  links TEXT,
  FOREIGN KEY(profile_id) REFERENCES profiles(id)
);
