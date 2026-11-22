const ineStatePages = {
  "AGS": "https://ine.mx/voto-y-elecciones/elecciones-2027/aguascalientes-2027",
  "BC": "https://ine.mx/voto-y-elecciones/elecciones-2027/baja-california-2027/",
  "BCS": "https://ine.mx/voto-y-elecciones/elecciones-2027/baja-california-sur-2027/",
  "CAMP": "https://ine.mx/voto-y-elecciones/elecciones-2027/campeche-2027/",
  "CHIS": "https://ine.mx/voto-y-elecciones/elecciones-2027/chiapas-2027/",
  "CHIH": "https://ine.mx/voto-y-elecciones/elecciones-2027/chihuahua-2027/",
  "CDMX": "https://ine.mx/voto-y-elecciones/elecciones-2027/ciudad-de-mexico-2027/",
  "COAH": "https://ine.mx/voto-y-elecciones/elecciones-2027/coahuila-2027/",
  "COL": "https://ine.mx/voto-y-elecciones/elecciones-2027/colima-2027/",
  "DGO": "https://ine.mx/voto-y-elecciones/elecciones-2027/durango-2027/",
  "MEX": "https://ine.mx/voto-y-elecciones/elecciones-2027/estado-de-mexico-2027/",
  "GTO": "https://ine.mx/voto-y-elecciones/elecciones-2027/guanajuato-2027/",
  "GRO": "https://ine.mx/voto-y-elecciones/elecciones-2027/guerrero-2027/",
  "HGO": "https://ine.mx/voto-y-elecciones/elecciones-2027/hidalgo-2027/",
  "JAL": "https://ine.mx/voto-y-elecciones/elecciones-2027/jalisco-2027/",
  "MICH": "https://ine.mx/voto-y-elecciones/elecciones-2027/michoacan-2027/",
  "MOR": "https://ine.mx/voto-y-elecciones/elecciones-2027/morelos-2027/",
  "NAY": "https://ine.mx/voto-y-elecciones/elecciones-2027/nayarit-2027/",
  "NL": "https://ine.mx/voto-y-elecciones/elecciones-2027/nuevo-leon-2027/",
  "OAX": "https://ine.mx/voto-y-elecciones/elecciones-2027/oaxaca-2027/",
  "PUE": "https://ine.mx/voto-y-elecciones/elecciones-2027/puebla-2027/",
  "QRO": "https://ine.mx/voto-y-elecciones/elecciones-2027/queretaro-2027/",
  "QROO": "https://ine.mx/voto-y-elecciones/elecciones-2027/quintana-roo-2027/",
  "SLP": "https://ine.mx/voto-y-elecciones/elecciones-2027/san-luis-potosi-2027/",
  "SIN": "https://ine.mx/voto-y-elecciones/elecciones-2027/sinaloa-2027/",
  "SON": "https://ine.mx/voto-y-elecciones/elecciones-2027/sonora-2027/",
  "TAB": "https://ine.mx/voto-y-elecciones/elecciones-2027/tabasco-2027/",
  "TAMPS": "https://ine.mx/voto-y-elecciones/elecciones-2027/tamaulipas-2027/",
  "TLAX": "https://ine.mx/voto-y-elecciones/elecciones-2027/tlaxcala-2027/",
  "VER": "https://ine.mx/voto-y-elecciones/elecciones-2027/veracruz-2027/",
  "YUC": "https://ine.mx/voto-y-elecciones/elecciones-2027/yucatan-2027/",
  "ZAC": "https://ine.mx/voto-y-elecciones/elecciones-2027/zacatecas-2027/"
};

const ineDirectories = {
  calendar: 'https://repositoriodocumental.ine.mx/xmlui/handle/123456789/189392',
  results: 'https://ine.mx/voto%20y%20elecciones/resultados%20electorales/',
  history: 'https://www.ine.mx/voto-y-elecciones/procesos-electorales-anteriores/',
  ople: 'https://www.ine.mx/voto-y-elecciones/opl/',
  treasury: 'https://www.ine.mx/voto-y-elecciones/fiscalizacion/',
  systems: 'https://ine.mx/sistemas-de-fiscalizacion/',
  complaints: 'https://www.ine.mx/estructura-ine/utce/',
  sanctions: 'https://fiscalizacion.ine.mx/web/portalsif/procedimientos-sancionadores',
  gazette: 'https://ine.mx/estructura-ine/consejo-general/gaceta-electoral/',
  repository: 'https://repositoriodocumental.ine.mx/',
  extraordinary: 'https://www.ine.mx/voto-y-elecciones/elecciones-locales-2026/',
  judicial: 'https://portal.ine.mx/elecciones-locales-extraordinarias-del-poder-judicial-2025/',
  judicialReport: 'https://repositoriodocumental.ine.mx/handle/123456789/184191',
  referendum: 'https://www.ine.mx/consultapopular/',
  recall: 'https://www.ine.mx/revocacion-mandato/',
};

