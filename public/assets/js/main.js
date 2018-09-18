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
var addedClasses = $('.addedClasses');
$.get('/api/classes', function(data) {
  cart.on('click', '.fa-times', function(e) {
    var { classId } = this.dataset;
    $.each($('.select'), function(index, btn) {
      // Change Button Text
      if (
        classId ===
        $(btn)
          .data('class-id')
          .toString()
      ) {
        console.log($(btn).data('class-id'));
        $(btn)
          .removeClass('selected')
          .text('SELECT');
      }
    });
    e.stopPropagation();
    var indexToRemove = selectedIds.indexOf(
      $(this)
        .data('classId')
        .toString()
    );
    selectedIds.splice(indexToRemove, 1);
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
      if (!selectedIds.length) {
        //Hide cart if it is empty
        cart.removeClass('show');
      }
    });
  });
  classes.on('click', '.select', function(e) {
    e.stopPropagation();
    var $this = $(this);
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

    $this.toggleClass('selected');
    if ($this.hasClass('selected')) {
      $this.text('REMOVE');
    } else {
      $this.text('SELECT');
    }
    cart.addClass('show');
    // Displays Class Name in Card When Selected

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

    if (!selectedIds.length) {
      //Hide cart if it is empty
      cart.removeClass('show');
    }
  });
});
// Hide cart
$(document).on('click', function(e) {
  cart.removeClass('show');
});
