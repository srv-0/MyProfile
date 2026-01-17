const express = require("express");
const cors = require("cors");
const { db, initDB } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});


app.get("/profile", (req, res) => {
  db.get("SELECT * FROM profiles WHERE id = 1", (err, profile) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    db.all("SELECT skill FROM skills WHERE profile_id = 1", (err, skills) => {
      if (err) return res.status(500).json({ error: err.message });

      db.all(
        "SELECT title, description, links FROM projects WHERE profile_id = 1",
        (err, projects) => {
          if (err) return res.status(500).json({ error: err.message });

          res.json({
            ...profile,
            skills: skills.map((s) => s.skill),
            projects,
          });
        }
      );
    });
  });
});

app.post("/profile", (req, res) => {
  const {
    name,
    email,
    education,
    work,
    github,
    linkedin,
    portfolio,
    skills,
    projects,
  } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }

  const insertProfileQuery = `
    INSERT INTO profiles (name, email, education, work, github, linkedin, portfolio)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    insertProfileQuery,
    [name, email, education, work, github, linkedin, portfolio],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      const profileId = this.lastID;

      if (Array.isArray(skills)) {
        skills.forEach((skill) => {
          db.run("INSERT INTO skills (profile_id, skill) VALUES (?, ?)", [
            profileId,
            skill,
          ]);
        });
      }

      
      if (Array.isArray(projects)) {
        projects.forEach((p) => {
          db.run(
            "INSERT INTO projects (profile_id, title, description, links) VALUES (?, ?, ?, ?)",
            [profileId, p.title, p.description, p.links]
          );
        });
      }

      res.status(201).json({ message: "Profile created", profileId });
    }
  );
});

app.put("/profile", (req, res) => {
  const {
    name,
    email,
    education,
    work,
    github,
    linkedin,
    portfolio,
    skills,
    projects,
  } = req.body;

  const updateQuery = `
    UPDATE profiles
    SET name=?, email=?, education=?, work=?, github=?, linkedin=?, portfolio=?
    WHERE id=1
  `;

  db.run(
    updateQuery,
    [name, email, education, work, github, linkedin, portfolio],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      
      db.run("DELETE FROM skills WHERE profile_id=1");
      db.run("DELETE FROM projects WHERE profile_id=1");

      
      if (Array.isArray(skills)) {
        skills.forEach((skill) => {
          db.run("INSERT INTO skills (profile_id, skill) VALUES (1, ?)", [
            skill,
          ]);
        });
      }

      
      if (Array.isArray(projects)) {
        projects.forEach((p) => {
          db.run(
            "INSERT INTO projects (profile_id, title, description, links) VALUES (1, ?, ?, ?)",
            [p.title, p.description, p.links]
          );
        });
      }

      res.json({ message: "Profile updated successfully" });
    }
  );
});

app.get("/projects", (req, res) => {
  const { skill } = req.query;

  
  if (!skill) {
    db.all(
      "SELECT title, description, links FROM projects WHERE profile_id=1",
      (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json(rows);
      }
    );
    return;
  }

  
  db.get(
    "SELECT skill FROM skills WHERE profile_id=1 AND LOWER(skill)=LOWER(?)",
    [skill],
    (err, foundSkill) => {
      if (err) return res.status(500).json({ error: err.message });

      if (!foundSkill) {
        return res.json([]); 
      }

      
      db.all(
        "SELECT title, description, links FROM projects WHERE profile_id=1",
        (err, rows) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json(rows);
        }
      );
    }
  );
});

app.get("/skills/top", (req, res) => {
  db.all(
    `
    SELECT skill, COUNT(*) as count
    FROM skills
    WHERE profile_id=1
    GROUP BY skill
    ORDER BY count DESC
    LIMIT 10
    `,
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

app.get("/search", (req, res) => {
  const q = (req.query.q || "").toLowerCase();

  if (!q) return res.status(400).json({ error: "q is required" });

  const result = { profileMatch: false, skills: [], projects: [] };

  db.get("SELECT * FROM profiles WHERE id=1", (err, profile) => {
    if (err) return res.status(500).json({ error: err.message });

    const profileText = `${profile.name} ${profile.email} ${profile.education || ""} ${profile.work || ""}`.toLowerCase();
    result.profileMatch = profileText.includes(q);

    db.all("SELECT skill FROM skills WHERE profile_id=1", (err, skills) => {
      if (err) return res.status(500).json({ error: err.message });

      result.skills = skills
        .map((s) => s.skill)
        .filter((s) => s.toLowerCase().includes(q));

      db.all(
        "SELECT title, description, links FROM projects WHERE profile_id=1",
        (err, projects) => {
          if (err) return res.status(500).json({ error: err.message });

          result.projects = projects.filter((p) => {
            const text = `${p.title} ${p.description || ""} ${p.links || ""}`.toLowerCase();
            return text.includes(q);
          });

          res.json(result);
        }
      );
    });
  });
});


const PORT = process.env.PORT || 3000;

initDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("DB init failed:", err);
  });
