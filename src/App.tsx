import { AnimatePresence, motion, Variants } from "framer-motion";
import { useRecoilValue } from "recoil";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { navState } from "./atoms";
import { defaultTheme } from "./theme";
import Navigator from "./Components/Navigator";
import ClockApp from "./Routes/ClockApp";
import ThemeApp from "./Routes/ThemeApp";
import TodoApp from "./Routes/TodoApp";

const GlobalStyle = createGlobalStyle`
  /** 
   *http://meyerweb.com/eric/tools/css/reset/ 
   *v2.0 | 20110126
   *License: none (public domain)
   */

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: 'Baloo Thambi 2', 'Nanum Gothic Coding', Verdana;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

* {
  box-sizing: border-box;
	font-family: 'Baloo Thambi 2', 'Nanum Gothic Coding', Verdana;
	-webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
img {
	-webkit-user-drag: none;
 	-khtml-user-drag: none;
 	-moz-user-drag: none;
 	-o-user-drag: none;
}
body {
  background-color: ${(props) => props.theme.bgColor};
  color: black;
}
a {
  text-decoration: none;
  color: inherit;
}
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 50px;
`;
const MotionWrapper = styled(motion.div)`
  width: 100vw;
  height: calc(100vh - 50px);
  position: fixed;
  top: 50px;
`;

const AppWrapperVariants: Variants = {
  init: {
    opacity: 0,
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
  ani: {
    opacity: 1,
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
};

function App() {
  const currentNav = useRecoilValue(navState);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Wrapper>
        <AnimatePresence>
          <Navigator />
          {currentNav === "TODO" ? (
            <MotionWrapper
              key="TodoApp"
              variants={AppWrapperVariants}
              initial="init"
              animate="ani"
              exit="exit"
            >
              <TodoApp />
            </MotionWrapper>
          ) : currentNav === "THEME" ? (
            <MotionWrapper
              key="ThemeApp"
              variants={AppWrapperVariants}
              initial="init"
              animate="ani"
              exit="exit"
            >
              <ThemeApp />
            </MotionWrapper>
          ) : currentNav === "CLOCK" ? (
            <MotionWrapper
              key="ClockApp"
              variants={AppWrapperVariants}
              initial="init"
              animate="ani"
              exit="exit"
            >
              <ClockApp />
            </MotionWrapper>
          ) : (
            <h1>Wrong Access</h1>
          )}
        </AnimatePresence>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
