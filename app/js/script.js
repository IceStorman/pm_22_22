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
            section.style.maxHeight = "300px";

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
});