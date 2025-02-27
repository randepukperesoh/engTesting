import { useCallback, useState } from "react";


export const useChangeUserForDevice = () => {
const [error, setError] = useState('')
    const handleChangeUserForDevice = useCallback( async(userId: string, deviceId: string) => {
        try{
            const formData = new FormData
            formData.append("user_id", userId)
            formData.append("device_id", deviceId)
            await fetch('/back/main/admin/techmanager/api/ChangeUserForDevice', {method: "POST", body: formData})
        }
        catch(e) {
            setError("Не удалось сменить девайс")
            console.error(e)
        }
    }, [])

    return{
        handleChangeUserForDevice, error
    }
}