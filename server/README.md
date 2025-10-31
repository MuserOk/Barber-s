✅ Conexión a MySQL exitosa!
🚀 Servidor API corriendo en http://localhost:3001```

---

## 🗺️ Rutas de la API (Endpoints)

El servidor expone las siguientes rutas principales:

| Ruta | Método | Descripción | Uso en el Frontend |
| :--- | :--- | :--- | :--- |
| `/api/auth/register` | `POST` | Registra un nuevo usuario (Cliente). | `RegUser.jsx` |
| `/api/auth/login` | `POST` | Autentica al usuario y devuelve un JWT. | `LogIn.jsx` |
| `/api/turnos` | `POST` | Crea una nueva reserva de turno. | `FormTurno.jsx` |
| `/api/tendencias` | `GET` | Obtiene la lista de tendencias de corte. | `CardsTendencias.jsx` |
| `/api/perfil/:id` | `GET` | Obtiene los datos del perfil de un usuario/barbero. | `Perfil.jsx` |

### Rutas Protegidas

Las rutas que requieren que el usuario esté autenticado (como crear un turno o actualizar el perfil) deben incluir el **JWT** en el encabezado `Authorization: Bearer <token>`.

---

## 📂 Estructura del Directorio

server/
├── config/
│ └── db.js # Configuración del pool de conexiones a MySQL.
├── routes/
│ └── auth.js # Lógica para /api/auth/register y /api/auth/login.
├── index.js # Punto de entrada del servidor Express.
├── .env # Variables de entorno (IGNORADO por Git).
└── .env.example # Plantilla de variables de entorno (SÍ subido a Git).
