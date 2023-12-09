# NEXT.js 13 chirpy
![Thumbnail](https://github.com/LeinahI/Chirpy/assets/53577436/93522668-b80b-45df-8313-82bb3be6ae35)

[![Leinah](https://custom-icon-badges.demolab.com/badge/made%20by%20-Leinah-556bf2?logo=github&logoColor=white&labelColor=101827)](https://github.com/LeinahI)
[![License](https://img.shields.io/github/license/LeinahI/Chirpy?color=dddddd&labelColor=000000)](https://github.com/LeinahI/Chirpy/blob/master/LICENSE)
[![Top Language](https://img.shields.io/github/languages/top/LeinahI/Chirpy?logo=github&logoColor=%23007ACC&label=TypeScript)](https://www.typescriptlang.org/)
[![deployment](https://img.shields.io/github/deployments/LeinahI/Chirpy/Production?logo=vercel&label=Website)](https://chirpy-orcin.vercel.app/)

## 📖 Table of Contents

<details><summary>Table of Contents</summary>

- [Live Demo](#-live-demo)
- [Description](#-description)
- [Purpose](#-purpose)
- [Application Structure](#-application-structure)
- [Technologies Used](#-technologies-used)
- [Get Started](#-get-started)
  - [Prerequisites](#-prerequisites)
  - [Installation and Run Locally](#-installation-and-run-locally)
  - [Scripts](#-scripts)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
  - [Deploy to production (manual)](#-deploy-to-production-manual)
  - [Deploy on Vercel (recommended)](#-deploy-on-vercel-recommended)
  - [Deploy on Netlify](#-deploy-on-netlify)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Acknowledgements](#-acknowledgements)
- [References](#-references)
- [Contact Us](#-contact-us)
- [License](#-license)

</details>

## 🌐 Live Demo
Look at the project's live demonstration: [Chirpy web application](https://chirpy-orcin.vercel.app/)

## 📝 Description
Users can share their thoughts with other users on the social media platform named Chirpy by using this application. Chirpy is a server-side rendering, full-stack web application written in TypeScript and Next.js 13. It makes use of Clerk as the provider of authentication and MongoDB as the database. It uploads pictures to the cloud via UploadThing as well. Tailwind CSS and Shadcn components are utilized for styling the application.

## 🏁 Purpose
Our objective is to develop "Chirpy," an application that addresses accessibility concerns and goes above and beyond to make sure that all users, regardless of their abilities or impairments, feel not only accommodated but also genuinely welcomed. We are committed to developing a platform where inclusion is the norm and understand how crucial it is to make it user-friendly for everyone.

## 🏗 Application Structure
<details><summary><b>Folder Structure</b></summary>

```
chirpy
├─ app
│  ├─ (auth)
│  │  ├─ layout.tsx
│  │  ├─ onboarding
│  │  │  └─ page.tsx
│  │  ├─ sign-in
│  │  │  └─ [[...sign-in]]
│  │  │     └─ page.tsx
│  │  └─ sign-up
│  │     └─ [[...sign-up]]
│  │        └─ page.tsx
│  ├─ (root)
│  │  ├─ activity
│  │  │  └─ page.tsx
│  │  ├─ chirp
│  │  │  ├─ reactions
│  │  │  │  └─ [id]
│  │  │  │     └─ page.tsx
│  │  │  └─ [id]
│  │  │     └─ page.tsx
│  │  ├─ circles
│  │  │  ├─ page.tsx
│  │  │  └─ [id]
│  │  │     └─ page.tsx
│  │  ├─ create-chirp
│  │  │  └─ page.tsx
│  │  ├─ edit-chirp
│  │  │  └─ [id]
│  │  │     └─ page.tsx
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  ├─ profile
│  │  │  ├─ edit
│  │  │  │  └─ page.tsx
│  │  │  └─ [id]
│  │  │     └─ page.tsx
│  │  └─ search
│  │     └─ page.tsx
│  ├─ api
│  │  ├─ uploadthing
│  │  │  ├─ core.ts
│  │  │  └─ route.ts
│  │  └─ webhook
│  │     └─ clerk
│  │        └─ route.ts
│  ├─ favicon_io.zip
│  ├─ globals.css
│  └─ icon.ico
├─ components
│  ├─ atoms
│  │  ├─ EditChirp.tsx
│  │  ├─ FollowUser.tsx
│  │  └─ ReactChirp.tsx
│  ├─ cards
│  │  ├─ ChirpCard.tsx
│  │  ├─ CircleCard.tsx
│  │  └─ UserCard.tsx
│  ├─ forms
│  │  ├─ AccountProfile.tsx
│  │  ├─ Comment.tsx
│  │  ├─ DeleteChirp.tsx
│  │  └─ PostChirp.tsx
│  ├─ shared
│  │  ├─ Bottombar.tsx
│  │  ├─ ChirpsTab.tsx
│  │  ├─ LeftSidebar.tsx
│  │  ├─ Pagination.tsx
│  │  ├─ ProfileHeader.tsx
│  │  ├─ RightSidebar.tsx
│  │  ├─ Searchbar.tsx
│  │  ├─ SearchBarCircles.tsx
│  │  └─ Topbar.tsx
│  └─ ui
│     ├─ button.tsx
│     ├─ form.tsx
│     ├─ input.tsx
│     ├─ label.tsx
│     ├─ tabs.tsx
│     └─ textarea.tsx
├─ components.json
├─ constants
│  └─ index.js
├─ lib
│  ├─ actions
│  │  ├─ chirp.actions.ts
│  │  ├─ circle.actions.ts
│  │  └─ user.actions.ts
│  ├─ models
│  │  ├─ chirp.model.ts
│  │  ├─ circle.model.ts
│  │  └─ user.model.ts
│  ├─ mongoose.ts
│  ├─ uploadthing.ts
│  ├─ utils.ts
│  └─ validations
│     ├─ chirp.ts
│     └─ user.ts
├─ middleware.ts
├─ next.config.js
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ assets
│  │  ├─ community.svg
│  │  ├─ create.svg
│  │  ├─ delete.svg
│  │  ├─ edit-yl.svg
│  │  ├─ edit.svg
│  │  ├─ follow-wt.svg
│  │  ├─ following-svg.svg
│  │  ├─ following-wt.svg
│  │  ├─ heart-filled.svg
│  │  ├─ heart-stroke.svg
│  │  ├─ home.svg
│  │  ├─ logout.svg
│  │  ├─ Logo_Chirpy.svg
│  │  ├─ members-wt.svg
│  │  ├─ members.svg
│  │  ├─ more.svg
│  │  ├─ profile.svg
│  │  ├─ reply-wt.svg
│  │  ├─ reply.svg
│  │  ├─ repost.svg
│  │  ├─ request.svg
│  │  ├─ search-gray.svg
│  │  ├─ search.svg
│  │  ├─ share.svg
│  │  ├─ tag.svg
│  │  ├─ unfollow-wt.svg
│  │  └─ user.svg
│  ├─ next.svg
│  └─ vercel.svg
├─ README.md
├─ tailwind.config.js
├─ ts.txt
└─ tsconfig.json

```

</details>

<details><summary><b>Look at each folder cautiously to see what they contain</b></summary>

#### `app/`

`(auth)/` - `(root)/` - `(api)/`

In the app directory, nested folders are normally mapped to URL paths. However, you can mark a folder as a Route Group to prevent the folder from being included in the route's URL path.

This allows you to organize your route segments and project files into logical groups without affecting the URL path structure.

For example,

<img src="https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Froute-group-organisation.png&w=1920&q=75&dpl=dpl_5QyHJTqH6oRYZ4QJMFM7s3b9DHZZ" width="50%" />

#### `components/`

`atoms/` - `cards/` - `forms/` - `shared/` - `ui/`

The components directory contains all the components used in the application. The components are grouped into atoms, cards, forms, shared and ui.
the `ui` folder generated by `shadcn/ui` package and contains all the required shadcn components that used in the application.

#### `constants/`

`index.js`

This is a JavaScript code contains all the constants used in the application, specifically the Sidebar Navigation (`sidebarLinks`), Profile Tabs (`profileTabs`) and Circle Tabs (`circleTabs`) constants.

#### `lib/`

`actions/` - `models/` - `validations/` - `mongoose.ts` - `uploadthing.ts` - `utils.ts`

The **lib** folder holds crucial components for _Chirpy App_:

- **actions**: Manage actions for Circle, Chirp, and User entities using Mongoose for database interaction.
- **models**: Define mongoose schemas for Circle, Chirp, and User entities.
- **validations**: Provide validation schemas with Zod for Chirp and User data.
- **mongoose.ts**: Establishes and manages MongoDB connections for the application.
- **uploadthing.ts**: Offers a React utility for simplified file uploads to UploadThing.
- **utils.ts**: Contains various reusable utility functions.

#### `public/`

`assets/` - `next.svg` - `vercel.svg`

The public directory contains the media used in the application. The assets folder contains all the images used in the application.

</details>

## ✨ Technologies Used

<details><summary><b>Chirpy</b> is built using the following technologies:</summary>

- [TypeScript](https://www.typescriptlang.org/): TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
- [Next.js 13](https://nextjs.org/): Next.js is a React framework for building server-side rendered and statically generated web applications.
- [Tailwind CSS](https://tailwindcss.com/): Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.
- [Shadcn](https://shadcn.com/): Shadcn is a collection of Tailwind CSS components.
- [Clerk](https://clerk.dev/): Clerk is a developer-first authentication API that handles all the logic for user sign up, sign in, and more.
- [UploadThing](https://uploadthingy.com/): UploadThing is a simple, fast, and reliable file uploader for your website.
- [MongoDB](https://www.mongodb.com/): MongoDB is a general purpose, document-based, distributed database built for modern application developers and for the cloud era.
- [Mongoose](https://mongoosejs.com/): Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
- [Zod](https://zod.dev/): Zod is a TypeScript-first schema declaration and validation library.
- [svix](https://svix.com/): Svix is a webhook proxy that allows you to receive webhooks locally.
- [emoji-mart](https://missiveapp.com/open/emoji-mart): Emoji Mart is a customizable. emoji picker HTML component for the web.
- [Vercel](https://vercel.com/): Vercel is a cloud platform for frontend developers, providing the frameworks, workflows, and infrastructure to build a faster, more personalized Web.

</details><br/>

[![Technologies Used](https://skillicons.dev/icons?i=nextjs,ts,mongodb,tailwind,vercel)](https://skillicons.dev)

## 🧰 Get Started

To get this project up and running in your development environment, follow these step-by-step instructions.

### 📋 Prerequisites

In order to install and run this project locally, you would need to have the following installed on your local machine.

- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/get-npm)
- [Git](https://git-scm.com/downloads)
- [MongoDB](https://www.mongodb.com/try/download/community)

### ⚙️ Installation and Run Locally

**Step 0:**

Create :bangbang: `.env.local` file and it should be located alongside with .gitignore, next.config.js & etc.
<br>![image](https://github.com/LeinahI/Chirpy/assets/53577436/a5285cbd-5170-4066-9651-c0efa56a9d22)


Note :bangbang: the application uses Clerk for Authentication and User Management, therefore, you need to create Clerk account [here](https://clerk.dev/) and sets the `CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` environment variables in `.env.local` file. Also, the different URLs for the Clerk sign-in, sign-up, after sign-in and after sign-up pages.

Note :bangbang: the application uses a MongoDB database, therefore, you need to create a database and connect it to the application, for this, change the `MONGODB_URL` environment variable in `.env.local` file located in `server` folder.

Note :bangbang: the application uses a UploadThing Cloud, therefore, you need to create UploadThing account [here](https://uploadthing.com/) and sets the `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID` environment variables in `.env.local` file.

After following all the instructions above, we'll want to create a new webhook on Clerk. To do this, go to the [Clerk Dashboard](https://dashboard.clerk.dev/), click on the "Webhooks" tab, and then click "Add Endpoint". For the Endpoint URL, enter `http://<PASTE-YOUR-LINK-HERE>/api/webhook/clerk`. For the evetnts, select the "organization", "organizationDomain", "organizationInvitation" and "organizationMembership". Then click "Create" to create the webhook. get the signing secret and set it as `CLERK_WEBHOOK_SECRET` environment variable in `.env.local` file.

**Step 1:**

Download or clone this repo by using the link below:

```bash
git clone https://github.com/LeinahI/Chirpy.git
```

**Step 2:**

Execute the following command in the root directory of the downloaded repo in order to install dependencies:

```bash
npm install
```

**Step 3:**

Execute the following command in order to run the development server locally:

```bash
npm run dev
```

**Step 4:**

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 📜 Scripts

All scripts are defined in the `package.json` file. Here is a list of all scripts:

| Script          | Action                                      |
| :-------------- | :------------------------------------------ |
| `npm install`   | Installs dependencies                       |
| `npm run dev`   | Starts local dev server at `localhost:3000` |
| `npm run build` | Build your production site to `./dist/`     |
| `npm run start` | Start your production site locally          |
| `npm run lint`  | Run ESLint                                  |


## 🔒 Environment Variables

Environment variables[^10] can be used for configuration. They must be set before running the app.

> [Environment variables](https://en.wikipedia.org/wiki/Environment_variable) are variables that are set in the operating system or shell, typically used to configure programs.

**Chirpy** uses [Clerk](https://clerk.com), [UploadThing](https://uploadthing.com/), and [MongoDB](https://mongodb.com) as external services. You need to create an account on each of these services and get the required credentials to run the app.

Create a `.env.local` file in the root directory of the project and add the following environment variables:

```env
//MongoDB
MONGODB_URL=<MONGODB_URL>

//ClerkApi
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<CLERK_PUBLISHABLE_KEY>
CLERK_SECRET_KEY=<CLERK_SECRET_KEY>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
//ClerkApi_Signing-Secret
NEXT_CLERK_WEBHOOK_SECRET=<CLERK_WEBHOOK_SECRET>

//UploadThing
UPLOADTHING_SECRET=<UPLOADTHING_SECRET>
UPLOADTHING_APP_ID=<UPLOADTHING_APP_ID>
```


