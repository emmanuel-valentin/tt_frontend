# Trabajo Terminal Web App

## Desarrollo

1. Descarga las herramientas necesarias para el desarrollo de esta aplicación:

   - [Node.js](https://nodejs.org/en).
   - Un editor de código de tu preferencias que soporte Prettier y las configuraciones añadidas en el archivo `.editorconfig`. Se recomienda [Visual Studio Code](https://code.visualstudio.com/).

2. Clona esta repositorio, para trabajar localmente.

```bash
# Utilizando Git a través de HTTPS o SSH
git clone https://github.com/emmanuel-valentin/tt_frontend.git # HTTPS
git clone git@github.com:emmanuel-valentin/tt_frontend.git # SSH

# O alternativamente con GitHub CLI (Ver más en https://cli.github.com/)
gh repo clone emmanuel-valentin/tt_frontend
```

3. Instala las dependencias del proyecto a través de npm. **En este punto, es necesario que Node.js esté instalado en su sistema**.

```bash
npm install

# De forma más corta
npm i 
```

4. Una vez que las dependencias han sido instaladas, dentro del archivo `package.json` se encuentran una serie de scripts que son de utilidad para generar el build de produción, previsualizar dicho build de producción y levantar el servidor de desarrollo, entre otros.

   A continuación, se muestra cómo se lenta el servidor de desarrollo.

```bash
npm run dev
```

5. Abre el servidor de desarrollo en [http://localhost:3000](http://localhost:3000) en el navegador de tu preferencia.

> [!IMPORTANT]
> **Nota:** Generalmente, el servidor de desarrollo se levanta en el puerto `3000`,sin embargo, deberás verificarlo en la terminal donde has ejecutado el comando para levantar el servidor de desarrollo.
