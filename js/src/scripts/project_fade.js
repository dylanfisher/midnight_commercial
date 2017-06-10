$(function() {
  var $singleProject = $('body.single-project');

  if ( $singleProject.length ) {
    $singleProject.addClass('transition-is-ready');

    window.setTimeout(function() {
      $singleProject.addClass('transition-is-complete');
    }, 1000); // This timeout should match the single_project.scss CSS transition
  }
});
