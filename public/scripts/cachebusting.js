(function() {
    var e = document.createElement('link');
    e.setAttribute('rel', 'stylesheet');
    e.setAttribute('href', 'styles/index.css?' + new Date().getTime());
    document.getElementsByTagName('head')[0].appendChild(e);
})();

(function() {
    var e = document.createElement('script');
    e.setAttribute('src', 'scripts/index.js?' + new Date().getTime());
    document.getElementsByTagName('body')[0].appendChild(e);
})();