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
        if (section.style.maxHeight)
        {
            console.log("off");
            section.style.maxHeight = null;
        }
        else
        {
            console.log("on");
            section.style.maxHeight = "300px";
        }
    }
});