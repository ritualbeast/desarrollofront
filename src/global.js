/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */

// Global var
global.LABEL_ERROR_TELEFONO = 'El teléfono que ingresó es incorrecto'
global.LENGTH_CORREO = 50
global.LENGTH_PAIS = 50
// message
global.MODAL_REDIRECT_TEMPLATE = 'La plantilla se guardó. ¿Desea salir del editor?'
global.DELETE_BTN = 'limpiar plantilla'
global.CODE_BTN = 'código'
global.SAVE_BTN = 'guardar diseño'
global.ATTACH_BTN = 'adjuntos'
// btn
global.ACCEPT = 'Aceptar'
global.CANCEL = 'Cancelar'
global.CLOSE = 'Cerrar'

// URL REDIS
global.URL_REDIS = 'http://desa.goitsa.me:8991/goit-redis-manager/v1/'

// URL NOTIFY API
global.URL_NOTIFY = 'http://desa.goitsa.me:8990/goit-notify-api/v1/'

// SECURITY API
global.SECUTIRY_API = "http://desa.goitsa.me:8988/goit-security-api/v2/";
global.CANAL = "49a5f60a-9f56-4feb-bcf1-5377c6152ef8";
global.LOGIN_METHOD = global.SECUTIRY_API + "autenticacion/login";
global.LOGOUT_METHOD = global.SECUTIRY_API + "autenticacion/revocar-token";
global.REFRESH_METHOD = global.SECUTIRY_API + "autenticacion/refresh-token";
global.CREATE_USER = global.SECUTIRY_API + "usuario";
global.VALIDATE_USER = global.SECUTIRY_API + "usuario/activar-usuario/";
global.ROUTE_CREATE_USER_EMAIL =
global.SECUTIRY_API + "usuario/activar-usuario/enviar-mail/";
global.RESTORE_PASS = global.SECUTIRY_API + "usuario/restablecer-contrasenia/";
global.RESTORE_NEW_PASSWORD =
global.SECUTIRY_API + "usuario/cambiar-contrasenia/";
global.VALIDATE_LOGIN = global.SECUTIRY_API + "autenticacion/validar-login";

// SECURITY API 2
// global.SECUTIRY_API2 = "http://desa.goitsa.me:8988/goit-security-api/v2/";

// TEMPLATES API
global.TEMPLATES_API = 'http://desa.goitsa.me:8990/goit-notify-api/v1/'
global.GET_PLANTILLAS = global.TEMPLATES_API + 'plantillas/getPlantilla'
global.GET_PLANTILLAS_USUARIO = global.TEMPLATES_API + 'plantillas/listarPorUsuario/'
global.GET_PLANTILLAS_TIPO = global.TEMPLATES_API + 'plantillas/listarPorTipo/'
global.GET_PLANTILLAS_NOMBRE = global.TEMPLATES_API + 'plantillas/listarPorNombre/'
global.EDIT_TEMPLATES_API = global.TEMPLATES_API + 'plantillas/editarPlantilla'
global.DELETE_TEMPLATES_API = global.TEMPLATES_API + 'plantillas/eliminarPlantilla'
global.CREATE_TEMPLATES_API = global.TEMPLATES_API + 'plantillas'
global.CREATE_TEMPLATES_API2 = global.TEMPLATES_API + 'plantillas/crearPlantillas/'
global.PUT_PLANTILLAS_FAVORITOS = global.TEMPLATES_API + 'plantillas/favorito/'
global.CREATE_DETALLE_TEMPLATES_API = global.TEMPLATES_API + 'notDetallesPlantilla'
global.ACTUALIZA_DETALLE_TEMPLATES_API = global.TEMPLATES_API + 'notDetallesPlantilla/actualizarDetallePlantilla'
global.GET_DET_PLANTILLAS = global.TEMPLATES_API + 'notDetallesPlantilla/getDetallePlantilla'
global.DELETE_DET_PLANTILLAS = global.TEMPLATES_API + 'notDetallesPlantilla/eliminarDetallePlantilla'
global.IMAGES_TEMPLATES_API = global.TEMPLATES_API + 'imagenes-usuario/imagenes-por-usuario'
global.SAVE_IMAGES_TEMPLATES_API = global.TEMPLATES_API + 'carga-archivo'
global.DUPLY_TEMPLATES_API = global.TEMPLATES_API + 'plantillas/duplicarPlantilla'
global.SEARCH_TEMPLATES_API = global.TEMPLATES_API + 'plantillas/listarPorNombre/Plantilla/'
global.SEARCH_FILES_API = global.TEMPLATES_API + 'adjunto-plantilla/adjuntos-por-plantilla'
global.DELETE_FILES_API = global.TEMPLATES_API + 'adjunto-plantilla'
global.DELETE_IMAGES = global.TEMPLATES_API + 'imagenes-usuario/'