function inePublications(topic, state) {
  const sources = {
    partido: [
      ['Actores políticos y documentos de partidos','Registro, documentos básicos y convenios.','https://ine.mx/actores-politicos/'],
      ['Ley General de Partidos Políticos','Consulta el texto oficial y su vigencia.','https://www.diputados.gob.mx/LeyesBiblio/pdf/LGPP.pdf'],
    ],
    organizacion: [
      ['Ficha oficial de la entidad 2026–2027', 'Cargos, etapas, fechas y materiales del proceso local. Usa el proceso histórico que corresponda cuando cambie el ciclo.', ineStatePages[state]],
      ['Plan Integral y calendarios de coordinación', 'Acuerdo INE/CG480/2026, anexos, modificaciones e informes de seguimiento.', ineDirectories.calendar],
      ['Directorio de OPLE', 'Convocatorias, registros, convenios, acuerdos y estrados de la autoridad local.', ineDirectories.ople],
      ['Resultados y estadística', 'Consulta resultados y cómputos por elección y territorio. Coteja actas, declaratorias y constancias con la fuente competente.', ineDirectories.results],
      ['Procesos electorales anteriores', 'Conserva cada ciclo en su propio expediente.', ineDirectories.history],
    ],
    anual: [
      ['Ejemplo de dictamen y resolución anual','Referencia pública del INE.','https://repositoriodocumental.ine.mx/xmlui/handle/123456789/166167'],
      ['Cumplimiento SG-RAP-2/2025','Ejemplo de seguimiento a una conclusión de fiscalización.','https://repositoriodocumental.ine.mx/xmlui/bitstream/handle/123456789/185938/CGex202510-31-ap-5-11.pdf'],
      ['Rendición de cuentas y resultados de fiscalización', 'Informes del ejercicio ordinario, dictámenes, resoluciones y sus anexos publicados.', ineDirectories.treasury],
      ['SIF y notificaciones electrónicas', 'Conserva el acuse y la documentación soporte en el expediente autorizado. Identifica las versiones públicas cuando existan.', ineDirectories.systems],
    ],
    fiscalizacion: [
      ['SUP-RAP-80/2021','Ejemplo de revisión de precampaña.','https://www.te.gob.mx/media/SentenciasN/pdf/Superior/SUP-RAP-0080-2021.pdf'],
      ['Rendición de cuentas y resultados de fiscalización', 'Consulta por proceso, entidad, sujeto y fase. Incluye informes, monitoreo, visitas de verificación y resultados según el caso.', ineDirectories.treasury],
      ['SIF y notificaciones electrónicas', 'Distingue apoyo ciudadano, precampaña y campaña en registros, informes y acuses.', ineDirectories.systems],
      ['Ficha electoral de la entidad', 'Comprueba periodo, elección y cargos para vincular el acuerdo de topes aplicable.', ineStatePages[state]],
    ],
    defensa: [
      ['SUP-RAP-80/2021','Ejemplo de recurso de apelación.','https://www.te.gob.mx/media/SentenciasN/pdf/Superior/SUP-RAP-0080-2021.pdf'],
      ['Repositorio Documental', 'Localiza el acto por clave, fecha y órgano emisor, y coteja sus anexos y acuerdos de cumplimiento.', ineDirectories.repository],
      ['Tribunal Electoral', 'Busca el expediente, la sentencia y las actuaciones de seguimiento.', 'https://www.te.gob.mx/'],
    ],
    extraordinaria: [
      ['Elecciones locales 2026', 'Ejemplo oficial de expediente extraordinario de Tamiahua, Veracruz.', ineDirectories.extraordinary],
      ['Procesos electorales anteriores', 'Verifica si la entidad y demarcación tuvieron una convocatoria extraordinaria.', ineDirectories.history],
    ],
    judicial: [
      ['Elecciones judiciales locales 2025', 'El INE identifica las entidades participantes y enlaza los micrositios locales.', ineDirectories.judicial],
      ['Plan e informe de seguimiento de elecciones judiciales locales', 'Calendarios, anexos, seguimiento e informes por entidad participante.', ineDirectories.judicialReport],
      ['Resultados electorales', 'Consulta el ámbito de la elección y el tipo de cómputo.', ineDirectories.results],
    ],
    participacion: [
      ['Consulta Popular 2021', 'Convocatoria, materiales, organización, cómputos y resultados del ejercicio federal.', ineDirectories.referendum],
      ['Revocación de Mandato 2022', 'Plan, acciones preparatorias, cómputos y resultados del ejercicio federal.', ineDirectories.recall],
    ],
    sancionadores: [
      ['Unidad Técnica de lo Contencioso Electoral', 'Consulta información sobre vías ordinaria, especial y de remoción. Verifica la autoridad competente en cada expediente.', ineDirectories.complaints],
      ['Procedimientos sancionadores en fiscalización', 'Consulta expedientes y determinaciones publicadas por la vía correspondiente.', ineDirectories.sanctions],
      ['Repositorio Documental', 'Coteja la clave de expediente y resolución con el acuerdo y sus anexos.', ineDirectories.repository],
    ],
  };
  return [...(sources[topic] ?? []),
    ['Gaceta Electoral', 'Acuerdos, resoluciones, convenios, avisos y aclaraciones aprobados.', ineDirectories.gazette],
    ['Sesiones y Repositorio Documental', 'Conserva el órgano, fecha y punto del orden del día. Asocia el acuerdo aprobado y sus anexos con el acta, la votación y la versión estenográfica disponibles.', ineDirectories.repository],
  ];
}
