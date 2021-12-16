TODO

Tools:
photoshop online
png to svg converter (https://www.pngtosvg.com/) -- Make sure when it transforms png, 
it doesn't add "image" tag and actually creates a path (it might be a problem for other converters)

gravit designer -> for transforming svg into clipable path (https://designer.gravit.io/)
Notes:
For the gravit designer to preserve aspect ratio and not cut away empty space on the outside of the frame, you would have to add an "outbounding rect" path before pasting it into gravit.designer.
Svg frame that has 3 points to set the outbounding rect doesn't need that. The path would look smth like this (it's important to include stroke for gravit.designer to not ignore it): 
```html
  <path d="M0,0 h[width] v[height] h-[width] z" stroke="black" stroke-width="0.1"/>
```
(Replace `[width]` and `[height]` with actual svg values)

Resources:
https://www.sarasoueidan.com/blog/css-svg-clipping/
https://cssfordesigners.com/articles/clip-path-scaling
https://stackoverflow.com/questions/44090167/how-to-use-svg-clippathunits-objectboundingbox

video tutorial on svg path - https://www.youtube.com/watch?v=2IY-xTCFjiM&t=136s&ab_channel=RobertoMatthews