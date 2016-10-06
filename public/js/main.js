$("h2").slabText({
            // Don't slabtext the headers if the viewport is under 380px
            "viewportBreakpoint":380
});

$('#myTab a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  e.target // activated tab
  e.relatedTarget // previous tab
})
$('#myTab a[href="#main-info"]').tab('show')
$('#myTab a[href="#when"]').tab('show')
$('#myTab a[href="#how"]').tab('show')
$('#myTab a[href="#hotels"]').tab('show')
$('#myTab a[href="#what-to-do"]').tab('show')
$('#myTab a[href="#photo"]').tab('show')