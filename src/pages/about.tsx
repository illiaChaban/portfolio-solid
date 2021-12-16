import { log } from "../utils/log"

const About = () => {
  log.onCleanup('cleanup about')
  return (
    <div style={{width: '100vw', minHeight: '100vh', 
      // background: 'yellow', 
      // color: 'black',
      color: 'white',
    
    }}>
      <h1 style={{margin: 0}}>About Page Hello</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet nibh non augue scelerisque volutpat. In placerat nulla vel purus vulputate, nec bibendum ex ultrices. Suspendisse sagittis metus mauris. Mauris non odio tellus. Nunc elementum finibus mollis. Proin lacinia risus nec ante accumsan, non vulputate leo pulvinar. Vestibulum hendrerit massa viverra nisi tincidunt, sed posuere ante blandit.

        Duis semper purus ipsum, id porta mi venenatis sit amet. Vivamus scelerisque leo sit amet hendrerit ultricies. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec efficitur convallis ipsum, ac lobortis velit laoreet posuere. Praesent aliquam laoreet augue, sed rhoncus lorem sagittis id. Nullam sit amet tortor commodo nulla euismod lacinia. Nullam ipsum sem, dapibus at tincidunt nec, sodales non est. Phasellus scelerisque, dui quis molestie tincidunt, justo lacus egestas ipsum, nec dictum orci tellus vel massa. Etiam consectetur, nisi id interdum rutrum, odio augue sollicitudin mauris, at vulputate arcu diam commodo justo. Pellentesque maximus varius eros. Quisque eu posuere velit.

        Quisque in mauris fermentum, blandit ligula nec, lacinia sapien. Duis in tempus lectus, eget ullamcorper quam. Sed tincidunt congue mattis. Aenean at blandit elit. In pellentesque accumsan felis, euismod convallis enim volutpat id. Phasellus ultrices eget felis et viverra. Praesent auctor sed nibh consequat dignissim. Curabitur libero lacus, euismod sit amet felis eu, molestie aliquet nibh. Suspendisse sed rutrum velit, a consectetur tortor. Nulla finibus tortor sed elit euismod iaculis. Nullam at libero enim. Mauris et lacus id arcu suscipit rutrum. Sed commodo, odio sed ultrices laoreet, orci sem semper metus, non consequat sem nisl et libero. Proin accumsan, nunc sit amet hendrerit finibus, nisi mi feugiat nibh, viverra aliquam magna dolor quis libero.

        Nulla tempus non mauris quis ullamcorper. Etiam vel molestie justo, aliquet suscipit libero. Vivamus felis nisl, vestibulum non dictum eget, accumsan ac purus. Pellentesque id cursus lorem. Pellentesque lacus felis, gravida vitae congue et, varius ac augue. Phasellus mauris ipsum, scelerisque eu ultricies nec, tincidunt a est. Suspendisse egestas, turpis ac iaculis vestibulum, diam risus lobortis est, in eleifend nisi lorem eget dolor. Donec porttitor nisl vel leo dictum, quis elementum mauris consectetur. Donec fermentum auctor lorem, ut ullamcorper purus sodales id. Donec accumsan nunc sed velit finibus suscipit. Nunc dui lectus, auctor non turpis non, commodo vehicula libero.

        Phasellus maximus ligula sapien, non efficitur orci gravida eget. Donec accumsan imperdiet elit, et consectetur mauris tristique a. Vivamus vel mauris egestas metus congue congue quis vel enim. In vel arcu a felis ultrices luctus nec quis purus. Vestibulum congue quis arcu consequat semper. Fusce pharetra justo sit amet justo hendrerit eleifend. Mauris sed finibus elit, et auctor lectus. In luctus imperdiet sem sit amet mollis. Mauris quis mauris in mi varius venenatis vel at sem. In sed magna bibendum, posuere mauris nec, blandit ex. Nulla commodo mauris velit, a molestie libero sodales eu. Pellentesque euismod, mauris et porta pellentesque, magna turpis tempus libero, vitae ornare mauris dolor commodo felis. Pellentesque neque ex, viverra sed augue condimentum, accumsan faucibus tortor. Proin sit amet mauris turpis. Quisque in nisi et libero rutrum ornare. Aenean a erat felis.
      
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet nibh non augue scelerisque volutpat. In placerat nulla vel purus vulputate, nec bibendum ex ultrices. Suspendisse sagittis metus mauris. Mauris non odio tellus. Nunc elementum finibus mollis. Proin lacinia risus nec ante accumsan, non vulputate leo pulvinar. Vestibulum hendrerit massa viverra nisi tincidunt, sed posuere ante blandit.

        Duis semper purus ipsum, id porta mi venenatis sit amet. Vivamus scelerisque leo sit amet hendrerit ultricies. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec efficitur convallis ipsum, ac lobortis velit laoreet posuere. Praesent aliquam laoreet augue, sed rhoncus lorem sagittis id. Nullam sit amet tortor commodo nulla euismod lacinia. Nullam ipsum sem, dapibus at tincidunt nec, sodales non est. Phasellus scelerisque, dui quis molestie tincidunt, justo lacus egestas ipsum, nec dictum orci tellus vel massa. Etiam consectetur, nisi id interdum rutrum, odio augue sollicitudin mauris, at vulputate arcu diam commodo justo. Pellentesque maximus varius eros. Quisque eu posuere velit.

        Quisque in mauris fermentum, blandit ligula nec, lacinia sapien. Duis in tempus lectus, eget ullamcorper quam. Sed tincidunt congue mattis. Aenean at blandit elit. In pellentesque accumsan felis, euismod convallis enim volutpat id. Phasellus ultrices eget felis et viverra. Praesent auctor sed nibh consequat dignissim. Curabitur libero lacus, euismod sit amet felis eu, molestie aliquet nibh. Suspendisse sed rutrum velit, a consectetur tortor. Nulla finibus tortor sed elit euismod iaculis. Nullam at libero enim. Mauris et lacus id arcu suscipit rutrum. Sed commodo, odio sed ultrices laoreet, orci sem semper metus, non consequat sem nisl et libero. Proin accumsan, nunc sit amet hendrerit finibus, nisi mi feugiat nibh, viverra aliquam magna dolor quis libero.

        Nulla tempus non mauris quis ullamcorper. Etiam vel molestie justo, aliquet suscipit libero. Vivamus felis nisl, vestibulum non dictum eget, accumsan ac purus. Pellentesque id cursus lorem. Pellentesque lacus felis, gravida vitae congue et, varius ac augue. Phasellus mauris ipsum, scelerisque eu ultricies nec, tincidunt a est. Suspendisse egestas, turpis ac iaculis vestibulum, diam risus lobortis est, in eleifend nisi lorem eget dolor. Donec porttitor nisl vel leo dictum, quis elementum mauris consectetur. Donec fermentum auctor lorem, ut ullamcorper purus sodales id. Donec accumsan nunc sed velit finibus suscipit. Nunc dui lectus, auctor non turpis non, commodo vehicula libero.

        Phasellus maximus ligula sapien, non efficitur orci gravida eget. Donec accumsan imperdiet elit, et consectetur mauris tristique a. Vivamus vel mauris egestas metus congue congue quis vel enim. In vel arcu a felis ultrices luctus nec quis purus. Vestibulum congue quis arcu consequat semper. Fusce pharetra justo sit amet justo hendrerit eleifend. Mauris sed finibus elit, et auctor lectus. In luctus imperdiet sem sit amet mollis. Mauris quis mauris in mi varius venenatis vel at sem. In sed magna bibendum, posuere mauris nec, blandit ex. Nulla commodo mauris velit, a molestie libero sodales eu. Pellentesque euismod, mauris et porta pellentesque, magna turpis tempus libero, vitae ornare mauris dolor commodo felis. Pellentesque neque ex, viverra sed augue condimentum, accumsan faucibus tortor. Proin sit amet mauris turpis. Quisque in nisi et libero rutrum ornare. Aenean a erat felis.

      </p>
    </div>
  )
}

export default About