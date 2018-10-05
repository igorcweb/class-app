(function() {
  const select = $('.select');
  const cart = $('.cart');
  const addedClasses = $('.addedClasses');
  const addedClassesReg = $('.addedClassesReg');
  const numFormat = new Intl.NumberFormat('en-US');
  let subtotal = 0;
  let selectedIds;
  if (!selectedIds) {
    selectedIds = [];
  }
  let regCount = 0;
  const proceed = $('.proceed');

  function renderNumClasses() {
    if (selectedIds.length === 1) {
      $('#classesNum').text(`${selectedIds.length} Class`);
    } else {
      $('#classesNum').text(`${selectedIds.length} Classes`);
    }
    $('#navNum').text(selectedIds.length);
  }

  // Navbar button
  $('.navbar-toggler-icon').on('click', function(e) {
    $('#logo').toggleClass('logo-center');
  });

  //Search Filter
  const filter = $('#filter');
  const lis = $('li.class-name');
  $(document).on('keyup', '#filter', filterClasses);
  function filterClasses() {
    let filterValue = filter.val().toLowerCase();
    $.each(lis, (index, li) => {
      const className = $(li)
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
  const className = $('li.class-name');
  const classes = $('ul.classes');
  className.on('click', function(e) {
    e.stopPropagation();
    const $this = $(this);
    $this.toggleClass('is-open');
    $this.next().toggleClass('is-open');
  });

  //Disable select button if no available spaces
  $.each(select, (index, selectButton) => {
    if ($(selectButton).data('available-spaces') === 0) {
      $(selectButton).attr('disabled', 'true');
      $(selectButton)
        .prev()
        //add alert
        .removeClass('d-none');
    }
  });

  //Disable select buttons for registered classes
  const studentId = $('.catalogue').data('studentid');
  $.get('/api/students').then(results => {
    $.get('/api/classes', data => {
      classes.on('click', '.select', function(e) {
        e.stopPropagation();
        $(proceed).attr('disabled', false);
        const $this = $(this);
        $this.attr('disabled', true);
        // Clearing out the input
        filter.val('');
        // Displaying all classes
        $.each(lis, (index, li) => {
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
        const { classId, tuition } = this.dataset;
        subtotal += parseFloat(tuition);
        const fees = (subtotal / 100) * 6;
        const total = subtotal + fees;
        $('.subtotal').text(numFormat.format(subtotal.toFixed(2)));
        $('#fees').text(numFormat.format(fees.toFixed(2)));
        $('#total').text(numFormat.format(total.toFixed(2)));
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

        $.each(data, (index, value) => {
          const { id, name, semester, tuition } = value;
          if (selectedIds.includes(id.toString())) {
            const classTitle =
              `<li class="mb-2 added-class">${name}` +
              `<i class="fas fa-times" data-class-id="${classId}"></i>` +
              `</li><hr>`;
            const classTitleReg = `
            <li class="mb-1 added-class">${name}, ${semester}<br>Tuition: $${numFormat.format(
              tuition
            )}</li><hr>
          `;
            addedClasses.append(classTitle);
            addedClassesReg.append(classTitleReg);
            renderNumClasses();
          }
        });

        //Prevent adding more than 5 classes
        if (selectedIds.length + regCount === 5) {
          $.each(select, (index, selectButton) => {
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
        const className = $(this)
          .closest('li')
          .text();
        $.each(data, (index, obj) => {
          if (className === obj.name) {
            const { tuition } = obj;
            subtotal -= parseFloat(tuition);
            if (!subtotal) {
              $(proceed).attr('disabled', true);
            }
            $('.subtotal').text(numFormat.format(subtotal.toFixed(2)));
            const indexToRemove = selectedIds.indexOf(obj.id.toString());
            selectedIds.splice(indexToRemove, 1);
          }
        });
        $.each(select, (index, selectButton) => {
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
        $.each(data, (index, value) => {
          const { id, name, semester, tuition } = value;
          if (selectedIds.includes(id.toString())) {
            const classTitle = `
            <li class="mb-2 added-class">${name}<i class="fas fa-times"></i></li>
            <hr>
            `;
            const classTitleReg = `
            <li class="mb-1 added-class">${name}, ${semester}<br>Tuition: $${numFormat.format(
              tuition
            )}</li><hr>
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
    });
    let registeredIds;
    results.forEach(student => {
      if (student.id === studentId) {
        registeredIds = student.registeredIds.split(',');
        //Disabling registered buttons
        $.each(select, (index, selectButton) => {
          const classId = $(selectButton).data('class-id');
          if (registeredIds.includes(classId.toString())) {
            $(selectButton).attr({ disabled: true, 'data-registered': true });
          }
        });
        //Count registered classes
        $.each(select, (index, selectButton) => {
          if ($(selectButton).data('registered')) {
            regCount++;
          }
        });
        if (regCount === 5) {
          $.each(select, (index, selectButton) => {
            if ($(selectButton).data('available-spaces') > 0) {
              $(selectButton).attr('disabled', 'true');
              $('.limit').removeClass('d-none');
            }
          });
        }
      }
    });
  });
  //Cart Link
  $('#cartLink').on('click', function(e) {
    e.stopPropagation();
    cart.toggleClass('show');
    $('.collapse').removeClass('show');
    $('#logo').removeClass('logo-center');
  });

  if (!subtotal) {
    $(proceed).attr('disabled', true);
  }

  $(proceed).on('click', function() {
    $('.regModal').removeClass('d-none');
    console.log($(this));
    $('.navbar').removeClass('sticky-top');
  });

  $('#cancel').on('click', function(e) {
    e.preventDefault();
    $('.regModal').addClass('d-none');
    $('.navbar').addClass('sticky-top');
  });

  $('#dropCancel').on('click', function(e) {
    e.preventDefault();
    $('.dropModal').addClass('d-none');
    $('.navbar').addClass('sticky-top');
  });

  $('#reg').on('click', function(e) {
    e.preventDefault();
    $('.navbar').addClass('sticky-top');
    const id = $(this).data('id');
    //Updating available classes
    $.each(selectedIds, (index, classId) => {
      $.get('/api/classes').then(function(data) {
        $.each(data, (index, $class) => {
          if ($class.id === parseInt(classId)) {
            const availableSpaces = $class.availableSpaces;
            $.ajax('/api/classes/register/' + classId, {
              type: 'PUT',
              data: availableSpaces
            }).then(function() {
              console.log(data);
            });
          }
        });
      });
    });
    //Converting to string for database
    const registeredIds = { registeredIds: selectedIds.join(',') };
    $.ajax('/api/students/register/' + id, {
      type: 'PUT',
      data: registeredIds
    }).then(() => {
      location.replace('/');
    });
  });
  //Display Registered Classes
  if ($('.reg-classes').data('studentid')) {
    const regClasses = $('.reg-classes');
    const id = $(regClasses).data('studentid');
    $.get('/api/students').then(studentsData => {
      $.each(studentsData, (index, student) => {
        if (student.id === id) {
          const registeredIds = student.registeredIds.split(',');
          $.get('/api/classes').then(classesData => {
            $.each(classesData, (index, $class) => {
              if (registeredIds.includes($class.id.toString())) {
                const { id, name, code, semester, availableSpaces } = $class;
                const regClass = `
                <li class="list-group-item list-group-item-action">
                  ${code}, ${name}, ${semester} <button class="dropBtn btn btn-sm bg-red text-white" data-classid="${id}" data-code="${code}" data-name="${name}" data-semester="${semester}" data-availableSpaces="${availableSpaces}">DROP</button>
                </li>
                `;
                $('.regClasses').append(regClass);
              }
            });
          });
          $('.regClasses').on('click', '.dropBtn', function() {
            const name = $(this).data('name');
            const id = $(this).data('classid');
            const availableSpaces = $(this).data('availablespaces');
            $('.dropModal').removeClass('d-none');
            $('.dropSubmit').attr({
              'data-classid': id,
              'data-availableSpaces': availableSpaces
            });
            $('#classToDrop')
              .empty()
              .append(`${name}?`);
            $('.navbar').removeClass('sticky-top');
          });
          $('.dropSubmit').on('click', function(e) {
            e.preventDefault();
            $('.navbar').addClass('sticky-top');
            const $classId = this.dataset.classid;
            const availableSpaces = this.dataset.availablespaces;
            $.ajax('/api/classes/drop/' + $classId, {
              type: 'PUT',
              data: availableSpaces
            }).then(() => {
              console.log('success');
            });
            $.ajax('/api/students/drop/' + id, {
              type: 'PUT',
              data: { $classId }
            }).then(() => {
              location.replace('/');
            });
          });
        }
      });
    });
  }
})();
