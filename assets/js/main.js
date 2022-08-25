var tooltipTriggerList = [].slice.call(document.querySelectorAll('.tt'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})