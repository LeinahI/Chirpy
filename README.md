# NEXT.js 13 chirpy
![Thumbnail](https://github.com/LeinahI/Chirpy/assets/53577436/93522668-b80b-45df-8313-82bb3be6ae35)

[![Leinah](https://custom-icon-badges.demolab.com/badge/made%20by%20-Leinah-556bf2?logo=github&logoColor=white&labelColor=101827)](https://github.com/LeinahI)
[![License](https://img.shields.io/github/license/LeinahI/Chirpy?color=dddddd&labelColor=000000)](https://github.com/LeinahI/Chirpy/blob/master/LICENSE)
[![Top Language](https://img.shields.io/github/languages/top/LeinahI/Chirpy?logo=github&logoColor=%23007ACC&label=TypeScript)](https://www.typescriptlang.org/)
[![deployment](https://img.shields.io/github/deployments/LeinahI/Chirpy/Production?logo=vercel&label=Website)](https://chirpy-orcin.vercel.app/)

## 🌐 Live Demo

Look at the project's live demonstration: [Chirpy web application](https://chirpy-orcin.vercel.app/)

## 📝 Description
Users can share their thoughts with other users on the social media platform Chirpy by using this application. Chirpy is a server-side rendering, full-stack web application written in TypeScript and Next.js 13. It makes use of Clerk as the provider of authentication and MongoDB as the database. It uploads pictures to the cloud via UploadThing as well. Tailwind CSS and Shadcn components are utilized for styling the application.

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

This is a JavaScript code contains all the constants used in the application, specifically the Sidebar Navigation (`sidebarLinks`), Profile Tabs (`profileTabs`) and Community Tabs (`communityTabs`) constants.

#### `lib/`

`actions/` - `models/` - `validations/` - `mongoose.ts` - `uploadthing.ts` - `utils.ts`

The **lib** folder holds crucial components for _Threads App_:

- **actions**: Manage actions for Community, Thread, and User entities using Mongoose for database interaction.
- **models**: Define mongoose schemas for Community, Thread, and User entities.
- **validations**: Provide validation schemas with Zod for Thread and User data.
- **mongoose.ts**: Establishes and manages MongoDB connections for the application.
- **uploadthing.ts**: Offers a React utility for simplified file uploads to UploadThing.
- **utils.ts**: Contains various reusable utility functions.

#### `public/`

`assets/` - `next.svg` - `vercel.svg`

The public directory contains the media used in the application. The assets folder contains all the images used in the application.

</details>

## 📖 Table of Contents

<details><summary>Table of Contents</summary>

- [Live Demo](#-live-demo)
- [Description](#-description)
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
- [Contributing](#-contributing)
  - [Bug / Feature Request](#-bug--feature-request)
- [Acknowledgements](#-acknowledgements)
- [References](#-references)
- [Contact Us](#-contact-us)
- [License](#-license)

</details>






## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
