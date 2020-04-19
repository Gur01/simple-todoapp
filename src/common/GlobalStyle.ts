import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
	box-sizing: border-box;
	font-size: 100%;
}

*, 
*::before, 
*::after {
	box-sizing: inherit;
}

body {
	font-family: Roboto;
	margin: 0;
	padding: 0;
}
`;

export default GlobalStyle;