"""
Central content store for the portfolio.

Everything the templates render — bio, experience, education, skills,
projects, certifications, achievements — lives here as plain Python data.
Keeping it in one file (instead of the database) means the site needs zero
migrations to show real content and works unmodified on read-only /
serverless hosts such as Vercel.

Edit this file to update the site's content.
"""

PROFILE = {
    "full_name": "Pranav Sharma",
    "first_name": "Pranav",
    "role_titles": [
        "AI Engineer",
        "Software Developer",
        "Machine Learning Enthusiast",
        "Graduate Teaching Assistant",
    ],
    "location": "Gyaneshwor, Kathmandu, Nepal",
    "email": "pranavsharma5834@gmail.com",
    "phone": "+977 984-0003706",
    "github": "https://github.com/",
    "linkedin": "https://www.linkedin.com/in/pranav-sharma-000478376",
    "resume_url": "/static/main/files/PranavSharma_CV.pdf",
    "tagline": "I build intelligent, scalable systems — from machine-learning "
               "pipelines to full-stack web applications.",
    "about": (
        "I'm an aspiring AI engineer and software developer with a strong "
        "foundation in Python and Java, currently completing a BSc (Hons) in "
        "Computing with Artificial Intelligence at Islington College, London "
        "Metropolitan University. I enjoy the full arc of building software — "
        "from cleaning a messy dataset to shipping a working web app — and I'm "
        "committed to growing into deep learning, data engineering, and "
        "Java-based enterprise development. Alongside my studies, I work as a "
        "Graduate Teaching Assistant, helping the next cohort of students get "
        "comfortable with the same tools and ideas I'm still mastering myself."
    ),
}

EXPERIENCE = [
    {
        "role": "Graduate Teaching Assistant",
        "org": "Islington College Kathmandu",
        "period": "Sep 2026 — Present",
        "current": True,
        "description": (
            "Supporting lecturers in delivering engaging theoretical and "
            "practical learning activities for undergraduate computing "
            "students."
        ),
        "tags": ["Teaching", "Mentoring", "Python", "Java"],
    },
    {
        "role": "Teaching Assistant",
        "org": "Islington College Kathmandu",
        "period": "Oct 2025 — Feb 2026",
        "current": False,
        "description": (
            "Supported students in tutorials and lab sessions while assisting "
            "with the development of an AI-powered Student Helpdesk System, "
            "including its workshop and milestone-tracking features."
        ),
        "tags": ["University Teaching", "Python"],
    },
    {
        "role": "Junior Python Intern",
        "org": "PlazmaTech Pvt Ltd",
        "period": "Apr 2025 — Jul 2025",
        "current": False,
        "description": (
            "Developed a voice-enabled PNR assistance system that uses "
            "speech recognition and natural language processing to retrieve "
            "flight and booking information."
        ),
        "tags": ["Python", "Speech Recognition", "NLP", "WinSCP"],
    },
]

EDUCATION = [
    {
        "title": "BSc (Hons) Computing with Artificial Intelligence",
        "org": "Islington College — London Metropolitan University",
        "location": "Kamalmarg, Kamalpokhari, Kathmandu",
        "period": "2023 — Current",
        "current": True,
    },
    {
        "title": "SLC | Management",
        "org": "Global College of Management, National Examinations Board (NEB)",
        "location": "Mid-Baneshwor, Kathmandu",
        "period": "2021 — 2023",
        "current": False,
    },
    {
        "title": "Secondary Education Examination",
        "org": "Galaxy Public School, National Examinations Board (NEB)",
        "location": "Gyaneshwor, Kathmandu",
        "period": "2021",
        "current": False,
    },
]

SKILLS = {
    "Programming Languages": ["Python", "Java"],
    "Web Development": ["HTML", "CSS", "JavaScript"],
    "Databases": ["MySQL", "Oracle"],
    "Operating Systems": ["Windows", "macOS", "Linux"],
    "Tools": ["VS Code", "Spring Tool Suite", "Git", "GitHub", "Jupyter Notebook / Lab"],
}

