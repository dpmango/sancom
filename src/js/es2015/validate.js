$(document).ready(function(){
  ////////////////
  // FORM VALIDATIONS
  ////////////////

  // jQuery validate plugin
  // https://jqueryvalidation.org


  // GENERIC FUNCTIONS
  ////////////////////

  var validateErrorPlacement = function validateErrorPlacement(error, element) {
    error.addClass('ui-input__validation');
    error.appendTo(element.parent("div"));
  };
  var validateHighlight = function validateHighlight(element) {
    $(element).addClass("has-error");
  };
  var validateUnhighlight = function validateUnhighlight(element) {
    $(element).removeClass("has-error");
  };
  var validateSubmitHandler = function validateSubmitHandler(form) {

    $(form).addClass('loading');
    $.ajax({
      type: "POST",
      url: $(form).attr('action'),
      data: $(form).serialize(),
      dataType:"json",
      success: function success(response) {

        if (response.success ) {


          $("#cta_action_button").html($("#cta_action_button").data('success-message')).addClass('disable');
        } else {
          $(form).find('[data-error]').html(data.message).show();
        }
      }
    });
  };

  var validatePhone = {
    required: true,
    normalizer: function normalizer(value) {
      var PHONE_MASK = '+X (XXX) XXX-XXXX';
      if (!value || value === PHONE_MASK) {
        return value;
      } else {
        return value.replace(/[^\d]/g, '');
      }
    },
    minlength: 11,
    digits: true

    ////////
    // FORMS


    /////////////////////
    // REGISTRATION FORM
    ////////////////////
  };$(".js-registration-form").validate({
    errorPlacement: validateErrorPlacement,
    highlight: validateHighlight,
    unhighlight: validateUnhighlight,
    submitHandler: validateSubmitHandler,
    rules: {
      last_name: "required",
      first_name: "required",
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 6
        // phone: validatePhone
      } },
    messages: {
      last_name: "Заполните это поле",
      first_name: "Заполните это поле",
      email: {
        required: "Заполните это поле",
        email: "Email содержит неправильный формат"
      },
      password: {
        required: "Заполните это поле",
        email: "Пароль мимимум 6 символов"
      }
      // phone: {
      //     required: "Заполните это поле",
      //     minlength: "Введите корректный телефон"
      // }
    }
  });

  /////////////////////
  // CTA FORM
  ////////////////////
  $(".js-validateCta").validate({
    errorPlacement: validateErrorPlacement,
    highlight: function highlight(element) {
      $(element).parent().find('button').addClass("no-no");
      $(element).addClass('has-error');
      setTimeout(function () {
        $(element).parent().find('button').removeClass("no-no");
      }, 700);
    },
    unhighlight: function unhighlight(element) {
      $(element).parent().find('button').removeClass("no-no");
      $(element).removeClass('has-error');
    },
    submitHandler: validateSubmitHandler,
    rules: {
      phone: validatePhone
    },
    messages: {
      phone: {
        required: "Заполните это поле",
        minlength: "Введите корректный телефон"
      }
    }
  });
});
