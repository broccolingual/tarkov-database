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

// Open Map Viewer
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

// Map Viewer close
const close = document.getElementById('close');
close.addEventListener('click', function() {
    mapViewer.classList.remove('inview');
    mapImageLarge.style.position = 'static'
});

// Map Viewer reset position
const reset = document.getElementById('reset');
reset.addEventListener('click', function(){
    mapImageLarge.style.position = 'static'
});

// Map Viewer zoom
const zoom = document.getElementById('zoom');
zoom.addEventListener('click', function(){
    alert('座標の差分の計算めんどくさいから実装してないよ。')
});

// Map Viewer shrink
const shrink = document.getElementById('shrink');
shrink.addEventListener('click', function(){
    alert('座標の差分の計算めんどくさいから実装してないよ。')
});

// Map Viewer Drag & Drop
mapImageLarge.onmousedown = function(e) {
    var imageContainer = document.getElementById('imageContainer');
    var diffWidth = ((window.innerWidth - imageContainer.clientWidth) / 2) - 14;
    var diffHeight = ((window.innerHeight - imageContainer.clientHeight) / 2) - 5;

    var shiftX = e.clientX - mapImageLarge.getBoundingClientRect().left + diffWidth;
    var shiftY = e.clientY - mapImageLarge.getBoundingClientRect().top + diffHeight;

    mapImageLarge.style.cursor = 'grab';
    mapImageLarge.style.position = 'absolute';

    moveAt(e.clientX, e.clientY);

    function moveAt(clientX, clientY) {
        mapImageLarge.style.left = clientX - shiftX + 'px';
        mapImageLarge.style.top = clientY - shiftY + 'px';
    }
    
    var x = document.getElementById('x');
    var y = document.getElementById('y');

    function onMouseMove(e) {
        moveAt(e.clientX, e.clientY);
        x.innerHTML = `X: ${e.clientX}`;
        y.innerHTML = `Y: ${e.clientY}`;
    }
    
    mapImageLarge.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        mapImageLarge.onmouseup = null;
        mapImageLarge.style.cursor = 'pointer';
        x.innerHTML = `X: ?`;
        y.innerHTML = `Y: ?`;
    }

    document.addEventListener('mousemove', onMouseMove);
}

mapImageLarge.onmouseup = function() {
    mapImageLarge.onmouseup = null;
    mapImageLarge.style.cursor = 'pointer';
    x.innerHTML = `X: ?`;
    y.innerHTML = `Y: ?`;
}

mapImageLarge.ondragstart = function() {
    return false;
}