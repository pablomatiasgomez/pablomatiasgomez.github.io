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
			var ticketNumber = $input.val();
			$container.load( "mcexperiencia.html", function() {
				$container.find(".ticket-number").text(ticketNumber);
				$container.find(".codebar-number").text(getRandomCode());
				$container.find(".date-from").text(getDateFrom());
				$container.find(".date-to").text(getDateTo());
			});
		});
	};

	var getRandomCode = function() {
		return Math.random().toString().replace("0.", "").substr(0, 10);
	};

	var getDateFrom = function() {
		return getFormattedDate(new Date());
	};

	var getDateTo = function() {
		var nextWeek = new Date();
		nextWeek.setDate(nextWeek.getDate() + 7);
		return getFormattedDate(nextWeek);
	};

	var getFormattedDate = function(date) {
		return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
	};


	(function() {
		bindEvents();
	})();

	return {

	};
};