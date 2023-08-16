# Submission Notes

**Hello, HubSpot. It's me.** 👋

[![Adele](https://github.com/galloanna/hubspot-dev-test/assets/61474460/bcf08d2a-8689-4cb7-90e5-f5975c977ad8)](https://youtu.be/YQHsXMglC9A?t=75)

## Given more time, what would you have done differently?

If I had more time, I would have aimed to make things even more DRY and modular. I see opportunities, for example, to break `FilterCategory` into multiple components, and probably reduce the methods and computed properties in `Filters`.

I would also get way down into the nitty gritty styling of the dropdown filters and work on an accessible styled radio button implementation (the Parcel caching I experienced was very challenging for styling work).

There's always an opportunity to add more safety nets, and with more time I could have written more unit tests, as well as added a loader and an error state in case data retrieval fails.

Finally, I probably would have tried to implement a global store using Pinia (which is new to me) instead of relying on `$emit` events.  

## How did you deviate from the directions, if at all, and why?

I tried to follow the directions very closely, but I am missing the little triangles on top of the dropdown filters. Pivoting to a new build process probably would have been a good idea, but by the time things got tedious I was already too far down the road to change plans.

I aimed to incorporate several bonuses, so this exercise uses Vue, ESLint, and SCSS with BEM naming—but not BEM nesting—for easier developer debugging. It also includes unit tests (and the Babel config to support them), and has formatting configs for both Prettier and VSCode (because format on save is magic). 🌈

## Is there anything else you'd like to let us know?

This project was done on a PC in WSL 🥔. In case building is finicky for some reason, I've included a handy [Netlify deployment](https://monumental-marshmallow-bb57db.netlify.app/).
