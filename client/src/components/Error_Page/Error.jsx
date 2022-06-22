import React from "react";

const Error = () => {

    const [data, setData] = React.useState(null);

    React.useEffect(() => {
      fetch("/check")
        .then((res) => res.json())
        .then((data) => setData(data));
    }, []);

    return (
        <div>
            <h1>This is the error page</h1>
            {!data ? "Loading..." : data }
        </div>
    )
}

export default Error;