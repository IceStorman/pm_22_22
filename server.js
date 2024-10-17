const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;
app.use(cors());

const resumeData = {
    name: "Kevin C. Silva",
    jobTitle: "GRAPHIC & WEB DESIGNER",
    contactInfo: {
        address: "769 Prudence Street Lincoln Park, MI 48146",
        phone: "+1-718-310-5588",
        website: "www.yourwebsite.com"
    },
    aboutMe: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",

    education: [
        {
            university: "Stanford University",
            years: "2011 - 2013",
            degree: "MASTER DEGREE GRADUATE",
            description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        },
        {
            university: "Chicago University",
            years: "2007 - 2010",
            degree: "BACHELOR DEGREE",
            description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        }
    ],
    experience: [
        {
            company: "Creative Agency",
            location: "Chicago",
            years: "2020 - Present",
            role: "SENIOR WEB DESIGNER",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            company: "Creative Market",
            location: "United Kingdom",
            years: "2015 - 2020",
            role: "GRAPHIC DESIGNER",
            description: "Lorem Ipsum has been the industry's standard dummy text."
        },
        {
            company: "Marketing Agency",
            location: "United Kingdom",
            years: "2013 - 2015",
            role: "MARKETING MANAGER",
            description: "Lorem Ipsum has been the industry's standard dummy text."
        }
    ],
    references: [
        {
            name: "Darwin B. Magana",
            address: "2813 Shobe Lane Mancos, CO.",
            phone: "+1-970-533-3393",
            email: "www.yourwebsite.com"
        },
        {
            name: "Robert J. Belvin",
            address: "2119 Fairfax Drive Newark, NJ.",
            phone: "+1-908-987-5103",
            email: "www.yourwebsite.com"
        }
    ],
    skills: [
        {
            program: "Adobe Photoshop",
            value: 90
        },
        {
            program: "Adobe Illustrator",
            value: 55
        },
        {
            program: "Microsoft Word",
            value: 85
        },
        {
            program: "Microsoft PowerPoint",
            value: 60
        },
        {
            program: "HTML-S/CSS-3",
            value: 65
        }
    ]
};

// API endpoint to get resume data
app.get('/api/resume', (req, res) => {
    res.json(resumeData);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});