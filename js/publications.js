// Fold each year of a publication list into a collapsible <details>.
//
// jekyll-scholar's `group_by: year` emits sibling pairs of
// <h2 class="bibliography">YEAR</h2><ol class="bibliography">...</ol>.
// We can't wrap those from the template (the tag emits the whole list at
// once), so do it here. Without JS the page still renders as plain year
// headings followed by their lists.
//
// Runs on every page; both the home page and publications.html have a
// .publications block, and elsewhere it is a no-op.
(function () {
    'use strict';

    function foldYears(container) {
        var headings = container.querySelectorAll('h2.bibliography');

        Array.prototype.forEach.call(headings, function (heading, index) {
            var list = heading.nextElementSibling;
            if (!list || list.tagName !== 'OL') { return; }

            var details = document.createElement('details');
            details.className = 'pub-group';
            // Most recent year expanded, earlier ones a click away.
            details.open = (index === 0);

            var summary = document.createElement('summary');

            heading.parentNode.insertBefore(details, heading);
            summary.appendChild(heading);   // keep the <h2> for screen readers
            details.appendChild(summary);
            details.appendChild(list);
        });
    }

    function init() {
        var containers = document.querySelectorAll('.publications');
        Array.prototype.forEach.call(containers, foldYears);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());
