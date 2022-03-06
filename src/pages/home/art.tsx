export const Art = () => {
  return (
    <div id="art-container" class="container">
      <div class="container overflow-hidden">
        <div id="art">
          <div class="container">
            <picture>
              <source srcset="imgs/mountain-small.webp" type="image/webp" />
              <img
                id="mountain"
                src="imgs/mountain-smallest.png"
                data-src="imgs/mountain"
                alt="mountain"
              />
            </picture>
            <div id="rv-squirrel-container" class="container hide">
              <picture>
                <source srcset="imgs/rv-small.webp" type="image/webp" />
                <img
                  id="rv"
                  src="imgs/rv-smallest.png"
                  alt="hippie van"
                  data-src="imgs/rv"
                />
              </picture>

              <div class="squirrel animate-squirrel"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
