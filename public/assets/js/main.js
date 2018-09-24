(function() {
  function renderNumClasses() {
    if (selectedIds.length === 1) {
      $('#classesNum').text(`${selectedIds.length} Class`);
    } else {
      $('#classesNum').text(`${selectedIds.length} Classes`);
    }
    $('#navNum').text(selectedIds.length);
  }

  // //Navbar button
  $('.navbar-toggler-icon').on('click', function(e) {
    console.log($('.collapse'));
    $('#logo').toggleClass('logo-center');
    console.log('open');
  });

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
  var addedClassesReg = $('.addedClassesReg');

  var subtotal = 0;
  $.get('/api/classes', function(data) {
    classes.on('click', '.select', function(e) {
      e.stopPropagation();
      var $this = $(this);
      $this.attr('disabled', true);
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
      var { classId, tuition } = this.dataset;
      subtotal += parseFloat(tuition);
      var fees = (subtotal / 100) * 6;
      var total = subtotal + fees;
      $('.subtotal').text(subtotal.toFixed(2));
      $('#fees').text(fees.toFixed(2));
      $('#total').text(total.toFixed(2));
      $this.addClass('selected');
      cart.addClass('show');
      // Display Class Name in Card When Selected
      if ($this.hasClass('selected')) {
        selectedIds.push(classId);
        //removing duplicate values
        selectedIds = Array.from(new Set(selectedIds));
      }

      addedClasses.empty();
      addedClassesReg.empty();

      $.each(data, function(index, value) {
        var { id, name, semester, tuition } = value;
        if (selectedIds.includes(id.toString())) {
          var classTitle =
            `<li class="mb-2 added-class">${name}` +
            `<i class="fas fa-times" data-class-id="${classId}"></i>` +
            `</li><hr>`;
          var classTitleReg = `
            <li class="mb-1 added-class">${name}, ${semester}<br>Tuition: $${tuition}</li><hr>
          `;
          addedClasses.append(classTitle);
          addedClassesReg.append(classTitleReg);
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
      var className = $(this)
        .closest('li')
        .text();
      $.each(data, function(index, obj) {
        if (className === obj.name) {
          var { tuition } = obj;
          subtotal -= parseFloat(tuition);
          $('#subtotal').text(subtotal.toFixed(2));
          var indexToRemove = selectedIds.indexOf(obj.id.toString());
          selectedIds.splice(indexToRemove, 1);
        }
      });
      $.each(select, function(index, selectButton) {
        //Enabling buttons/removing alerts
        if (
          $(selectButton).data('available-spaces') > 0 &&
          !selectedIds.includes(
            $(selectButton)
              .data('classId')
              .toString()
          )
        ) {
          $(selectButton).attr('disabled', false);
          $('.limit').addClass('d-none');
        }
      });
      addedClasses.empty();
      addedClassesReg.empty();
      $.each(data, function(index, value) {
        var { id, name, semester, tuition } = value;
        if (selectedIds.includes(id.toString())) {
          var classTitle = `
            <li class="mb-2 added-class">${name}<i class="fas fa-times"></i></li>
            <hr>
            `;
          var classTitleReg = `
            <li class="mb-1 added-class">${name}, ${semester}<br>Tuition: $${tuition}</li><hr>
          `;
          addedClasses.append(classTitle);
          addedClassesReg.append(classTitleReg);
          //Rendering number of classes
          renderNumClasses();
        }
        if (!selectedIds.length) {
          renderNumClasses();
          //Hide cart if empty
          cart.removeClass('show');
        }
      });
    });

    //Hide cart on outside click (except for hamburger menu button)
    $(document).on('click', function(e) {
      if (!$(e.target).hasClass('navbar-toggler-icon')) {
        cart.removeClass('show');
      }
    });

    //Cart Link
    $('#cartLink').on('click', function(e) {
      e.stopPropagation();
      cart.toggleClass('show');
      $('.collapse').removeClass('show');
      $('#logo').removeClass('logo-center');
    });
  });

  $('.proceed').on('click', function() {
    $('.regModal').removeClass('d-none');
    $('.navbar').removeClass('sticky-top');
  });

  $('#cancel').on('click', function(e) {
    e.preventDefault();
    $('.regModal').addClass('d-none');
  });

  $('#reg').on('click', function(e) {
    e.preventDefault();
    var id = $(this).data('id');
    //Converting to string for database
    var registeredIds = { registeredIds: selectedIds.join(',') };

    $.ajax('/api/students/' + id, {
      type: 'PUT',
      data: registeredIds
    }).then(function() {
      location.replace('/');
    });
  });
})();
