https://user-images.githubusercontent.com/87823281/185812012-8a9070a2-fb4f-49fb-96db-d9beade7f0ab.mp4

#### About
When I first started learning web development, for me, e-commerces were the big thing to test your skills. Due to that, I decided to build one myself.

This current version is a refactor of one I made mid-2022, which may be [here.](https://github.com/antoniopataro/my-sandbox/tree/main/old-projects/e-commerce)

In the making, I also took the chance to learn some back-end stuff by using real databases. It may look silly, but was a real broken barrier for me.

#### Instructions
Honestly, it's not worth the trouble... but, if you really want to, follow along:

1. You'll need a running PostgreSQL database. Use docker;
2. Clone the repository w/ `git clone git@github.com:antoniopataro/e-commerce-refactor.git`;
3. Install its dependencies w/ `npm install` or other package manager you might wanna use;
4. Create a `.env` file and set `DATABASE_URL` to your PostgreSQL connection address;
5. Run `npx prisma migrate dev` to create the default tables in the database;
6. Either run `npm run dev` for a development version or `npm run build && npm start` for a production preview version.

You'll probably see no data. No, there's no seed command. However, there's a primitive admin interface I've created to manage products somewhere around the routes. Try accessing it.

If something breaks, feel free to make a pull request.

#### Tech:
- jsonwebtoken;
- next.js;
- postgresql;
- prisma;
- tailwindcss w/ postcss;
- typescript.
