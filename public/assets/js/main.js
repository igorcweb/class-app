(function() {
  function renderNumClasses() {
    if (selectedIds.length === 1) {
      $('#classesNum').text(`${selectedIds.length} Class`);
    } else {
      $('#classesNum').text(`${selectedIds.length} Classes`);
    }
  }
  //Search Filter
  var filter = $('#filter');
  var lis = $('li.class-name');
  $(document).on('keyup', '#filter', filterClasses);
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
    var $this = $(this);
    $this.toggleClass('is-open');
    $this.next().toggleClass('is-open');
  });

  //Select Button
  if (!selectedIds) {
    var selectedIds = [];
  }
  //Disable select button if no available spaces
  var select = $('.select');
  $.each(select, function(index, selectButton) {
    if ($(selectButton).data('available-spaces') === 0) {
      $(selectButton).attr('disabled', 'true');
      $(selectButton)
        .prev()
        //add alert
        .removeClass('d-none');
    }
  });
  var cart = $('.cart');
  var addedClasses = $('.addedClasses');
  var total = 0;
  $.get('/api/classes', function(data) {
    classes.on('click', '.select', function(e) {
      e.stopPropagation();
      var $this = $(this);
      // Clearing out the input
      filter.val('');
      // Displaying all classes
      $.each(lis, function(index, li) {
        $(li).addClass('d-block');
      });
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
      $this.addClass('selected');
      cart.addClass('show');
      // Display Class Name in Card When Selected
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
          renderNumClasses();
        }
      });

      //Prevent adding more than 5 classes
      if (selectedIds.length === 5) {
        $.each(select, function(index, selectButton) {
          if ($(selectButton).data('available-spaces') > 0) {
            $(selectButton).attr('disabled', 'true');
            $('.limit').removeClass('d-none');
          }
        });
      }
      //Hide cart if empty
      if (!selectedIds.length) {
        cart.removeClass('show');
      }
    });

    cart.on('click', '.fa-times', function(e) {
      e.stopPropagation();
      $.each(select, function(index, selectButton) {
        //Enabling buttons/removing alerts
        if ($(selectButton).data('available-spaces') > 0) {
          $(selectButton).attr('disabled', false);
          $('.limit').addClass('d-none');
        }
      });

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
          //Rendering number of classes
          renderNumClasses();
        }
        if (!selectedIds.length) {
          //Hide cart if empty
          cart.removeClass('show');
        }
      });
    });
    // Hide cart on outside click
    $(document).on('click', function(e) {
      cart.removeClass('show');
    });
  });
})();