// CAMPAIGN API
global.CAMPAIGN_API =
  "http://desa.goitsa.me:8990/goit-notify-api/v1/notCampanas/";
global.CAMPAIGN_USER = global.CAMPAIGN_API + "getCampanaLista/";
global.CAMPAIGN_NAME = global.CAMPAIGN_API + "getListaNombre/";
global.CAMPAIGN_EDIT = global.CAMPAIGN_API + "actualizarCampana/";
global.CAMPAIGN_DELETE = global.CAMPAIGN_API + "eliminarCampana/";
global.CREATECAMPINGSERVICE =
  "http://desa.goitsa.me:8990/goit-notify-api/v1/notCampanas";

// PROGRAMATION API
global.PROGRAMATION_API =
  "http://desa.goitsa.me:8990/goit-notify-api/v1/notProgramacionCampana";

// GRUPOS API
global.GRUPO_ID = global.URL_REDIS + 'grupos/getGroup'
global.GRUPO_CANAL = global.URL_REDIS + 'grupos/getGroups'
global.GRUPO_DESTINATARIO = global.URL_REDIS + 'grupos/grupo-destinatarios'
global.GRUPO_DESTINATARIOXTIPO = global.URL_REDIS + 'grupos/grupo-destinatariosXtipo'
global.GRUPO_DESTINATARIOXGRUPO = global.URL_REDIS + 'grupos/getDestinatarioXGrupos'
global.GRUPO_SEGMENTO_CREATE = global.URL_REDIS + 'grupos/grupo-segmento'
global.GRUPO_DESTINATARIO_SAVE = global.URL_REDIS + 'destinatario'
global.GRUPOS = global.URL_REDIS + 'grupos'
global.GRUPO_SEGMENTO_CONVIERTE = global.URL_REDIS + 'grupos/cambiar-tipo'
global.GRUPO_CLONAR = global.URL_REDIS + 'grupos/clonar-grupo'
global.DESTINATARIO_ID = global.URL_REDIS + 'destinatario/getDestinatariosXId'
global.GET_PARAMETROS_GRUPO = global.URL_REDIS + 'grupos/parametrosGenerales'
global.GET_PARAMETROS_GENERALES_ID = global.URL_NOTIFY + "parametro-general/parametroXId"

// DESTINATARIO API
global.DEST_API = 'http://desa.goitsa.me:8990/goit-notify-api/v1/'
global.DESTINATARIO_SAVE = global.DEST_API + 'destinatario'
global.GET_DESTINATARIOS_ERROR = global.DEST_API + 'destinatario/getDestinatariosFallidos'

global.SAVE_DEST_UNIT = global.URL_REDIS + 'destinatario/destinatarioUnitario'

// REPORT API
global.REPORT_API = "http://desa.goitsa.me:8992/goit-reporteria-api/v1/";
global.NOTSEND_REPORT =
  global.REPORT_API + "reporteria/mostrarNotfEnviadas";
global.DESP_REPORT = global.REPORT_API + "reporteria/despachados";
global.IN_REPORT = global.REPORT_API + "reporteria/ingresados";
global.DATEDESP_REPORT = global.REPORT_API + "reporteria/fechaDespachada";

// REPORT API DETAIL
global.DESP_REPORT_DETAIL = global.REPORT_API + "reporteria/detalleDespachas";
global.PRO_REPORT_DETAIL = global.REPORT_API + "reporteria/detalleProgramadas";
global.NOTSEND_REPORT_DETAIL = global.REPORT_API + "reporteria/detalleNotificaciones";
global.DATEDESP_REPORT_DETAIL = global.REPORT_API + "reporteria/detalleUltimaFecha";

