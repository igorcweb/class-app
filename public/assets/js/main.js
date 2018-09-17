//Search Filter
var filter = $('#filter');
$(document).on('keyup', '#filter', filterClasses);
function filterClasses() {
  var filterValue = filter.val().toLowerCase();
  var lis = $('li.class-name');
  $.each(lis, function(index, li) {
    var className = $(li)
      .text()
      .toLowerCase();
    if (className.includes(filterValue)) {
      $(li)
        .addClass('d-block')
        .removeClass('d-none');
      console.log(li);
    } else {
      $(li)
        .addClass('d-none')
        .removeClass('d-block');
      console.log(li);
    }
  });
}

//Toggle Class Description
var className = $('li.class-name');
var classes = $('ul.classes');
className.on('click', function() {
  console.log('clicked');
  $(this).toggleClass('is-open');
  $(this)
    .next()
    .toggleClass('is-open');
});

//Select Button
classes.on('click', '.select', function() {
  console.log($(this).data('class-id'));
});
