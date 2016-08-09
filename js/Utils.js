var PmgUtils = function() {

	var trackGetUrl = function() {
		postData(location.href, "");
	};

	var trackGetCodePatente = function(patente) {
		postData("", patente);
	};

	var trackClickLink = function() {
		postData("CLICK", "");
	};

	var postData = function(url, patente) {
		var getQueryStringKeyValue = function(key, value) {
			return key + "=" + encodeURIComponent(value) + "&";
		};
	
		var data = "";
		data += getQueryStringKeyValue("url", url);
		data += getQueryStringKeyValue("patente", patente);

		$.ajax({
			type: 'POST',
			url: "http://siga.web44.net/github/add.php",
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: data,
			jsonp: false,
			jsonpCallback: function() { return false; }
		});
	
	};

	return {
		trackGetUrl: trackGetUrl,
		trackGetCodePatente: trackGetCodePatente,
		trackClickLink: trackClickLink
	}
}();