// DASHBOARD API
global.SEND_NOTIFICATION = global.REPORT_API + 'reporteria/notfEnviadas'
global.SEND_CANAL_NOTIFICATION = global.REPORT_API + 'reporteria/notfEnviadasPorCanal'
global.WHATS_EFI = global.REPORT_API + 'reporteria/eficienciaWs'
global.SMS_EFI = global.REPORT_API + 'reporteria/eficienciaSms'
global.MAIL_EFI = global.REPORT_API + 'reporteria/eficienciaEmail'

global.TESTIMG = "/load/imgaLoad.php";

// CONTACT API
global.CONTACT_LISTCONTACT = global.URL_REDIS + "grupos/getGroups?tipoCanal=";
// DESUSCRIPCION API
global.DESUSCRIPCION = global.URL_NOTIFY + "listaGris/desuscripcion";

// routes
global.ROUTE_CREATEMAILTEMPLATESPROGRAMATION = "/notify/crear-plantilla-mail-programacion";
global.ROUTE_CREATESMSTEMPLATESPROGRAMATION = "/notify/crear-plantilla-sms-programacion";
global.ROUTE_CREATEWHATSAPPTEMPLATESPROGRAMATION = "/notify/crear-plantilla-whatsapp-programacion";
global.ROUTE_LOGIN = '*'
global.ROUTE_LOGIN_BASIC = '/notify/login'
global.ROUTE_PASSWORD = '/notify/recuperar'
global.ROUTE_CHANGEPASSWORD = '/notify/cambiar-password/:proceso'
global.ROUTE_CREATEUSER = '/notify/nuevo-usuario'
global.ROUTE_WELCOME = '/notify/bienvenido'
global.ROUTE_VALIDATE = '/notify/validar/:proceso'
global.ROUTE_USER_CREATED = '/notify/confirmacion'
global.ROUTE_HOME = '*'
global.ROUTE_ACTIVACIOMAIL = '/notify/usuario/:proceso'
global.ROUTE_DASHBOARD = '/notify/dashboard'
global.ROUTE_TEMPLASTES = '/notify/plantillas'
global.ROUTE_CAMPAIGN = '/notify/campaign'
global.ROUTE_CREATECAMPAIGN = '/notify/crear-campaign'
global.ROUTE_CREATEMAILTEMPLATES = '/notify/crear-plantilla-mail'
global.ROUTE_CREATESMSTEMPLATES = '/notify/crear-plantilla-sms'
global.ROUTE_CREATEWHATTEMPLATES = '/notify/crear-plantilla-whatsapp'
global.ROUTE_EDITMAILTEMPLATES = '/notify/editar-plantilla-mail'
global.ROUTE_EDITSMSTEMPLATES = '/notify/editar-plantilla-sms'
global.ROUTE_EDITWHATTEMPLATES = '/notify/editar-plantilla-whatsapp'
global.ROUTE_CONGRATULATIONPASSWORD = '/notify/congratulation'
global.ROUTE_CONTACT = '/notify/contact'
global.ROUTE_USER_INFO = '/notify/usuario-info'
global.ASDD_FILES = '/notify/adjuntar-archivos'
global.ROUTE_RECUPERAR = '/notify/recuperar'
global.ROUTE_REPORT = '/notify/report'
global.ROUTE_DESUSCRIPT = '/notify/desuscripcion/:idTicket/:mail'

