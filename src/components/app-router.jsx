import { Route, Routes, useLocation } from "react-router-dom"
import { privateRoutes, publicRoutes, resetRoutes } from "../services/router/routers"
import Error from "./Error"
import Modal from "./modal/modal"
import IngredientDetails from "./modal/ingredient-details/ingredient-details"

const AppRouter = () => {
    const location = useLocation()
    const background = location.state && location.state.background
    return (
        <>
            <Routes location={background || location}>
                {localStorage.getItem('accessToken') && privateRoutes.map(rout =>
                    <Route path={rout.path} element={rout.component} key={rout.path} />
                )}
                {localStorage.getItem('resetPassword') ?
                    resetRoutes.map(rout => <Route path={rout.path} element={rout.component} key={rout.path} />)
                    : <Route path="*" element={<Error />} />
                }
                {!localStorage.getItem('accessToken') && publicRoutes.map(rout =>
                    <Route path={rout.path} element={rout.component} key={rout.path} />
                )

                }
                <Route path="*" element={<Error />} />
            </Routes>
            {background && (
                <Routes>
                    <Route path="/ingredients/:id" element={
                        <Modal header='Детали ингредиента'>
                            <IngredientDetails />
                        </Modal>
                    } />
                </Routes>
            )}
        </>
    )
}

export default AppRouter;