//Search Filter
var filter = $('#filter');
$(document).on('keyup', '#filter', filterClasses);

function filterClasses() {
  var filterValue = filter.val().toLowerCase();
  var lis = $('li.class-name');
  $.each(lis, function (index, li) {
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
<<<<<<< HEAD
className.on('click', function () {
=======
className.on('click', function(e) {
  e.stopPropagation();
>>>>>>> 34ff421ef80e5233402ab1cfe99eab68189dad80
  var $this = $(this);
  $this.toggleClass('is-open');
  $this.next().toggleClass('is-open');
});

//Select Button
var cart = $('.cart');
<<<<<<< HEAD
classes.on('click', '.select', function () {
=======
classes.on('click', '.select', function(e) {
  e.stopPropagation();
>>>>>>> 34ff421ef80e5233402ab1cfe99eab68189dad80
  var $this = $(this);
  $this.toggleClass('selected');
  if ($this.hasClass('selected')) {
    $this.text('REMOVE');
  } else {
    $this.text('SELECT');
  }
  cart.addClass('show');
<<<<<<< HEAD

  // Displays Class Name in Card When Selected
  var classTitle = "<li class='mb-2'>" + $(this).data('class-name') + "<i class='fas fa-times'></i>" +  "</li>";
  var addedClasses = $(".addedClasses");
  if ($this.hasClass('selected')) {
    addedClasses.append(classTitle);
  } else if ($this.data("class-name") === $(classTitle).text()) {
    
      $(classTitle).closest("li").remove();
     // $(document).on(‘click’,‘.removeButton’,function() {
      //  $(this).closest(“div.row”).remove();
   
      
    }

  
});
// Hide Cart
$(document).on('click', function (e) {});


// X Button to Remove Class From Card
cart.on('click', '.fa-times', function (e) {
  e.stopPropagation();
  $()
});
=======
  // console.log($(this).data('class-name'));
});
// Hide Cart
$(document).on('click', function(e) {
  cart.removeClass('show');
});
>>>>>>> 34ff421ef80e5233402ab1cfe99eab68189dad80