// Global var
global.USER_ID = ''
global.RETORNO = ' Programación de campañas'
global.HEADER = ''
global.BODY = ''
global.ERROR = 1
global.ERROR_LABEL = ''
global.EXPIRE_DATE = 1
global.REDIRECT_URL = ''
global.WELCOME = 'Bienvenido'
global.WELCOME_STRING = 'Por favor ingrese su usuario y contraseña'
global.USERNAME = 'Usuario o correo'
global.PASSWORD = 'Contraseña'
global.RESTORE_PASSWORD = 'Nueva contraseña'
global.FORGOT = 'Olvidé mi Contraseña'
global.NEW_USER = '¿No tienes cuenta?'
global.FORGOTTEXT = 'Restablece tu contraseña'
global.FORGOTTEXTP = 'Ingresa tu correo electrónico'
global.COMEBACKLOGIN = 'Volver al Login'
global.SENDPASS = 'Recuperar'
global.FOOTER = 'Desarrollado por GoIt S.A. - ©Copyright '
global.OOPS = '¡Ups!'
global.OOPS_HEARD = 'Olvidaste la contraseña'
global.OOPS_STRING = 'Por favor ingresa tu email para que puedas restablecer tu contraseña.'
global.RESTORE = 'Restablece tu contraseña'
global.RESTORE_STRING = 'Ingresa tu nueva contraseña'
global.ERROR_TRYCATCH = 'Ocurrio un error, intentelo en unos momentos por favor.'
global.DATE_SEPARATOR = '-'
global.HOUR_SEPARATOR = ':'
global.FIELD = ''
global.INPUT_FIELD = ''
global.INPUT_FIELD = ''
global.LABEL_INPUT_ERROR = ''
global.LABEL_EMPTY_ERROR = 'Por favor ingrese los campos obligatorios.'
global.LABEL_EMPTY_ERROR_CRITERIO = 'Los campos del criterio son obligatorios'
global.LABEL_MAX_LENGTH_ERROR = 'El campo no puede exceder de '
global.LABEL_MIN_LENGTH_ERROR = 'El campo no puede ser menor de'
global.LABEL_ERROR_PASS = 'contraseñas no coinciden'
global.LABEL_ERROR_EMAIL = 'Por favor ingrese un correo válido.'
global.LENGTH_PHONE_ID = 10
global.LENGTH_NAME_LAST = 100
global.LENGTH_PASS = 45
global.LENGTH_IDENTITY = 100 // ojo
global.MESSAGES_CREATE_USER = 'Consulta tu email con el link de verificación si el mensaje no se encuentra en tu bandeja de entrada revisa tu carpeta de Spam o correos no deseados.'
global.CLOSE_MODAL = false
global.LINK_EMAIL = 'Reenviar email de verificación'
global.MESSAGES_ALERT = 'Debe tener combinación de letras [Aa-Zz], minimo 6 caracteres y al menos un dígito. NO puede tener otros símbolos.'
global.NAMECAMPANA = ''
global.CODEERROR = ''
global.CODEERRORSET = '400'
global.ERROR_SERVICE_OFF = 'Lo sentimos el servicio no está disponible ahora, intenta en unos minutos. Si el problema persiste comunícate con el área técnica.'
// message
global.HAVECAMPAIGN = 0
global.MODAL_HEAD_WARNING = 'Advertencia'
global.MODAL_HEAD_ERROR = 'Error'
global.MODAL_HEAD_SUCCESS = 'Exito'
global.MODAL_BODY_SUCCES = 'Bienvenido '
global.MODAL_HEAD_DELETE_TEMPLATE = 'Eliminar la plantilla'
global.MODAL_DELETE_TEMPLATE = '¿Está seguro de eliminar la plantilla?'
global.MODAL_HEAD_CANCEL_TEMPLATE = 'Cancelar la plantilla'
global.MODAL_CANCEL_TEMPLATE = '¿Está seguro de cancelar la plantilla?'
global.MODAL_ELIM_LISTA = '¿Está seguro de eliminar la lista?'
global.MODAL_ELIM_SGEMENTO = '¿Está seguro de eliminar el segmento?'
global.MODAL_ELIM_DESTINATARIO = '¿Está seguro de eliminar el contacto?'
global.MODAL_CONV_SEGMENTO = '¿Está seguro de convertir el segmento a Lista Principal?'
global.MODAL_CLONAR_LISTA = '¿Está seguro de clonar la lista?'
global.MODAL_HEAD_DELETE_FILE = 'Eliminar adjunto'
global.MODAL_DELETE_FILE = '¿Está seguro de eliminar el adjunto de la plantilla?'
global.FILES = []

// btn
global.ACCEPT = 'Aceptar'
global.CANCEL = 'Cancelar'
global.CLOSE = 'Cerrar'

// text for TemplatesHistory
global.TYPE_TEMPLATE = 'Tipo de Plantilla'
global.CREATE_DATE = 'Fecha de creación'
global.CREATE_TEMPLATE_MAIL = 'Plantilla mail'
global.CREATE_TEMPLATE_SMS = 'Plantilla SMS'
global.CREATE_TEMPLATE_WHATS = 'Plantilla whatsapp'
global.TEMPLATE_SEARCH = 'Buscar:'
global.TEMPLATE_TITLE = 'Mis plantillas'
global.TEMPLATE_FILTER = 'Filtrar por:'
global.TEMPLATE_FILTER_ALL = 'Todos'
global.TEMPLATE_FILTER_SMS = 'SMS'
global.TEMPLATE_FILTER_MAIL = 'Mail'
global.TEMPLATE_FILTER_WHATSAPP = 'Whatsapp'
global.TEMPLATE_ORDER = 'Ordenar por:'
global.TEMPLATE_NOT_INFO = 'No se encontraron registros de Plantillas'

