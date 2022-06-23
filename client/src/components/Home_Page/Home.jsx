import React from "react";

const Home = () => {

    const [data, setData] = React.useState(null);

    React.useEffect(() => {
      fetch("https://login-and-registration-full.herokuapp.com/api")
        .then((res) => res.json())
        .then((data) => setData(data.message));
    }, []);

    return (
        <div>
            <h1>Hello Welcome to the Home Page </h1>
            {!data ? "Loading..." : data }
        </div>
    )
}

export default Home;