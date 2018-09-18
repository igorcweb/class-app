//Search Filter
var filter = $('#filter');
$(document).on('keyup', '#filter', filterClasses);

function filterClasses() {
	var filterValue = filter.val().toLowerCase();
	var lis = $('li.class-name');
	$.each(lis, function(index, li) {
		var className = $(li).text().toLowerCase();
		if (className.includes(filterValue)) {
			$(li).addClass('d-block').removeClass('d-none');
		} else {
			$(li).addClass('d-none').removeClass('d-block');
		}
	});
}

//Toggle Class Description
var className = $('li.class-name');
var classes = $('ul.classes');
className.on('click', function() {
	var $this = $(this);
	$this.toggleClass('is-open');
	$this.next().toggleClass('is-open');
});

//Select Button
var cart = $('.cart');
classes.on('click', '.select', function() {
	var $this = $(this);
	$this.toggleClass('selected');
	if ($this.hasClass('selected')) {
		$this.text('REMOVE');
	} else {
		$this.text('SELECT');
	}
	cart.addClass('show');

	// Displays Class Name in Card When Selected
	var classTitle = "<li class='mb-2'>" + $(this).data('class-name') + "<i class='fas fa-times'></i>" + '</li>';
	var addedClasses = $('.addedClasses');
	if ($this.hasClass('selected')) {
		addedClasses.append(classTitle);
	}
});

// Hide Cart
$(document).on('click', function(e) {
	cart.removeClass('show');
});


//merge