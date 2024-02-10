# DMG Software Website

## Setup Instructions

Open up CMD or Terminal and navigate to where you would like
for the website to be located.

> git clone https://github.com/dmgsoftware/dmg-software-website.git  
> cd dmg-software-website  
> npm install  
> npm run dev

If you would like to build it for production, then:

> npm run build-only  
> npm run preview

**Please note** I am using build-only here because otherwise build
will complain a lot about TypeScript errors. So until I hash those out,
let's use build-only.

## TODO

1. Format the completion flash card.
2. Transform the Flash Cards vue files from JS into TS.
When I originally made the Flash Cards App stand alone, it was in JS.
But now it would be best for them to be in TS.
3. Put a dark/light mode button somewhere. And along with this
comes the necessary classes to achieve this, which is a class 
on <body> and a more specific selector for the theme colors?
4. Create the blog section of the website. 
5. Once I have social media accounts, links in the footer.
6. Allow usage of colors from Theme Color Helper across the website.
I think this would be a cool feature in order to preview found colors.
7. Cypress E2E tests.
8. Probably remove Vite-SSG.
9. Flash Cards tutorial.
10. Abstract toast functionality from FootComponent.
11. Add toast messages to Flash Cards.