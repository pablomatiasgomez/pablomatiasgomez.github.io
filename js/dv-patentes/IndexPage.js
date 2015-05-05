var IndexPage = function(_options) {
	var options = {

	};
	$.extend(options, _options);

	var KEY_ENTER = 13;

	var bindEvents = function() {
		var $input = $("input[name='patente']");
		var $submit = $("button.submit");
		var $mesage = $("alert-success.message");

		$input.on("keyup", function(e) {
			if (e.keyCode == KEY_ENTER) {
				$submit.click();
			}
		});

		$submit.on("click", function() {
			var dv = getDV($submit.val());
			var message = "The code is <strong>" + dv + "</strong>";

			$mesage.find("span.detail").html(message);
		});
	};

	(function() {
		bindEvents();
	})();

	return {

	};
};