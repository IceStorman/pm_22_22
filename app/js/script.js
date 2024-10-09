document.addEventListener("DOMContentLoaded", function()
{
    console.log("loaded");
    const contentButtons = document.getElementsByClassName('content-button');
    const contentBlocks = document.getElementsByClassName('content-block');

    Array.from(contentButtons).forEach((contentButton, index) => {
        contentButton.addEventListener('click', () => toggleSection(contentBlocks[index]));
    });

    function toggleSection(section)
    {
        if (section.style.display === "none" || section.style.display === "")
        {
            section.style.display = "block";
        }
        else
        {
            section.style.display = "none";
        }
    }
});