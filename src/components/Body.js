import Browse from './Browse'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Login from './Login'


const Body = () => {

    // Defines the routes and their respective components
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        }
    ]);


    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}

export default Body