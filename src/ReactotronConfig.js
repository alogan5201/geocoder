import Reactotron from "reactotron-react-js";
import apisaucePlugin from "reactotron-apisauce";
Reactotron.configure()
  .use(
    apisaucePlugin({
      // ignoreContentTypes: /^(image)\/.*$/i   // <--- a way to skip printing the body of some requests (default is any image)
    })
  ) // <-- here we go!!!
  .connect();
