// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;

    bgColor: string;

    boardColor: string;
    startBoardColor: string;
    dropBoardColor: string;

    cardColor: string;
    dragCardColor: string;
  }
}
