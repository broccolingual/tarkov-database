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
    changeScale(1)
});

// Map Viewer reset position
const reset = document.getElementById('reset');
reset.addEventListener('click', function(){
    mapImageLarge.style.position = 'static'
    changeScale(1)
});

// Map Viewer zoom
const zoom = document.getElementById('zoom');
zoom.addEventListener('click', function(){
    changeScale(2)
});

// Map Viewer shrink
const shrink = document.getElementById('shrink');
shrink.addEventListener('click', function(){
    changeScale(1)
});

function changeScale(scale) {
    var magnification = document.getElementById('magnification');
    mapImageLarge.style.transform = `scale(${scale})`;
    magnification.innerHTML = `${scale}x`
}

function getCurrentScale() {
    var magnification = mapImageLarge.style.transform;
    if (magnification !== "") {
        var magnificationValues = magnification.split('(')[1];
        magnificationValues = magnificationValues.split(')')[0];
        magnificationValues = magnificationValues.split(',');
        return Number(magnificationValues[0]);
    }else {
        return 1;
    }
}

// Map Viewer Drag & Drop
mapImageLarge.onmousedown = function(e) {
    // Get image size
    var imgWidth = mapImageLarge.clientWidth;
    var imgHeight = mapImageLarge.clientHeight;

    // Get current scale
    var scale = getCurrentScale();

    var imageContainer = document.getElementById('imageContainer');
    var diffWidth = ((window.innerWidth - imageContainer.clientWidth) / 2) - 8;
    var diffHeight = ((window.innerHeight - imageContainer.clientHeight) / 2) + 0.5;

    var shiftX = e.clientX - mapImageLarge.getBoundingClientRect().left + diffWidth;
    var shiftY = e.clientY - mapImageLarge.getBoundingClientRect().top + diffHeight;

    mapImageLarge.style.cursor = 'grab';
    mapImageLarge.style.position = 'absolute';

    moveAt(e.clientX, e.clientY);

    function moveAt(clientX, clientY) {
        if (scale === 1) {
            mapImageLarge.style.left = clientX - shiftX + 'px';
            mapImageLarge.style.top = clientY - shiftY + 'px';
        }else {
            mapImageLarge.style.left = clientX - shiftX + imgWidth/2 + 'px';
            mapImageLarge.style.top = clientY - shiftY + imgHeight/2 + 'px';
        }
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

mapImageLarge.ondragstart = function() {
    return false;
}