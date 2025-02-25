import { useNavigate } from "react-router-dom"

export const useExit = () => {
    const navigate = useNavigate();
    const handleExit = async () => {
        try{
            const response = await fetch('https://speaktest.exesfull.com/main/api/profile/exit')
        
            const res = await response.json()

            navigate(res)
        }
        catch(e) {
            console.error(e)
        }

    }

    return{
        handleExit
    }
}