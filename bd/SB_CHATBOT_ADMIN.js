use "SB_CHATBOT_ADMIN"

db.Menu.drop()
db.ChatBot.drop()
db.CatalogoErrores.drop()
db.Usuario.drop()
db.MenuChatBot.drop()
db.Parametro.drop()

db.createCollection('Menu')
db.createCollection('ChatBot')
db.createCollection('MenuChatBot')
db.createCollection('CatalogoErrores')
db.createCollection('Usuario')
db.createCollection('Parametro')

db.Parametro.insertMany(
    [{"llave":"FechaActualizacion","valor":new Date(), "descripcion":"Es la ultima fecha de actualizacón del localstorage, el cual es utilizado por el front para saber cuando se debe recargar las listas parametricas"}]);

db.Menu.insertMany(
    [{"titulo":"Visión General", "link":"/", "icono":"show_chart", "estado":"A"},
    {"titulo":"Calificación", "link":"/qualification", "icono":"pie_chart", "estado":"A"},
    {"titulo":"Seguimiento", "link":"/", "icono":"table_chart", "estado":"A"},
    {"titulo":"Comportamiento", "link":"/", "icono":"linear_scale", "estado":"A"},
    {"titulo":"Watson", "link":"/", "icono":"camera_front", "estado":"A"}]);

db.ChatBot.insertMany(
    [{"titulo":"ChatBot Interno","url":"https://chatinterno-api.mybluemix.net", "urlLocal":"https://chatinterno-segurosbolivar-api.mybluemix.net","link":"/home","icono":"adb"},
    {"titulo":"ChatBot Externo","url":"https://chatexterno-api.mybluemix.net", "urlLocal":"https://chatexterno-segurosbolivar-api.mybluemix.net","link":"/home","icono":"android"}]);

db.MenuChatBot.insertMany(
    [{"titulo":"ChatBot Interno","url":"https://chatinterno-api.mybluemix.net", "urlLocal":"https://chatinterno-segurosbolivar-api.mybluemix.net", "link":"/home","icono":"adb", 
        "ChatBot":
            [{"titulo":"Visión General","link":"overview", "icono":"show_chart", "estado":"A"},
            {"titulo":"Calificación", "link":"qualification", "icono":"pie_chart", "estado":"A"},
            {"titulo":"Seguimiento", "link":"tracing", "icono":"table_chart", "estado":"A"},
           // {"titulo":"Watson", "link":"visual", "icono":"camera_front", "estado":"A"},
            {"titulo":"Comportamiento", "link":"behavior", "icono":"linear_scale", "estado":"A"}]},
    {"titulo":"ChatBot Externo","url":"https://chatexterno-api.mybluemix.net", "urlLocal":"https://chatexterno-segurosbolivar-api.mybluemix.net","link":"/home","icono":"android",
        "ChatBot":
            [{"titulo":"Visión General", "link":"overview", "icono":"show_chart", "estado":"A"},
            {"titulo":"Calificación", "link":"qualification", "icono":"pie_chart", "estado":"A", "paginasHijas":[{"titulo":"Detalle Calificación", "link":"detailQualification", "icono":"pie_chart", "estado":"A"}]},
            {"titulo":"Seguimiento", "link":"tracing", "icono":"table_chart", "estado":"A"},
            {"titulo":"Comportamiento", "link":"behavior", "icono":"linear_scale", "estado":"A"},
            {"titulo":"Reportes", "link":"report", "icono":"description", "estado":"A", 
                "resportes":
                        [{"titulo":"Número de interacciones chatbot","descripcion":"Número de interacciones o veces que una persona accedió al inicio (saludo) del chatbot.","nombre":"cantidadInicioBot"},
                        {"titulo":"Ingreso de datos","descripcion":"Total de veces en las que las personas culminaron el proceso de ingreso de datos básicos.","nombre":"cantidadCapturaDatos"},
                        {"titulo":"Compra de Productos","descripcion":"Número de veces que se seleccionó esta opción en las opciones (tarjetas) del chatbot.","nombre":"cantidadCompraProductos"},
                        {"titulo":"Conozca de su seguro","descripcion":"Número de veces que se seleccionó esta opción en las opciones (tarjetas) del chatbot.","nombre":"cantidadConozcaSeguro"},
                        {"titulo":"Otra consulta","descripcion":"Número de veces que se seleccionó esta opción en las opciones (tarjetas) del chatbot.","nombre":"cantidadOtraConsulta"},
                        {"titulo":"Productos ARL","descripcion":"Total de consultas sobre información de ARL automatizada por el bot.","nombre":"cantidadProductosArl"},
                        {"titulo":"Productos Bancaseguros","descripcion":"Total de consultas sobre información de Bancaseguros automatizada por el bot.","nombre":"cantidadBancaseguros"},
                        {"titulo":"Total conversaciones recibidas por Purecloud","descripcion":"Número de conversaciones que fueron transferidas por el bot hacia Purecloud","nombre":"cantidadPureCloud"},
                        {"titulo":"Horario no disponible","descripcion":"Interacciones que se generaron en horarios no disponibles","nombre":"cantidadHararioNoDisponible"},
                        {"titulo":"Agente no disponibles","descripcion":"Interacciones que se generaron en un momento en el que NO habían agentes disponibles","nombre":"cantidadAgentesNoDisponibles"},
                     ] }
           ]}
         ]);


db.CatalogoErrores.insertOne({codigo:"100", descripcion:"Usuario y/o contraseña incorrecta"});

db.Usuario.insertMany(
    [{usuario:"leonel.pedrozo", password:"12345678", ChatBot:[{"titulo":"ChatBot Interno","url":""}]},
    {usuario:"mmurciar", password:"12345", ChatBot:[{"titulo":"ChatBot Interno","url":""}, {"titulo":"ChatBot Externo","url":""}]},
    {usuario:"afcatano", password:"123456", ChatBot:[{"titulo":"ChatBot Interno","url":""}, {"titulo":"ChatBot Externo","url":""}]}]);


db.Usuario.insertMany(
    [{usuario:"rafael.buitrago", password:"123456", ChatBot:[{"titulo":"ChatBot Interno","url":""}, {"titulo":"ChatBot Externo","url":""}]},
    {usuario:"admin.seguros", password:"123456", ChatBot:[{"titulo":"ChatBot Interno","url":""}, {"titulo":"ChatBot Externo","url":""}]}]);


