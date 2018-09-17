var className = $('li.class-name');
className.on('click', function() {
  console.log('clicked');
  $(this).toggleClass('is-open');
});
