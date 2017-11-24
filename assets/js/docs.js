// any link that is not part of the current domain is modified

(function() {
  var links = document.links;
  for (var i = 0, linksLength = links.length; i < linksLength; i++) {
    // can also be
    //  links[i].hostname != 'subdomain.example.com'
    if (links[i].hostname != window.location.hostname) {
      links[i].target = '_blank';
      links[i].className += ' externalLink';
    }
    if (links[i].innerText.match(/^https?:\/\/example\.org/)) {
      links[i].className += ' exampleLink'
      links[i].onclick = function(e) {
        e.preventDefault()
        window.prompt("Copy to clipboard: Ctrl+C (Cmd+C), Enter", e.target.innerText)
      }
    }

  }


})();
