import { SheetsRegistry } from "jss";
import {
    createGenerateClassName,
    createMuiTheme,
} from "@material-ui/core/styles";

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
});

function createPageContext() {
    return {
        theme,
        sheetsManager: new Map(),
        sheetsRegistry: new SheetsRegistry(),
        generateClassName: createGenerateClassName(),
    };
}

export type PageContext = ReturnType<typeof createPageContext>;

let pageContext: PageContext | undefined;

export default function getPageContext() {
    if (!process.browser) {
        return createPageContext();
    }

    if (!pageContext) {
        pageContext = createPageContext();
    }

    return pageContext;
}
