const validadorDeFecha = /^(\d{2})\/(\d{2})\/(\d{4})$/;

const mesesDelAño = {
  1: 31, // Enero
  2: 28, // Febrero
  3: 31, // Marzo
  4: 30, // Abril
  5: 31, // Mayo
  6: 30, // Junio
  7: 31, // Julio
  8: 31, // Agosto
  9: 30, // Septiembre
  10: 31, // Octubre
  11: 30, // Noviembre
  12: 31, // Diciembre
};

function validarFormatoDeFecha(fecha) {
  return validadorDeFecha.test(fecha);
}

function esAñoBisiesto(año) {
  return año % 4 === 0 && (año % 100 !== 0 || año % 400 === 0);
}

function obtenerDiasDelMes(mes, año) {
  if (mes === 2 && esAñoBisiesto(año)) {
    return 29;
  }
  return mesesDelAño[mes];
}

function dividirFecha(fecha) {
  let [dia, mes, año] = fecha.split("/").map(Number);
  return { dia, mes, año };
}

function esFechaValida(fecha) {
  if (!validarFormatoDeFecha(fecha)) {
    return false;
  }

  let { dia, mes, año } = dividirFecha(fecha);

  if (
    mes <= 0 ||
    mes > 12 ||
    dia <= 0 ||
    dia > obtenerDiasDelMes(mes, año) ||
    año <= 0 ||
    año > 2024
  ) {
    return false;
  }

  return { dia, mes, año };
}

function diasDesdeInicioDelAno({ dia, mes, año }) {
  let dias = dia;

  for (let i = 1; i < mes; i++) {
    dias += obtenerDiasDelMes(i, año);
  }

  return dias;
}

function contarDiasDeDiferencia(fecha1, fecha2) {
  let fechaDividida1 = esFechaValida(fecha1);
  let fechaDividida2 = esFechaValida(fecha2);

  if (!fechaDividida1 || !fechaDividida2) {
    return "Alguna de las fechas no es válida";
  }

  if (
    fechaDividida1.año > fechaDividida2.año ||
    (fechaDividida1.año === fechaDividida2.año &&
      (fechaDividida1.mes > fechaDividida2.mes ||
        (fechaDividida1.mes === fechaDividida2.mes &&
          fechaDividida1.dia > fechaDividida2.dia)))
  ) {
    [fechaDividida1, fechaDividida2] = [fechaDividida2, fechaDividida1];
  }

  let totalDias = 0;

  for (let i = fechaDividida1.año; i < fechaDividida2.año; i++) {
    if (esAñoBisiesto(i)) {
      totalDias = totalDias + 366;
    } else {
      totalDias = totalDias + 365;
    }
  }
  totalDias = totalDias - diasDesdeInicioDelAno(fechaDividida1);
  totalDias = totalDias + diasDesdeInicioDelAno(fechaDividida2);
  return totalDias;
}

console.log(contarDiasDeDiferencia("29/02/2023", "01/03/2024"));
console.log(contarDiasDeDiferencia("01/02/2024", "31/13/2023"));
console.log(contarDiasDeDiferencia("30/11/2024", "31/12/2025"));
console.log(contarDiasDeDiferencia("30/11/2024", "31/12/2023"));
console.log(contarDiasDeDiferencia("30/11/2023", "31/12/2024"));
console.log(contarDiasDeDiferencia("31/12/2023", "31/12/2024"));
console.log(contarDiasDeDiferencia("31/12/2024", "31/12/2023"));
console.log(contarDiasDeDiferencia("30/11/2023", "20/03/2024"));
console.log(contarDiasDeDiferencia("14/06/1994", "13/07/2024"));
console.log(contarDiasDeDiferencia("14/06/2024", "15/06/2024"));