global.REQUIRED = '*'

// text for crear-plantilla-mail
global.MY_LIBRARY = 'Mi Librería'
global.SELECT_A_IMG = 'Seleccionar un archivo'
global.SAVE_IMG = 'Cargar Archivo'
global.SELECT_IMG = 'Seleccionar una imagen'
global.RETURN_TEMPLATE = 'Regresar'
global.CREATE_MAIL_TEMPLATE = 'Creación de plantilla mail'
global.TEMPLATE_NAME = 'Nombre de la plantilla'
global.TEMPLATE_DESCRIPTION = 'Descripción de la plantilla'
global.TEWMPLATE_NAME_REMIT = 'Nombre del remitente'
global.TEMPLATE_NAME_REMIT_DESC = 'Dirección de correo del remitente'
global.TEMPLATE_ASUN = 'Asunto'
global.TEMPLATE_ATTACH_DOC = 'Documentos Adjuntos'
global.TEMPLATE_COD = 'Código'
global.TEMPLATE_CLEAR = 'Limpiar'

// text for crear-plantilla-sms
global.CREATE_SMS_TEMPLATE = 'Creación de plantilla sms'

// text for crear-plantilla-whatsApp
global.CREATE_WHTAS_TEMPLATE = 'Creación de plantilla WhatsApp'
global.CONTENT = 'Contenido'
global.TEMPLATE_NAME_WHAT = 'Nombre de la plantilla'
global.TEMPLATE_DESCRIPTION_WHAT = 'Descripción de la plantilla'
global.TEMPLATE_ASUN_WHAT = 'Mensaje'

// text for dropzone
global.DROP = 'Arrastra aquí tus archivos, o puedes buscarlo en tu dispositivo'
global.WEIGTH = 'El peso máximo por archivo es de 7 MB'
global.TEMPLATE_CONFIG = 'Configuración'
global.TEMPLATE_NAME_SMS = 'Nombre de la plantilla'
global.TEMPLATE_DESCRIPTION_SMS = 'Descripción de la plantilla'
global.TEMPLATE_ASUN_SMS = 'Mensaje'

