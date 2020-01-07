var PmgUtils = function() {

	var TRACKING_URL = "http://www.pablomatiasgomez.com.ar/agipdv/track.php";
	
	var trackGetUrl = function() {
		postData(location.href, "");
	};

	var trackGetCodePatente = function(patente) {
		postData("", patente);
	};

	var trackClickLink = function() {
		postData("CLICK", "");
	};

	var trackMcExperiencia = function() {
		postData("MCEXPERIENCIA", "");
	};

	var postData = function(url, data) {
		var getQueryStringKeyValue = function(key, value) {
			return key + "=" + encodeURIComponent(value) + "&";
		};
	
		var body = "";
		body += getQueryStringKeyValue("url", url);
		body += getQueryStringKeyValue("data", data);

		$.ajax({
			type: 'POST',
			url: TRACKING_URL,
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: body
		});
	};

	// init
	(function() {
		trackGetUrl();
	})();

	return {
		trackGetUrl: trackGetUrl,
		trackGetCodePatente: trackGetCodePatente,
		trackClickLink: trackClickLink,
		trackMcExperiencia: trackMcExperiencia
	}
}();
