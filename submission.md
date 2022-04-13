# Submission Notes

  

Hello, HubSpot! It's nice to e-meet you. 😎

  

## Given more time, what would you have done differently?

  

If I had more time, I would have tried to make my code ultra-DRY and more modular.

  

In this adventure, I ran into some issues with styling cascade that caused me to be more repetitive than I would have liked. I think it would have been really great to create a more comprehensive style mixin and variable system or even a utility class system. I think doing this well requires some serious thought and planning, so I erred on the side of going with a more basic BEM setup for styling.

  

I think there was also an opportunity to break down my Vue components further. For example, it would have been great to have a separate component for the multi-select, and then another component for each input.

  

Finally, if I had more time, I would have implemented a global store for Vue to facilitate the development of a voice announcer, which I think is a really nice proactive accessibility feature for content that is heavily visual and changes often based on user input.

  

## How did you deviate from the directions, if at all, and why?

  

I tried to follow the directions as closely as possible, and anything I did not complete was due to time constraints or build issues. I think I got the functional objectives down. However, I do feel I that I fell a bit short on styling to make things really smooth, and the result is not quite up to my usual standard.

  

However, I tried to incorporate as many bonuses as I could, so this test uses Vue, ESLint, and SASS (and of course Prettier in my IDE ✨).

  

## Is there anything else you'd like to let us know?

  

I ran into significant issues with Parcel caching/HMR failing while trying to work on this task (and in retrospect probably should have pivoted to Gulp at the first sign of things not going smoothly).

  

I'm on a PC using WSL so I'm not sure if it's related to that. Google makes it seem like this is a common bug, and that a workaround is killing the process and manually deleting the `.parcel-cache` folder when the problem flares up. This did the trick, but was a bit tedious, and made some of the more detailed styling tasks very difficult to work on.

  

Because I'm applying for an accessibility role, I also tried to do a thorough job of manually testing keyboard nav and screen reader output. If I were looking to remedy everything axe flagged, I would have also adjusted a few DOM elements and colors, but I tried to find a good balance of doing the best I could while respecting the tasks outlined in the prompt.

Also, this is real footage of me being hyped about accessibility development.

![Woman enthusiastically dancing at a convert](https://media0.giphy.com/media/ZdFxoPhIS4glG/giphy.gif?cid=ecf05e47wx559v5xjt3w7gjgh6s0sx6rtyl0sjewfil91pyb&rid=giphy.gif&ct=g)