// message plantillas
global.LOAD_TEMPLATE_WITHOUTINFO = 'No se encontraron plantillas'
global.LOAD_TEMPLATE_FALSE_ERROR = 'No se pudieron consultar las plantillas, intente en unos momentos por favor'
global.LOAD_TEMPLATE_FALSE_ERROR_NOMBRE = 'No se encontraron plantillas con el nombre'
global.LOAD_TEMPLATE_VIEW_NOT_INFORMATION = 'No existe detalle para la plantilla que desea consultar'
global.LOAD_TEMPLATE_VIEW_ERROR = 'No se pudo connsultar el detalle de la plantilla seleccionada'
global.LOAD_DELETE_TEMPLATE_ERROR = 'No se pudo eliminar la plantilla, intente en unos momentos por favor'
global.LOAD_DUPLY_TEMPLATE_ERROR = 'No se pudo duplicar la plantilla, intente en unos momentos por favor'
global.LOAD_TEMPLATE_MAIL_IMG = ''
global.LOAD_TEMPLATE_MAIL_IMG_ERROR = 'Ocurrió un error al cargar las imagenes para la plantilla'
global.LOAD_TEMPLATE_FAVORITOS_ERROR = 'Ocurrió un error, por favor intente más tarde'
global.CREATE_TEMPLATE_FAIL = 'Ocurrió un error al cear la plantilla'
global.CREATE_TEMPLATE_DETAIL_FAIL = 'Ocurrió un error al crear el detalle de la plantilla'
global.EDIT_TEMPLATE_FAIL = 'Ocurrió un error al actualizar la plantilla'
global.SAVE_IMG_ERROR = 'Ocurrió un error al cargar la imagen'
global.SAVE_IMG_TEMPLATE_FIRST = 'Para poder guardar una imagen deberá primero guardar la plantilla'
global.SAVE_IMG_INFO = 'Debe seleccionar una imagen para guardar'
global.TEMPLATE_LOAD_ERROR = 'No se pudo consultar el detalle de la plantilla, intente en unos momentos'
global.TEMPLATE_SAVE_FILES_ERRORS = 'Ocurrió un error al guardar el archivo'
global.EMAIL_INVALIDO = 'Email ingresado es inválido'
global.CAMPO_CORREO_REQUERIDO = 'Para las listas tipo mailing se requiere el correo de los contactos.'
global.CAMPO_TELMOV_REQUERIDO = 'Para las listas tipo mensajería instantánea se requiere el teléfono móvil de los contactos.'
global.CAMPO_TELEFONO_CORREO_REQUERIDO = 'Para las listas tipo mailing se requiere el correo y para mensajería instantánea el teléfono móvil.'
global.CONTACTOS_REQUERIDO = '¡Los Contactos son requeridos!'
global.ERROR_CREACION_GRUPO = '¡Error Creacion de Grupo!'
global.CREA_GRUPO_DESTINATARIO_FALLIDO = '¡Grupo Creado con contactos Fallidos!'
global.ERROR_SAVE_DESTINATARIO_GRUPO = '¡Error guardar contacto en Grupo!'
global.TEXT_GRUPO_ERROR_DESTINATARIO = 'Es probable que existan registros con errores. Por favor, verifica los datos y vuelve a crear a lista o agrégalos individualmente.'
global.LISTA_CREDA_OK = '¡Lista Creada Exitosamente!'
global.HEADER_TEXT_DESTINATARIO_LISTA = 'Información Contactos Lista'
global.HEADER_BAD_CARGA = 'Ops! No se cargó la base completa'
global.TEXT_SAVE_LISTA = 'La lista se creó exitosamente, los contactos serán procesados parcialmente'
global.HEADER_SAVE_LISTA = 'Crear Lista'
global.TEXT_CHANGE_CANAL_LIST = 'Recuerda que para el tipo de canal mailing se requiere el correo y para mensajería instantánea el teléfono móvil. Verifica si tu lista de contactos contiene los campos requeridos. ¿Estás seguro de cambiar el tipo de canal?'
global.HEADER_CONTACT_EXCEDE = '¡Ops cantidad de Contactos excedida!'
global.TEX_CONTACT_EXCEDE = 'Ha excedido la cantidad de contactos permitidos para la carga por texto,le recomendamos utilizar la carga de contactos por archivo'
global.LOAD_DELETE_IMAGE = 'No se pudo eliminar la imagen, intente en unos momentos por favor'
// text for dashboard
global.LAST_MONTH = 'Últimos 3 Meses'
global.FOR_CAMPAIGN = 'Por campañas'
global.SEARCH_CAMPAIGN = 'Buscar'
global.DASCHBOARD_CAMPAIGN = 'Campañas'
global.DASHBOARD_ALL = 'Todas'
global.BY_DATE = 'Por fecha'
global.DATE_FROM = 'Fecha desde:'
global.DATE_FROM_2 = 'Fecha hasta:'
global.TYPE_TEMPLATE_H = 'Mail'
global.TYPE_TEMPLATE_T = 'SMS'
global.TYPE_TEMPLATE_E = 'WhatsApp'
global.TITLE_BARS = 'Notificaciones enviadas'
global.TITLE_DONUT1 = 'Notificaciones Enviadas por Canal'
global.TITLE_DONUT2 = 'Eficiencia Mailing'
global.TITLE_DONUT3 = 'Eficiencia SMS'
global.TITLE_DONUT4 = 'Eficiencia Whats'
global.INDICADOR = 'Campañas despachadas'
global.INDICADOR2 = 'Campañas programadas'
global.INDICADOR3 = 'Notificaciones enviadas'
global.INDICADOR4 = 'Última fecha de programación'
global.TEMPLATE_ERASER = 'Limpiar plantilla'
global.DAVE_TEMPLATE = 'Guardar plantilla'

