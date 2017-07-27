/* jshint esversion: 6 */
/* global getConfig */

(() => {
  
  setInterval(() => {
    try {
      $.get('/status', (response) => {
        switch (response) {
          case 'PRODUCT_GIVEN':
            $('.pad-cell button').removeAttr('disabled');
            $('.default-title').show('slide', {direction: 'right'}, 300);
            $('.success-title').hide('slide', {direction: 'left'}, 300);
          break;
        }
      });
    } catch (e) {
      
    }
  }, 300);
  
  $(document).on("touchstart", '.number-cell button', (event) => {
    const number = $(event.target).attr('data-number');
    const existing = $('.display').text();
    $('.display').text(existing.replace('_', number));
    $(event.target).addClass('down');
    
    if ($('.display').text().indexOf('_') === -1) {
      $('.enter').removeAttr('disabled');
    }
  });
  
  $(document).on("touchend", '.number-cell button', (event) => {
    setTimeout(() => {
      $(event.target).removeClass('down');
    }, 75);
  });
  
  $(document).on("touchstart", '.backspace', (event) => {
    $('.enter').attr('disabled', 'disabled');
    
    const number = $(event.target).attr('data-number');
    const existing = $('.display').text();
    let index = existing.indexOf('_');
    if (index === -1) {
      index = existing.length;
    } else if (index === 0) {
      return;
    }
    
    index--;
    existing[index] = '_';
    
    $('.display').text(existing.substring(0, index) + '_' + existing.substring(index + 1));
  });
  
  $(document).on("touchstart", '.enter', (event) => {
    const enter = $('.enter');
    
    if (enter.attr('disabled') === 'disabled') {
      return;
    }
    
    enter.attr('disabled', 'disabled');
    
    const code = $('.display').text();
    $('.display').text('______');
    
    $.post('/code', {
      code: code
    }, (response) => {
      $('.pad-cell button').attr('disabled', 'disabled');
      
      $('.default-title').hide('slide', {direction: 'right'}, 300);
      $('.success-title').show('slide', {direction: 'left', complete: () => {
        $('.success-title').marquee({
          duration: 6000,
          gap: 50,
          delayBeforeStart: 0,
          direction: 'left',
          duplicated: true,
          startVisible: true
        });
      }}, 300);
    })
    .fail(() => {
      $('.default-title').hide('slide', {direction: 'right'}, 300);
      $('.error-title').show('slide', {direction: 'left'}, 300);
      
      setTimeout(() => {
        $('.default-title').show('slide', {direction: 'right'}, 300);
        $('.error-title').hide('slide', {direction: 'left'}, 300);
      }, 3000);
    });
  });

})();

