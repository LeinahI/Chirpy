# NEXT.js 13.5.6 chirpy
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
- [Features](#-features)
- [Screenshots](#-screenshots)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)
- [References](#-references)


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
## 🚀 Deployment

#### Deploy to production (manual)

You can create an optimized production build with the following command:

```bash
npm run build
```

#### Deploy on Vercel (recommended)

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/)

## 💡 Features

Chirpy web application comes with the following features:

- [x] [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) Chirps, Communities and Profiles
- [x] Like Chirps
- [x] Multi-level Comment Chirps
- [x] Follow Profiles
- [x] Search Profiles and Circles
- [x] Activity Feed (Likes, Comments, Follows)
- [x] Explore Feed (Chirps of Followed Profiles)
- [x] Profile Tabs (Chirps, Followers, Following)
- [x] Community Tabs (Chirps, Members)
- [x] Chirp Likes Page (Profiles that liked a Chirp)
- [x] Post and Comment Emoji via emoji-mart

In terms of technical features, Chirpy web application comes with the following features:

- [x] TypeScripted Codebase with Next.js
- [x] Authentication with Clerk
- [x] User Management with Clerk
- [x] Organization Management with Clerk
- [x] File Upload with UploadThing
- [x] Server Side Rendering with Next.js
- [x] MongoDB Database
- [x] Mongoose ODM
- [x] Zod Validation
- [x] Shadcn Components
- [x] Tailwind CSS
- [x] Svix Webhook Proxy
- [x] Vercel Deployment

## 🤳 Screenshots

#### Sign In
![Screen Shot 2023-12-09 at 16 47 13](https://github.com/LeinahI/Chirpy/assets/53577436/e21c52cb-6fc7-40be-a2d9-4172c43282ff)

#### Sign Up
![Screen Shot 2023-12-09 at 16 47 43](https://github.com/LeinahI/Chirpy/assets/53577436/c1babf6b-7b45-4ac9-81cb-6db0ac392e87)

#### Onboarding
![Screen Shot 2023-12-09 at 16 49 46](https://github.com/LeinahI/Chirpy/assets/53577436/0aa1a1ba-e995-46f2-a893-ee5235adbeee)

#### Home
![Screen Shot 2023-12-09 at 16 51 40](https://github.com/LeinahI/Chirpy/assets/53577436/0b891081-e888-4d93-9dc7-d55424ced3cb)

#### Search
![Screen Shot 2023-12-09 at 16 52 22](https://github.com/LeinahI/Chirpy/assets/53577436/600a1c9e-789f-4d0f-9f17-fd7553930a0d)

#### Activity
![Screen Shot 2023-12-09 at 16 52 55](https://github.com/LeinahI/Chirpy/assets/53577436/12dca440-6f8a-455b-a35d-73b0af3cc561)

#### Create Chirp
![Screen Shot 2023-12-09 at 16 53 17](https://github.com/LeinahI/Chirpy/assets/53577436/5dbcddb4-3089-4917-935d-2d517ef3851b)

#### Circles
![Screen Shot 2023-12-09 at 16 53 50](https://github.com/LeinahI/Chirpy/assets/53577436/99e10300-8b04-461b-8b4b-4548b9e95556)

#### Profile
![Screen Shot 2023-12-09 at 16 54 17](https://github.com/LeinahI/Chirpy/assets/53577436/98238753-d604-4741-8096-65f64e42972e)
![Screen Shot 2023-12-09 at 16 56 32](https://github.com/LeinahI/Chirpy/assets/53577436/c8810761-f594-4755-8162-fa3a3785c819)
![Screen Shot 2023-12-09 at 16 56 35](https://github.com/LeinahI/Chirpy/assets/53577436/b78458f6-33a5-40c6-a0fa-288682f0cd7a)


#### Edit Profile
![Screen Shot 2023-12-09 at 16 55 36](https://github.com/LeinahI/Chirpy/assets/53577436/fcffc6de-f14f-4276-8df5-9e8e27b2b148)

#### User Profile
![Screen Shot 2023-12-09 at 16 57 17](https://github.com/LeinahI/Chirpy/assets/53577436/227a27b3-dece-4664-91cd-f84ce51cc8fa)

#### Create Organization/Circle
![Screen Shot 2023-12-09 at 16 58 20](https://github.com/LeinahI/Chirpy/assets/53577436/59f35206-2f98-47ab-b588-4296b3ace3d0)

#### Circle Profile
![Screen Shot 2023-12-09 at 16 58 43](https://github.com/LeinahI/Chirpy/assets/53577436/e9b4e15e-b933-4e8b-b2d7-2210ef8a22a3)
![Screen Shot 2023-12-09 at 16 58 46](https://github.com/LeinahI/Chirpy/assets/53577436/331141a4-e027-4deb-bfc9-4987004b6f83)

#### Chirp Page
![Screen Shot 2023-12-09 at 16 59 37](https://github.com/LeinahI/Chirpy/assets/53577436/6cae7a16-4b53-4574-91ef-aae7e4fd0257)

#### Chirp Likes Page
![Screen Shot 2023-12-09 at 17 00 03](https://github.com/LeinahI/Chirpy/assets/53577436/378114e1-7f3a-40fe-98d1-b38e911ee1ac)

## 🐛 Errors & Bugs that I fixed from References

1. Not implementing utfs.io on next.config.js
```
//Solution
remotePatterns: [
      ...
      ,{
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
```

2. Activity Tab = Hydration errors due to interactive content of `<Link>... <Link>...<Link/>...</Link>` this occurence.
```
//This error occurs on app/(root)/activity/page.tsx because of href={`/profile/${author.id}`} is undefined
//Solution
import dynamic from "next/dynamic";
const DynamicLink = dynamic(() => import("next/link"), { ssr: false });

// all <Link> tag from next/link should change into DynamicLink
<DynamicLink
   key={activity._id}
   href={`${
   (activity.parentId && `/chirp/${activity.parentId}`) ||
   `/profile/${activity.author.id}`
   }`}>
...
<DynamicLink key={author._id} href={`/profile/${author.id}`}>
   <span className="text-primary-500">{author.name}</span>
</DynamicLink>
```

3. Activity Tab = When the same person liked your 2 different post but it only shows a same single link.
```
//at user.actions.ts getActivity()

const reactionsData = reactions.map(
      (reaction: {
        user: { toString: () => any };
        _id: any; /* NEW */
        createdAt: any;
      }) => {
        const reactingUser = reactionsUsers.find(
          (user) => user._id.toString() === reaction.user.toString()
        );

        if (reactingUser._id.equals(userId)) return null;

        const parentChirp = userChirps.find((chirp) => /* NEW */
          chirp.reactions.some((r: { equals: (arg0: any) => any }) =>
            r.equals(reaction._id)
          )
        );

        if (!parentChirp) return null; /* NEW */

        return {
          author: {
            name: reactingUser.name,
            username: reactingUser.username,
            image: reactingUser.image,
            _id: reactingUser._id,
            id: reactingUser.id,
          },
          createdAt: reaction.createdAt,
          parentId: parentChirp._id.toString(), /* Modified */
          activityType: "reaction",
        };
      }
    );

    const replies = await Chirp.find({ /* Modified and reaction to concat follow removed */
      _id: { $in: childChirpIds },
      author: { $ne: userId },
    }).populate({
      path: "author",
      model: User,
      select: "name username image id _id",
    });

    const activity = [...replies, ...reactionsData, ...followersData]
      .filter((item) => item !== null)
      .sort((a, b) => b.createdAt - a.createdAt);

```

## 📋 License

**Threads** is open source software [licensed as MIT](https://opensource.org/license/mit/) and is free to use — See [LICENSE](https://github.com/LeinahI/Chirpy/blob/master/LICENSE) for more details.


## 💎 Acknowledgements

The following people assisted me throughout this project and made it possible, for which I am grateful.:

- [Adrian Hajdin - JS Mastery](https://github.com/adrianhajdin)
- [Liron Abutbul](https://github.com/ladunjexa)

## 📚 References

• JavaScript Mastery. (2023, August 4). Build and deploy a full stack MERN Next.js 14 threads app | React, Next JS, TypeScript, MongoDB. Retrieved from https://www.youtube.com/watch?v=O5cmLDVTgAs <br>
• Ladunjexa. (2023). GitHub - ladunjexa/nextjs13-threads: Threads, Next.js 13 app that skyrocketed to 100 million sign-ups in less than 5 days. Retrieved from https://github.com/ladunjexa/nextjs13-threads






