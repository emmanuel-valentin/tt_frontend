# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Install the dependencies:

```shellscript
npm i
```

Set up all the environment variables by renaming `.env.template` to `.env` and add their corresponding value:

```shellscript
# API base URL
VITE_API_URL="···"

# You can generate this cookie by running:
# node -e "console.log(require('crypto').randomBytes(32).toString('base64'));"
VITE_COOKIE_SECRET="···"
```

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
