# Portafolio

## Descripción

Portafolio es un proyecto desarrollado en node.js y Vue 3 para el desarrollo de un portafolio personal.

## Tecnologías

- Node.js
- Express
- Vue 3
- MySQL
- JSON Web Token
- JWT

## Estructura del proyecto

El proyecto está dividido en dos partes principales:

1. Backend: El backend es un servidor Express que se encarga de manejar las peticiones de los usuarios y proporcionar datos de usuarios, experiencias, fragmentos de código, repositorios favoritos y cursos realizados.

2. Frontend: El frontend es una aplicación web que se encarga de mostrar los datos de usuarios, experiencias, fragmentos de código, repositorios favoritos y cursos realizados.

## Configuración del backend

Para configurar el backend, sigue los siguientes pasos:

1. Clonar el repositorio:

```
git clone https://github.com/Gatroxm/app.portafolio.git
```

2. Instalar las dependencias:

```
cd app.portafolio/portfolio-backend
npm install
```

3. Crear la base de datos y cargar los datos de prueba:

```
cd app.portafolio/portfolio-backend
mysql -u root -p
```

4. Crear la base de datos y cargar los datos de prueba:

```
CREATE DATABASE portafolio;
use portafolio;
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(150) NOT NULL UNIQUE,
  nickname VARCHAR(50),
  password VARCHAR(256),
  rol ENUM('admin', 'usuario') DEFAULT 'usuario',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE experiencias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  empresa VARCHAR(150) NOT NULL,
  cargo VARCHAR(100) NOT NULL,
  fecha_inicio DATE,
  fecha_fin DATE,
  descripcion TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
CREATE TABLE fragmentos_codigo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  titulo VARCHAR(150),
  descripcion TEXT,
  lenguaje VARCHAR(50),
  codigo LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
CREATE TABLE repositorios_favoritos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  nombre VARCHAR(150) NOT NULL,
  url VARCHAR(255) NOT NULL,
  descripcion TEXT,
  tecnologias VARCHAR(150),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
CREATE TABLE cursos_realizados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  nombre_curso VARCHAR(150) NOT NULL,
  institucion VARCHAR(150),
  fecha_finalizacion DATE,
  certificado_url VARCHAR(255),
  descripcion TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
CREATE TABLE mensajes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  para_usuario_id INT NOT NULL,
  nombre_emisor VARCHAR(100),
  email_emisor VARCHAR(150),
  mensaje TEXT,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

5. Iniciar el servidor:

```
npm start
```
6. LogIn de usuarios:

```
curl --location --request POST 'http://localhost:3000/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "usuario@ejemplo.com",
    "password": "123456"
}
```
7. Creación de Usuarios:

```
curl --location --request POST 'http://localhost:3000/api/usuarios' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nombre": "Nombre del Usuario",
    "correo": "correo@ejemplo.com",
    "nickname": "Nickname del Usuario",
    "password": "123456",
    "rol": "admin"
}
```
```
curl --location --request PUT 'http://localhost:3000/api/usuarios/:id' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nombre": "Nombre del Usuario",
    "correo": "correo@ejemplo.com",
    "nickname": "Nickname del Usuario"
}
```
```
curl --location --request DELETE 'http://localhost:3000/api/usuarios/:id' \
--header 'Content-Type: application/json' \
```
```
curl --location --request PUT 'http://localhost:3000/api/usuarios/password/:id' \
--header 'Content-Type: application/json' \
--data-raw '{
    "password": "123456"
}
```

8. Creación de Mensajes:

```
curl --location --request POST 'http://localhost:3000/api/mensajes' \
--header 'Content-Type: application/json' \
--data-raw '{
    "para_usuario_id": 1,
    "nombre_emisor": "Nombre del Usuario",
    "email_emisor": "correo@ejemplo.com",
    "mensaje": "Mensaje del Usuario"
}
```
```
curl --location --request GET 'http://localhost:3000/api/mensajes' \
--header 'Content-Type: application/json' \
```
