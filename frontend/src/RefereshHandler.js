
import { useLocation , useNavigate} from 'react-router-dom'
import { useEffect } from 'react'

function RefereshHandler({setIsAuthenticated}) {
    const location = useLocation();
    const navigate  = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            setIsAuthenticated(true);
            if(location.pathname ==='/' || location.pathname === '/login'|| location.pathname === '/signUp')
            {
                navigate('/home', {replace:false})
            }
        }
    },[location , setIsAuthenticated, navigate])

  return (
   null
  )
}

export default RefereshHandler