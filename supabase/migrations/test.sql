-- Insert default admin user (password: admin123)
INSERT INTO users (username, email, password, role, created_at, updated_at, is_active) 
VALUES ('Bala Andegue', 'balaandeguefrancoislionnel@gmail.com', 'lionnel10', 'ADMIN', NOW(), NOW(), true)
ON CONFLICT (username) DO NOTHING;

-- Insert sample profile data
INSERT INTO profile (first_name, last_name, title, bio, about, email, phone, location, years_experience, projects_completed, clients_served, created_at, updated_at)
VALUES (
    'Bala Andegue ', 
    'Francois Lionnel', 
    'Full Stack Developer', 
    'Passionate developer with expertise in modern web technologies',
    'I am a dedicated full-stack developer with over 5 years of experience in creating robust web applications. My expertise spans across frontend technologies like React, Vue.js, and Angular, as well as backend technologies including Node.js, Python, and Java Spring Boot. I have a strong foundation in database design and management, cloud services, and DevOps practices.',
    'balaandeguefrancoislionnel@gmail.com',
    '+237 656 616 751',
    'Yaounde , Melen',
    5,
    50,
    25,
    NOW(),
    NOW()
) ON CONFLICT DO NOTHING;

-- Insert sample skills
INSERT INTO profile_skills (profile_id, skill) 
SELECT p.id, skill_name
FROM profile p, (VALUES 
    ('JavaScript'), ('TypeScript'), ('React'),
    ('Node.js'), ('Python'), ('Java'), ('Spring Boot'), ('PostgreSQL'),
    ('MongoDB'), ('Docker'), ('Git'), ('REST APIs')
) AS skills(skill_name)
WHERE NOT EXISTS (SELECT 1 FROM profile_skills ps WHERE ps.profile_id = p.id AND ps.skill = skill_name);

-- Insert sample projects
INSERT INTO projects (title, description, short_description, github_url, live_url, image_url, status, start_date, end_date, is_featured, sort_order, created_at, updated_at)
VALUES 
(
    'E-Commerce Platform',
    'A full-featured e-commerce platform built with React and Node.js. Features include user authentication, product catalog, shopping cart, payment integration with Stripe, order management, and admin dashboard.',
    'Modern e-commerce platform with React and Node.js',
    'https://github.com/johndoe/ecommerce-platform',
    'https://ecommerce-demo.example.com',
    'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
    'COMPLETED',
    '2023-01-15 00:00:00',
    '2023-04-30 00:00:00',
    true,
    1,
    NOW(),
    NOW()
),
(
    'Task Management App',
    'A collaborative task management application similar to Trello. Built with Vue.js frontend and Python Django backend. Features real-time updates, drag-and-drop functionality, team collaboration, and project analytics.',
    'Collaborative task management with real-time updates',
    'https://github.com/johndoe/task-manager',
    'https://taskmanager-demo.example.com',
    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    'COMPLETED',
    '2023-05-01 00:00:00',
    '2023-08-15 00:00:00',
    true,
    2,
    NOW(),
    NOW()
),
(
    'Weather Dashboard',
    'A responsive weather dashboard that displays current weather conditions and forecasts. Built with vanilla JavaScript and integrates with multiple weather APIs for accurate data.',
    'Responsive weather dashboard with API integration',
    'https://github.com/johndoe/weather-dashboard',
    'https://weather-dashboard.example.com',
    'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg',
    'IN_PROGRESS',
    '2023-09-01 00:00:00',
    NULL,
    false,
    3,
    NOW(),
    NOW()
);

-- Insert project technologies
INSERT INTO project_technologies (project_id, technology)
SELECT p.id, tech
FROM projects p, (VALUES 
    ('E-Commerce Platform', 'React'),
    ('E-Commerce Platform', 'Node.js'),
    ('E-Commerce Platform', 'Express'),
    ('E-Commerce Platform', 'MongoDB'),
    ('E-Commerce Platform', 'Stripe'),
    ('Task Management App', 'Vue.js'),
    ('Task Management App', 'Python'),
    ('Task Management App', 'Django'),
    ('Task Management App', 'PostgreSQL'),
    ('Task Management App', 'WebSocket'),
    ('Weather Dashboard', 'JavaScript'),
    ('Weather Dashboard', 'HTML5'),
    ('Weather Dashboard', 'CSS3'),
    ('Weather Dashboard', 'REST API')
) AS techs(project_title, tech)
WHERE p.title = techs.project_title;

-- Insert sample certificates
INSERT INTO certificates (title, issuer, description, issue_date, credential_id, credential_url, image_url, is_featured, sort_order, created_at, updated_at)
VALUES 
(
    'AWS Certified Solutions Architect',
    'Amazon Web Services',
    'Validates expertise in designing distributed systems on AWS platform',
    '2023-06-15 00:00:00',
    'AWS-SAA-123456',
    'https://aws.amazon.com/certification/verify',
    'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
    true,
    1,
    NOW(),
    NOW()
),
(
    'Google Cloud Professional Developer',
    'Google Cloud',
    'Demonstrates proficiency in developing scalable applications on Google Cloud Platform',
    '2023-03-20 00:00:00',
    'GCP-PD-789012',
    'https://cloud.google.com/certification',
    'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
    true,
    2,
    NOW(),
    NOW()
),
(
    'MongoDB Certified Developer',
    'MongoDB Inc.',
    'Validates skills in MongoDB database development and administration',
    '2022-11-10 00:00:00',
    'MDB-DEV-345678',
    'https://university.mongodb.com/certification',
    'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    false,
    3,
    NOW(),
    NOW()
);