// mensajes servicio campañas
global.LOAD_CAMPAIGN = 'Campañas cargadas'
global.LOAD_CAMPAIGN_WITHOUTINFO = 'No se encontraron campañas'
global.LOAD_CAMPAIGN_FALSE_ERROR = 'No se pudieron consultar las campañas, intente en unos momentos'
global.LOAD_CAMPAIGN_CREATE = 'Campaña creada'
global.LOAD_CAMPAIGN_DELETE = 'Campaña eliminada'
global.LOAD_CAMPAIGN_ACT = 'Campaña Actualizada'

// mensajes secciones campaña
global.ERROR_NAME_CAMPAIGN = 'La campaña ingresada no existe'
global.CAVEAT_CAMPAIGN = 'Por favor, debe seleccionar una campaña'
global.CAMPAIGN_SEARCH = 'Campañas buscadas'
global.CAMPAIGN_TIME = 'Por favor, debe seleccionar fecha y hora'
global.CAMPAIGN_FECHA = 'Por favor, debe seleccionar fecha'
global.CAMPAIGN_HORA = 'Por favor, debe seleccionar hora'
global.CAMPAIGN_TIME_ERROR = 'Por favor, debe seleccionar una hora o minuto superior a la hora actual'
global.LOAD_CAMPAIGN_ERROR = "Lo sentimos, el servicio no esta disponible por el momento."

// mensajes Generales
global.PROCESO_OK = '¡Proceso realizado con éxito!'
global.CAMPOS_OBLIGATORIOS = 'Por favor ingrese los campos obligatorios.'
global.MAIL_ERROR_MESSAGE = 'Por favor ingrese un correo válido.'
global.USUARIO_INACTIVO = 'El usuario ingresado se encuentra inactivo.'

// length template inputs
global.TEMPLATE_NAME_LENGTH = 450
global.DESCRIPTION_LENGTH = 4000
global.SUBJECT_LENGTH = 500
global.SMS_LENGTH = 160
global.WHT_LENGTH = 4000
global.MAIL_LENGTH = 100
global.NAME_REM_LENGTH = 100
global.NAME_EXCE = 'El nombre de plantilla no puede exceder los ' + global.TEMPLATE_NAME_LENGTH + ' caracteres'
global.DESCRIP_EXCE = 'La descripción de la plantilla no puede exceder los ' + global.DESCRIPTION_LENGTH + ' caracteres'
global.SUNJECT_EXCE = 'El asunto de la plantilla no puede exceder los ' + global.SUBJECT_LENGTH + ' caracteres'
global.MAIL_EXCE = 'El mail del remitente no puede exceder los ' + global.MAIL_LENGTH + ' caracteres'
global.NOMBRE_EXCE = 'El nombre del remitente no puede exceder los ' + global.NAME_REM_LENGTH + ' caracteres'
global.SERVICEREPORTGENERAL = global.REPORT_API + 'reporte/reporteDespachado/'
global.SERVICEREPORTCAMP = global.REPORT_API + 'reporte/reporteEncolados/'
global.SERVICEPDFGENERAL = global.REPORT_API + 'reporte/reporteGeneral'
global.GET_REPORTE_DOWNLOAD = global.REPORT_API + 'reporte/generarReporte/'
global.GET_REPORTE_DOWNLOAD_LISTA_NEGRA = global.REPORT_API + 'reporte/listaNegra'
global.GET_REPORTE_DOWNLOAD_LISTA_GRIS = global.REPORT_API + 'reporte/reportListGris'

// LISTA NEGRA Y GRIS API
global.LISTA_GRIS = global.URL_NOTIFY + "listaGris/listarGris/";
global.LISTA_NEGRA = global.URL_NOTIFY + "listaNegra/listarNegra/";
global.DELETE_LISTA_NEGRA = global.URL_NOTIFY + "listaNegra/eliminarListNegra/";

// Datos Remitentes
global.NOMBRE_REMITENTE = 'goitsa'
global.DIRECCION_REMITENTE = 'notify@goitsa.me'
global.ASUNTO_DESUSCRIPCION = 'nuevo'

global.CAMPOS_GRUPO_TITLE = 'Parámetros de Reemplazo'
global.MESSAGE_IMAGE_DELETE = '¡Solo puede eliminar imagenes cargadas por el usuario!'

global.INFO_FECHA = 'El formato de la fecha debe ser AAAA-MM-DD'
// Nombre de Empresa Excluida para editar remitente
global.REMITENTE_BLOQUEADO = 'CNEL'
