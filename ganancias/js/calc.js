var PARAMS1 = {
	TOPES_ESCALAS: [25800, 51600, 77400, 103200, 154800, 206400, 309600, 412800, 99999999],
	PORCENTAJES_ESCALAS: [0.05, 0.09, 0.12, 0.15, 0.19, 0.23, 0.27, 0.31, 0.35],
	MINIMO_NO_IMPONIBLE: 66917.91,
	ADICIONAL_4TA_CATEGORIA: 321205.968,
	CONYUGE: 62385.2,
	HIJO: 31461.09,
	TOPE_APORTES: 13926.16,
	TOPE_JUBILADO: 407592, 
	TOPE_ALQUILER: 51967,
	TOPE_HIPOTECARIO: 20000,
};

var PARAMS = {
	TOPES_ESCALAS: [33040, 66080, 99119, 132159, 198239, 264318, 396478, 528637, 99999999],
	PORCENTAJES_ESCALAS: [0.05, 0.09, 0.12, 0.15, 0.19, 0.23, 0.27, 0.31, 0.35],
	MINIMO_NO_IMPONIBLE: 85848.99,
	ADICIONAL_4TA_CATEGORIA: 412075.14,
	CONYUGE: 80033.97,
	HIJO: 40361.43,
	TOPE_APORTES: 16598.31,
	//TOPE_APORTES: 24861.9662,
	TOPE_JUBILADO: 670255.2,
	TOPE_ALQUILER: 85848.99,
	TOPE_HIPOTECARIO: 20000,
};

function calcular(sueldoBruto) {
	var isConyuge = false;
	var isJubilado = false;
	var isPatagonico = false;
	var valorAlquiler = 0;
	var valorHipotecario = 0;
	var cantHijos = 0;
	
	var deduccionConyuge = isConyuge ? PARAMS.CONYUGE : 0;
	var deduccionHijos = PARAMS.HIJO * cantHijos;
	var deduccionAlquiler = Math.min(12 * valorAlquiler * 0.4, PARAMS.TOPE_ALQUILER);
	var deduccionHipotecario = Math.min(12 * valorHipotecario, PARAMS.TOPE_HIPOTECARIO);
	
	var mniConDeduccionEspecial = (PARAMS.MINIMO_NO_IMPONIBLE + PARAMS.ADICIONAL_4TA_CATEGORIA) * (isPatagonico ? 1.22 : 1);
	var mniTotal;
	if (!isJubilado) {
		mniTotal = mniConDeduccionEspecial + deduccionConyuge + deduccionHijos + deduccionAlquiler + deduccionHipotecario;
	} else {
		mniTotal = PARAMS.TOPE_JUBILADO + deduccionAlquiler + deduccionHipotecario;
	}

	var porcentajeAportes = isJubilado ? 0.06 : 0.17;
	var aportes = Math.min(porcentajeAportes * sueldoBruto, PARAMS.TOPE_APORTES);
	var sueldoNeto = sueldoBruto - aportes;
	var sueldoNetoAnual = 13 * sueldoNeto;


	var montoImponibleAplicable = 0;
	if (sueldoNetoAnual > mniTotal) montoImponibleAplicable = sueldoNetoAnual - mniTotal;
	
	var result = calcularImpuestoAnual(montoImponibleAplicable);

	var impuestoAnual = result.value;
	var impuestoMensual = (impuestoAnual / 13); // TODO ?
	var alicuota = impuestoMensual / sueldoBruto * 100;
	var alicuotaMarginal = 0 == alicuota ? 0 : 100 * PARAMS.PORCENTAJES_ESCALAS[result.escala];
	var sueldoEnMano = sueldoNeto - impuestoMensual;
	
	return {
		impuestoAnual: impuestoAnual,
		impuestoMensual: impuestoMensual,
		aportesAnual: aportes * 13,
		aportesMensual: aportes,
		alicuota: alicuota,
		alicuotaMarginal: alicuotaMarginal,
		sueldoEnMano: sueldoEnMano,
	};
}

function calcularImpuestoAnual(monto) {
	var i = 0;
	var result = {};
	var value = 0;
	var diff;
	while(monto > PARAMS.TOPES_ESCALAS[i]) {
		diff = i == 0 ? PARAMS.TOPES_ESCALAS[i] : PARAMS.TOPES_ESCALAS[i] - PARAMS.TOPES_ESCALAS[i - 1];
		value += diff * PARAMS.PORCENTAJES_ESCALAS[i];
		i++;
	}

	diff = i == 0 ? monto : monto - PARAMS.TOPES_ESCALAS[i - 1];
	value += diff * PARAMS.PORCENTAJES_ESCALAS[i];

	result.value = value;
	result.escala = i;
	return result;
}