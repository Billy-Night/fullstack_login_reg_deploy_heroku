import React from "react";

const Home = () => {
    // const context = useContext(MyContext);

    const [data, setData] = React.useState(null);

    React.useEffect(() => {
      fetch("http://localhost:3306/api")
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