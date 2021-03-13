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