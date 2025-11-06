# Project Demo

This is a test project for full stack developers

## Getting Started

Design and implement a small, self‑contained enhancement to this app to demonstrate full‑stack skills, code quality, and UX judgment. Keep scope tight; prefer clear, well‑tested code over breadth.

## 🚀 Vercel Deployment

This project is configured for easy deployment on Vercel. See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy:**
1. Push your code to GitHub/GitLab/Bitbucket
2. Import project to Vercel
3. Add environment variables (see `.vercel.example.env`)
4. Deploy!

**Note:** File uploads require cloud storage (S3, Cloudinary, etc.) as Vercel's file system is ephemeral.


## What you will build

### Update filter & search button

You can find those components in ./src/components/shop/home/ProductCategoryDropdown.js

### 1. Combine two buttons into one

![current image](./public/smd1.png)

### 2. Show two search inbox - one for title, one for category

![current image](./public/smd2.png)

### 3. Add a new backend api for new feature

- Create /api/product/product-by-search api
- Handle errors gracefully (400 on invalid/missing maxPrice; 500 on unexpected errors).
- Request shape:
  - title: string
  - description: string
  - maxPrice: string
- Response shape:
  - success: boolean
  - items: Array<{ id: string; title: string; price: number }>
  - count: number

## How To Install
```sh
$ npm install --legacy-peer-deps
$ npm start
```

## How To Migrate

```sh
$ npm run db:seed
```

### You can get the seed data from ./server/data/*.js