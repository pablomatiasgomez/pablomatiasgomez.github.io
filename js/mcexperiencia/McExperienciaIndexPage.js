var McExperienciaIndexPage = function(_options) {
	var options = {

	};
	$.extend(options, _options);

	var KEY_ENTER = 13;

	var bindEvents = function() {
		var $input = $("input[name='ticket-number']");
		var $submit = $("button.submit");
		var $container = $(".container");

		$input.on("keyup", function(e) {
			if (e.keyCode == KEY_ENTER) {
				$submit.click();
			}
		});

		$submit.on("click", function() {
			PmgUtils.trackMcExperiencia();
			$container.load( "mcexperiencia.html", function() {
				debugger;
			});
		});
	};

	(function() {
		bindEvents();
	})();

	return {

	};
};