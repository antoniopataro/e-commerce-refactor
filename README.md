https://user-images.githubusercontent.com/87823281/185812012-8a9070a2-fb4f-49fb-96db-d9beade7f0ab.mp4

# e-commerce refactor

when i first started learning web development, e-commerces were the big thing to test your skills. due to that, i decided to build one myself.

this current version is a refactor of one i finished mid-2022, which may be [here.](https://github.com/antoniopataro/my-sandbox/tree/main/old-projects/e-commerce)

in the making, i also took the chance to learn some back-end using real databases, which was a real broken barrier for me.

### how to run
honestly, it's worth the trouble. but if you really want to, follow along:

1. you'll need a local postgresql database. so pull a docker instance, it's easier
2. create a `.env` file and set `DATABASE_URL` to your local postgresql connection url
3. run `npx prisma migrate dev` to create the necessary tables in the database
5. clone the repository w/ `git clone git@github.com:antoniopataro/e-commerce-refactor.git`
6. install its dependencies w/ npm install or other package manager you might wanna use
7. either run npm run dev for a development version or npm run build && npm start for a production preview version

you'll probably see no products. there's a primitive admin interface i've created to manage products, try accessing it.

if something breaks, feel free to make a pr.

### stack and dependencies:

- jsonwebtoken
- next.js
- postgresql
- prisma
- tailwindcss w/ postcss
- typescript
