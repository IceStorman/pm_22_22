document.addEventListener("DOMContentLoaded", function()
{
    console.log("loaded");
    const contentButtons = document.getElementsByClassName('content-button');
    const contentBlocks = document.getElementsByClassName('content-block');

    fetchSectionData();

    Array.from(contentButtons).forEach((contentButton, index) => {
        contentButton.addEventListener('click', () => toggleSection(contentBlocks[index]));
    });

    function toggleSection(section)
    {
        const tracks = section.getElementsByClassName('track');
        const thumbs = section.getElementsByClassName('thumb');
        const charts = section.getElementsByClassName('circle-progress');

        if (section.style.maxHeight)
        {
            section.style.maxHeight = null;

            if(tracks.length > 0)
            {
                console.log('off');
                Array.from(tracks).forEach(track => {
                    track.style.width = 0 + '%';
                })
                Array.from(thumbs).forEach(thumb => {
                    thumb.style.left = 0 + '%';
                })
            }

            if(charts.length > 0)
            {
                console.log('yuppie');
                Array.from(charts).forEach(chart => {
                    chart.style.strokeDasharray = "0, 100";
                })
            }
        }
        else
        {
            section.style.maxHeight = "600px";

            if(tracks.length > 0)
            {
                console.log('on');
                Array.from(tracks).forEach(track => {
                    const value = track.getAttribute('data-value');
                    track.style.width = value + '%';
                })
                Array.from(thumbs).forEach(thumb => {
                    const value = thumb.getAttribute('data-value');
                    thumb.style.left = value + '%';
                })
            }

            if(charts.length > 0)
            {
                console.log('yuppie');
                Array.from(charts).forEach(chart => {
                    const value = chart.getAttribute('data-value');
                    chart.style.strokeDasharray = value;
                })
            }
        }
    }

    function fetchSectionData() {
        fetch(`http://localhost:4000/api/resume`)
            .then(response => response.json())
            .then(data => {
                console.log('Loaded section data:', data);

                const aboutMeContent = document.getElementById('aboutMeContent');
                if (aboutMeContent) {
                    const aboutMeHTML = `
                        <p class="content-block">${data.aboutMe}</p>`;
                    aboutMeContent.innerHTML = aboutMeHTML;
                    console.log(aboutMeContent.innerHTML);
                }

                const educationBlock = document.getElementById('educationBlock');
                if(educationBlock)
                {
                    const educationHTML = data.education.map(item =>
                        `<div class="education-item">
                            <div class="education-left">
                                <h4>${item.university}</h4>
                                <p class="years">${item.years}</p>
                            </div>
                            <div class="education-right">
                                <h4>${item.degree}</h4>
                                <p>${item.description}</p>
                            </div>
                        </div>`
                    ).join('');
                    educationBlock.innerHTML = educationHTML
                }

                const experienceBlock = document.getElementById('experienceBlock');
                if(experienceBlock)
                {
                    const experienceHTML = data.experience.map(item =>
                    `<div class="experience-item">
                        <div class="experience-left">
                            <h4>${item.company}</h4>
                            <p class="location">${item.location}</p>
                            <p class="years">${item.years}</p>
                        </div>
                        <div class="experience-right">
                            <h4>${item.role}</h4>
                            <p>${item.description}</p>
                        </div>
                    </div>`).join('');
                    experienceBlock.innerHTML = experienceHTML;
                }

                const referencesBlock = document.getElementById('referencesBlock');
                if(referencesBlock)
                {
                    const referencesHTML = data.references.map(item =>
                    `<div class="reference-item">
                        <h2>${item.name}</h2>
                        <p class="address">${item.address}</p>
                        <p>Tel: ${item.phone}</p>
                        <p>Email: ${item.email}</p>
                    </div>`).join('');
                    referencesBlock.innerHTML = referencesHTML;
                }

                const skillsBlock = document.getElementById('skillsBlock');
                if(skillsBlock)
                {
                    const skillsHTML = data.skills.map(item =>
                    `<div class="bar-item">
                        <p>${item.program}</p>
                        <div class="bar">
                            <div class="track" data-value=${item.value}></div>
                            <div class="thumb" data-value=${item.value}></div>
                        </div>
                    </div>`).join('');
                    skillsBlock.innerHTML = skillsHTML;
                }

                const languagesBlock = document.getElementById('languagesBlock');
                if(languagesBlock)
                {
                    const languagesHTML = data.languages.map(item =>
                    `<div class="col-md-4">
                            <div class="circle">
                                <svg viewBox="0 0 36 36">
                                    <path class="circle-bg"
                                          d="M18 2.0845
                                 a 15.9155 15.9155 0 0 1 0 31.831
                                 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    <path class="circle-progress" data-value="${item.percent}, 100"
                                          d="M18 2.0845
                                 a 15.9155 15.9155 0 0 1 0 31.831
                                 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                </svg>
                                <div class="circle-text">
                                    <strong>${item.percent}%</strong><br>${item.language}
                                </div>
                            </div>
                        </div>`).join('');
                    languagesBlock.innerHTML = languagesHTML;
                }

                const hobbiesBlock = document.getElementById('hobbiesBlock');
                if(hobbiesBlock)
                {
                    const hobbiesHTML = data.hobbies.map(item =>
                    `<div class="bar-item">
                        <p>${item.hobby}</p>
                        <div class="bar">
                            <div class="track" data-value=${item.value}></div>
                            <div class="thumb" data-value=${item.value}></div>
                        </div>
                    </div>`).join('');
                    hobbiesBlock.innerHTML = hobbiesHTML;
                }
            })
            .catch(error => {
                console.error('Error loading section data:', error);
                alert('Error');
            });
    }
});