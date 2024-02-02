import { Global, css } from "@emotion/react";

const globalStyles = css({
    "*": {
        padding: "0",
        margin: "0",
        boxSizing: "border-box",
        fontFamily: "system-ui",
    },
    "body, #root": {
        minHeight: "100vh",
    },
    input: {
        border: "1px solid #d9e1e6",
        borderRadius: "15px",
        padding: "10px 15px",
        outline: "none",
    },
    button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px 15px",
        backgroundColor: "lightgreen",
        outline: "none",
        border: "none",
        borderRadius: "15px",
    },
    a: {
        textDecoration: "underline",
        color: "inherit",
        textDecorationSkipInk: "none",
        textUnderlineOffset: "2px",
        transition: "all 0.3s",
        "&:hover": {
            textDecorationColor: "transparent",
        },
    },
});

function App() {
    return (
        <>
            <Global styles={globalStyles} />
        </>
    );
}

export default App;
