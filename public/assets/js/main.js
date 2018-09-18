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
    } else {
      $(li)
        .addClass('d-none')
        .removeClass('d-block');
    }
  });
}

//Toggle Class Description
var className = $('li.class-name');
var classes = $('ul.classes');
className.on('click', function(e) {
  e.stopPropagation();
  var $this = $(this);
  $this.toggleClass('is-open');
  $this.next().toggleClass('is-open');
});

//Select Button

if (!selectedIds) {
  var selectedIds = [];
}
var cart = $('.cart');
classes.on('click', '.select', function(e) {
  e.stopPropagation();
  var $this = $(this);
  //Geting variables from data attributes (destructuring)
  var { classId, className, classCode, classSemester, tuition } = this.dataset;
  //Creatign addedClass object
  var addedClass = { classId, className, classCode, classSemester, tuition };

  $this.toggleClass('selected');
  if ($this.hasClass('selected')) {
    $this.text('REMOVE');
  } else {
    $this.text('SELECT');
  }
  cart.addClass('show');
  // Displays Class Name in Card When Selected

  $.get('/api/classes', function(data) {
    if ($this.hasClass('selected')) {
      selectedIds.push(classId);
      //removing duplicate values
      selectedIds = Array.from(new Set(selectedIds));
      // console.log(selectedIds);
    } else if ($this.data('class-name') === className) {
      //removing id from array
      var indexToRemove = selectedIds.indexOf(classId);
      selectedIds.splice(indexToRemove, 1);
    }
    var addedClasses = $('.addedClasses');
    addedClasses.empty();
    $.each(data, function(index, value) {
      if (selectedIds.includes(value.id.toString())) {
        // console.log(value.name);
        var classTitle =
          '<li class="mb-2 added-class">' +
          value.name +
          '<i class="fas fa-times"></i>' +
          '</li>' +
          '<hr>';

        addedClasses.append(classTitle);
        console.log(classTitle);
      }
    });
  });
});
// Hide Cart
$(document).on('click', function(e) {
  cart.removeClass('show');
});

// X Button to Remove Class From Cart
cart.on('click', '.fa-times', function(e) {
  e.stopPropagation();
});
