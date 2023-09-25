import { useEffect } from "react";

const HomePage = () => {

    useEffect(() => {
        console.log(window.location.pathname);
    }, [])

    return (
        <>
            <br />
            <h3>This is home page</h3>
            <p>- Use the API from <strong>https://reqres.in/</strong> to create website</p>
            <p>- Use React library to create website with functions such as:</p>
            <p>+ Log in <strong>(username: long174 - password: 123)</strong></p>
            <p>+ CRUD</p>
            <p>+ Search user by <strong>Email</strong></p>
            <p>+ Sort user list by <strong>ID</strong> or <strong>First name</strong></p>
            <p>+ Pagination</p>
            <p>+ Import data from csv file</p>
            <p>+ Export data to csv file</p>
            <br />
            <p>- Time to complete: <strong>4 days</strong></p>
            <p>- Link github: <strong>https://github.com/long1742000/ProjectReactJS.git</strong></p>
        </>
    )
}

export default HomePage;