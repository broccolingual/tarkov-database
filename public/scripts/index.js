function scrollToTop() {
    scrollTo(0, 0);
}

function scrollToTarget(id) {
    var content = document.getElementById(id);
    content.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

const mapViewer = document.getElementById('mapViewer');
const mapImageLarge = document.getElementById('mapImageLarge');

var maps = ['woods', 'shoreline', 'customs', 'reserve', 'interchange', 'factory', 'lab', 'streetsoftarkov']
maps.forEach(function(e, i) {
    openTargetMaps(e)
});

function openTargetMaps(mapName) {
    var e = document.getElementById(mapName)
    e.addEventListener('click', function() {
        mapImageLarge.setAttribute('src', 'images/maps/' + mapName + '_map.png')
        mapViewer.classList.add('inview');
    });
}

const close = document.getElementById('close');
close.addEventListener('click', function() {
    mapViewer.classList.remove('inview');
});

const zoom = document.getElementById('zoom');
zoom.addEventListener('click', function(){
    alert('実装してないよ')
});

const shrink = document.getElementById('shrink');
shrink.addEventListener('click', function(){
    alert('実装してないよ')
});