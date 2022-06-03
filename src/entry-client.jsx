import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducers from "./components/redux/reducers";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./adminstyle.css";
const store = createStore(rootReducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
