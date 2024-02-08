import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const Home = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/login")
    }
  }, [location.pathname, navigate])

  return <div>Home</div>
}

export default Home