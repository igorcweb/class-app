//Search Filter
var filter = $('#filter');
$(document).on('keyup', '#filter', filterClasses);
var lis = $('li.class-name');
function filterClasses() {
  var filterValue = filter.val().toLowerCase();
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
  // Clearing out the input
  filter.val('');
  var $this = $(this);
  $this.toggleClass('is-open');
  $this.next().toggleClass('is-open');
});

//Select Button
if (!selectedIds) {
  var selectedIds = [];
}
var cart = $('.cart');
var addedClasses = $('.addedClasses');
$.get('/api/classes', function(data) {
  classes.on('click', '.select', function(e) {
    e.stopPropagation();
    var $this = $(this);
    //closing description
    $this.closest('li').removeClass('is-open');
    //rotating carret back
    $this
      .closest('li')
      .prev()
      .removeClass('is-open');
    //Geting variables from data attributes (destructuring)
    var {
      classId,
      className,
      classCode,
      classSemester,
      tuition
    } = this.dataset;
    //Creatign addedClass object
    var addedClass = { classId, className, classCode, classSemester, tuition };

    $this.addClass('selected');
    cart.addClass('show');
    // Displays Class Name in Card When Selected
    if ($this.hasClass('selected')) {
      selectedIds.push(classId);
      //removing duplicate values
      selectedIds = Array.from(new Set(selectedIds));
    } else if ($this.data('class-name') === className) {
      //removing id from array
      var indexToRemove = selectedIds.indexOf(classId);
      selectedIds.splice(indexToRemove, 1);
    }
    addedClasses.empty();
    $.each(data, function(index, value) {
      if (selectedIds.includes(value.id.toString())) {
        var classTitle =
          '<li class="mb-2 added-class">' +
          value.name +
          `<i class="fas fa-times" data-class-id="${classId}"></i>` +
          '</li>' +
          '<hr>';
        addedClasses.append(classTitle);
      }
    });
    //Hide cart if it is empty
    if (!selectedIds.length) {
      cart.removeClass('show');
    }
  });
  cart.on('click', '.fa-times', function(e) {
    e.stopPropagation();
    var className = $(this)
      .closest('li')
      .text();

    $.each(data, function(index, obj) {
      if (className === obj.name) {
        var indexToRemove = selectedIds.indexOf(obj.id.toString());
        selectedIds.splice(indexToRemove, 1);
      }
    });
    addedClasses.empty();
    $.each(data, function(index, value) {
      if (selectedIds.includes(value.id.toString())) {
        var classTitle =
          '<li class="mb-2 added-class">' +
          value.name +
          `<i class="fas fa-times"></i>` +
          '</li>' +
          '<hr>';
        addedClasses.append(classTitle);
      }
      if (!selectedIds.length) {
        //Hide cart if it is empty
        cart.removeClass('show');
      }
    });
  });
  // Hide cart on outside click
  $(document).on('click', function(e) {
    cart.removeClass('show');
  });
});