SOFT_SKILLS = ["Communication", "Time Management", "Analytical Thinking", "Collaboration", "Leadership"]

PROJECTS = [
    {
        "title": "Customer Service Request Analysis",
        "category": "Academic Project",
        "stack": ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
        "description": (
            "Analyzed NYC 311 service-request data end to end: cleaning raw "
            "records, engineering features, running statistical tests, and "
            "visualizing patterns in complaint types and resolution times. "
            "Delivered a structured report with actionable insights."
        ),
        "highlight": True,
    },
    {
        "title": "Console-Based Land Rental System",
        "category": "Academic Project",
        "stack": ["Python"],
        "description": (
            "A pure-Python console application that lets small businesses "
            "list, rent, and sell land, covering the core listing and "
            "transaction workflow."
        ),
        "highlight": True,
    },
    {
        "title": "PrinterBazar — Online Printer E-commerce Website",
        "category": "Academic Project",
        "stack": ["HTML", "CSS", "JavaScript"],
        "description": (
            "A responsive e-commerce site for printer sales, with an "
            "interactive product catalog and client-side validation built "
            "in vanilla JavaScript."
        ),
        "highlight": True,
    },
    {
        "title": "Pranav's Cafe App — Online Cafe Management System",
        "category": "Personal Project",
        "stack": ["Java Servlets", "JSP", "MySQL"],
        "description": (
            "A full-stack web app for running day-to-day cafe operations: "
            "user authentication, product management, and order tracking, "
            "built on Java Servlets, JSP, and MySQL."
        ),
        "highlight": True,
    },
    {
        "title": "IoT-Based Agriculture / Farm Monitoring System",
        "category": "Personal Project",
        "stack": ["Arduino", "ESP32", "Blynk"],
        "description": (
            "A remote farm-monitoring system that streams soil and "
            "environmental readings to a web dashboard, viewable live from "
            "a phone or laptop via Blynk."
        ),
        "highlight": True,
    },
    {
        "title": "Portfolio Project",
        "category": "Personal Project",
        "stack": ["Django", "Python", "HTML", "CSS", "JavaScript"],
        "description": (
            "This site — a personal portfolio built from scratch with "
            "Django, featuring a light/dark theme, animated UI throughout, "
            "and a working contact form that emails messages directly, "
            "deployed live on Vercel."
        ),
        "highlight": True,
    },
    {
        "title": "Brainify",
        "category": "Personal Project",
        # TODO: confirm exact tech stack (framework, model architecture, etc.)
        "stack": ["Python", "Deep Learning"],
        "description": (
            "An AI-powered platform for brain tumor segmentation and "
            "detection, using deep learning to identify and outline tumor "
            "regions in medical scans."
        ),
        "highlight": True,
    },
]

CERTIFICATIONS = [
    {
        "title": "Tools for Data Science",
        "issuer": "Coursera",
        "date": "Nov 3, 2023",
        "description": "Survey of the core tooling used across the data-science workflow, including Python and R.",
    },
    {
        "title": "What is Data Science?",
        "issuer": "Coursera",
        "date": "Aug 20, 2023",
        "description": "Foundational, theory-first introduction to the data-science discipline.",
    },
    {
        "title": "AWS Cloud Quest: Cloud Practitioner",
        "issuer": "Amazon Web Services",
        "date": "Jul 23, 2024",
        "description": "Hands-on fundamentals of AWS, including EC2 and S3.",
    },
]

ACHIEVEMENTS = [
    "Winner, Presentation Competition — Global College of Management",
    "1st Position in Mathematics",
    "Winner, consecutive Table Tennis tournaments at school and college level",
    "Participant, Junior Inter-School Public Speaking Competition",
    "Volunteer, HISSAN event (2023)",
]

REFERENCES = [
    {
        "name": "Saugat Man Shakya",
        "title": "CDL Module Leader, Islington College",
        "email": "saugatshakya@islingtoncollege.edu.np",
    },
]
