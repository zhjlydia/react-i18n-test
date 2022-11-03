import "./styles.css";
import {
  PureComponent,
  useReducer,
  useCallback,
  useState,
  useEffect
} from "react";
import { initI18n, setInterpolationDefaults } from "./utils/i18n";
import i18n from "i18next";

/**
 * pureComponent
 */
class Pure extends PureComponent {
  render() {
    return (
      <div className="test-component">
        <span className="label">pure component</span>
        {i18n.t("invite.INVITE_SUBJ")}
      </div>
    );
  }
}

/**
 * normalComponent
 */
const FC = () => {
  console.log("FC render");
  return (
    <div className="test-component">
      <span className="label">normal component</span>
      {i18n.t("invite.INVITE_SUBJ")}
    </div>
  );
};

export default function App() {
  console.log("render");
  /**
   * force rerender
   */
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const [initialized, setInitialized] = useState(false);

  /**
   * change the i18n interpolation defaults, async call
   */
  const afterConfigLoaded = useCallback(() => {
    const variables = {
      displayName: "new",
      productName: "new"
    };
    /**
     * when call setInterpolationDefaults function, I hope both pure component and
     * normal component can rerender
     */
    setInterpolationDefaults(variables);
    /**
     * but this function only can works on normal component, how can I do?
     */
    forceUpdate();
  }, []);

  useEffect(() => {
    initI18n().then(() => {
      setInitialized(true);
    });
  }, []);

  return initialized ? (
    <div className="App">
      <p>A demo to test pure component rerender</p>

      <Pure />

      <FC />
      <br />
      <button
        onClick={() => {
          afterConfigLoaded();
        }}
      >
        to update
      </button>
    </div>
  ) : null;
}
